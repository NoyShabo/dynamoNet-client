import { Select } from "@mantine/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PeopleIcon from "@mui/icons-material/People";
import { Button } from "@mui/material";
import Chip from "@mui/material/Chip";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalCard } from "../../cmp/card/card";
import { CommunityEvolution } from "../../cmp/community-evolution/CommunityEvolution";
import { Delete } from "../../cmp/delete/delete";
import { Edit } from "../../cmp/edit/edit";
import { Modal } from "../../cmp/modal/modal";
import { NetworkEvolution } from "../../cmp/network-evolution/networkEvolution";
import { DisplayGraph } from "../../cmp/network-graph/networkGraph";
import { NetworkMetrics } from "../../cmp/network-metrics/networkMetrics";
import { Scroll } from "../../cmp/scroll/scroll";
import { MyTabs } from "../../cmp/tabs/tabs";
import { ProjectStatus } from "../../constants";
import "../../globalStyle.scss";
import newTimeRangeImg from "../../images/add_timerange.png";
import calendarImg from "../../images/calendar.png";
import {
  removeSelectedProject,
  setProject,
} from "../../redux/actions/projectActions";
import { getNetwork } from "../../serverApi/rest/networkApi";
import {
  deleteProject,
  getProject,
  updateProject,
} from "../../serverApi/rest/projectApi";
import { NodesPage } from "../nodesMetrics/nodesMetrics";
import "./project.scss";

import { deleteTimeRange } from "../../serverApi/rest/timeRangeApi";
function getTimeRangeCards(project, handleDeleteTimeRange) {
  const timeRanges = project.timeRanges;
  const cards = timeRanges.map((timeRange) => {
    return (
      <GlobalCard
        imgUrl={calendarImg}
        key={timeRange._id}
        isTimeRangeCard={true}
        id={timeRange._id}
        OnDeleteTimeRange={handleDeleteTimeRange}
        projectId={project._id}
        linkTo={`/project/${project._id}/timeRange/${timeRange._id}`}
        title={timeRange.title}
        description={`${new Date(
          timeRange.startDate
        ).toLocaleDateString()} ↔  ${new Date(
          timeRange.endDate
        ).toLocaleDateString()}`}
      />
    );
  });
  return cards;
}

function SourceNetwork({ network }) {
  const [networkGraph, setNetworkGraph] = useState(null);
  const getNetworkById = async (id) => {
    const res = await getNetwork(id);
    setNetworkGraph(res.network);
  };

  // useEffect(() => {
  //   if (network) getNetworkById(network._id);
  // }, [network]);

  return (
    <div className="source-network">
      <div className="title-project">Source Network</div>
      {/* {networkGraph &&
      networkGraph.nodePositions &&
      Object.keys(networkGraph.nodePositions).length > 0 ? (
        <div>
          <div className="network-filter">
            <Select
              placeholder="Select edge type"
              data={[
                { label: "All", value: "all" },
                { label: "Retweet", value: "retweet" },
                { label: "Quote", value: "quote" },
              ]}
              onChange={(value) => {
                if (value === "all")
                  setNetworkGraph(networkGraph ? networkGraph : null);
                else {
                  const edges = [];
                  const nodes = new Set();
                  networkGraph.edges.forEach((edge) => {
                    if (edge.edgeType === value) {
                      edges.push(edge);
                      nodes.add(edge.source);
                      nodes.add(edge.destination);
                    }
                  });

                  const filteredNetwork = {
                    ...networkGraph,
                    edges,
                    nodes: Array.from(nodes),
                  };
                  setNetworkGraph(filteredNetwork);
                }
              }}
            />
          </div>
          <div className="network-container">
            <DisplayGraph width="80vw" height="70vh" network={networkGraph} />
          </div>
        </div>
      ) : networkGraph && networkGraph.nodes ? (
        <div className="small-title-project">There's no network to display</div>
      ) : (
        <div className="small-title-project">
          Loading network <BeatLoader color="#36d7b7" />
        </div>
      )} */}
      {/* <div className="small-title-project">Metrics for the source network</div> */}
      <NetworkMetrics network={network} />
    </div>
  );
}

function mapCommunities(project, slice = 5) {
  // sort communities by size
  // communities look like: { "0": ["node1", "node5"], "1": ["node2", "node3"]}
  // const communities = Object.entries(project.communities).sort((a, b) => b[1].length - a[1].length);
  const communitiesPerTimeRangeSorted = project.timeRanges.map((timeRange) => {
    const communities = Object.entries(timeRange.network.communities).sort(
      (a, b) => b[1].length - a[1].length
    );
    //     const communitiesMap = {};
    //     communities.forEach(community => {
    //         communitiesMap[community[0]] = community[1];
    //     });
    //     return communitiesMap;
    const topCommunities = communities.slice(0, slice);
    const topCommunitiesMap = {};
    topCommunities.forEach((community) => {
      topCommunitiesMap[community[0]] = community[1];
    });
    return topCommunitiesMap;
  });

  return communitiesPerTimeRangeSorted.map((communities, index) => {
    return {
      title: project.timeRanges[index].title,
      communities: communities,
    };
  });

  // return communitiesPerTimeRangeSorted.map((communities, index) => {
  //     return {
  //         title: `Time Range ${index + 1}`,
  //         communities: communities
  //     }
  // })

  // return communities.map((community, index) => {
  //     return {
  //         title: `Community ${index + 1}`,
  //         nodes: community[1]
  //     }
  // })

  // return project.timeRanges.map(timeRange => {
  //     return {
  //         title: timeRange.title,
  //         communities: timeRange.network.communities
  //     }
  // })
}

export function Project() {
  const project = useSelector((state) => state.projectModule.project);
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thresholdQuery, setThresholdQuery] = useState(0.05);
  const [threshold, setThreshold] = useState(0.05);
  const [communities, setCommunities] = useState([]);
  const [slice, setSlice] = useState(5);
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  function backPrevPage() {
    navigate("/projects");
  }

  const getProjectById = async (id) => {
    try {
      const res = await getProject(id);
      dispatch(setProject(res));
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    if (projectId && projectId !== "") getProjectById(projectId);
    // return () => {
    //   dispatch(removeSelectedProject());
    // };
  }, []);

  useEffect(() => {
    setCommunities([]);
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setCommunities(mapCommunities(project));
      localStorage.setItem("project", JSON.stringify(project));
    }
  }, [project]);

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await deleteProject(projectId);
    console.log("res: ", res);
    if (res) {
      toast.success("Project deleted successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/projects");
    } else {
      toast.error("Error deleting project", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setIsDeleting(false);
  };

  const handleExport = async (e) => {
    e.preventDefault();
    setIsExporting(true);
    try {
      const network = await getNetwork(project.sourceNetwork._id);
      console.log("network: ", network);
      const csvData = [];
      csvData.push([
        "source",
        "destination",
        "edgeContent",
        "timestamp",
        "edgeType",
      ]);
      network.network.edges.forEach((edge) => {
        // replace all double quotes with two double quotes
        edge.edgeContent = String(edge.edgeContent).replace(/"/g, `""`);
        csvData.push([
          edge.source,
          edge.destination,
          `"${edge.edgeContent}"`,
          edge.timestamp,
          edge.edgeType,
        ]);
      });
      const csvContent =
        "data:text/csv;charset=utf-8," +
        csvData.map((e) => e.join(",")).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${project.title}.csv`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Error exporting network: ", err);
    }
    setIsExporting(false);
  };

  const handleEdit = async (values) => {
    const newVales = {};
    if (values[0]) newVales.title = values[0];
    if (values[1]) newVales.description = values[1];

    try {
      const res = await updateProject(projectId, newVales);
      project.title = res.project.title;
      project.description = res.project.description;
      setTitle(res.project.title);
      setDescription(res.project.description);
    } catch (err) {
      // console.error("Updating project error!: ", err);
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleDeleteTimeRange = async (timeRangeId) => {
    try {
      const res = await deleteTimeRange(timeRangeId, projectId);
      const newTimeRanges = project.timeRanges.filter(
        (timeRange) => timeRange._id !== timeRangeId
      );
      dispatch(
        setProject({ project: { ...project, timeRanges: newTimeRanges } })
      );
      toast.success("Timerange delete successfully! ", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (e) {
      // console.error("error deleting time range: ", e);
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const [isModalOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  const handleThresholdChange = (e) => {
    setThreshold(thresholdQuery);
  };

  const handleSliceChange = (e) => {
    setCommunities(mapCommunities(project, slice));
  };

  return (
    <>
      <div>
        <div className="title-project title-header">
          <span>
            <ArrowBackIcon
              onClick={backPrevPage}
              style={{
                borderRadius: "50%",
                backgroundColor: "#222c45",
                color: "#fff",
                padding: "8px",
                fontSize: "50px",
                position: "absolute",
                left: "20px",
                top: " 105px",
                cursor: "pointer",
              }}
            />
          </span>
          Project Details
        </div>
      </div>
      <div className="project-page">
        {!project || project._id !== projectId ? (
          <div className="project-container small-title-project">
            Loading Project <br />
            <br /> <BeatLoader color="#36d7b7" />
          </div>
        ) : (
          <div className="project-container">
            <div className="project-header">
              <div className="title-project title-timerange-top">
                {project.title}
              </div>
              <div className="container-header-project">
                <div className="left">
                  <div className="small-date ">
                    {new Date(project.startDate).toLocaleDateString()} ↔{" "}
                    {new Date(project.endDate).toLocaleDateString()}
                  </div>
                  <div className="mid-title-project width-element-top">
                    {project.description}
                  </div>
                  <div className="width-element-top tags">
                    {project.keywords &&
                      project.keywords.map((keyword, index) => (
                        <span className="chip" key={keyword + index}>
                          <Chip
                            label={keyword}
                            size="small"
                            style={{
                              backgroundColor: "#70d8bd",
                              color: "black",
                              margin: "3px",
                            }}
                          />
                        </span>
                      ))}
                  </div>

                  {isModalOpen && (
                    <Modal
                      onRequestClose={toggleModal}
                      dataset={project.dataset}
                    />
                  )}
                </div>
                {project.dataset && project.dataset.length > 0 && (
                  <div className="right">
                    <button
                      onClick={toggleModal}
                      type="button"
                      className="button-dataset"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "OpenSans-Light",
                        marginRight: "41px",
                      }}
                    >
                      {" "}
                      <PeopleIcon />
                      <span className="text-dataset"> Dataset</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            {project.status !== ProjectStatus.FAILED ? (
              project.status === ProjectStatus.IN_PROGRESS ? (
                <div
                  className="small-title-project"
                  style={{ textAlign: "center" }}
                >
                  Fetching data for project is in progress. Please be patient{" "}
                  <BeatLoader color="#36d7b7" />
                </div>
              ) : (
                <>
                  <div className="project-header">
                    <Scroll
                      items={[
                        ...getTimeRangeCards(project, handleDeleteTimeRange),
                        <GlobalCard
                          imgUrl={newTimeRangeImg}
                          key="newTimeRangeForm"
                          linkTo={`/project/${project._id}/network/${project.sourceNetwork._id}/addTimeRanges`}
                          title="New Time Range"
                          description="Create new time ranges"
                        />,
                      ]}
                    />
                  </div>
                  {project.status === ProjectStatus.CREATING_TIME_RANGES && (
                    <div
                      className="small-title-project"
                      style={{ textAlign: "center" }}
                    >
                      Creating time ranges. Please be patient{" "}
                      <BeatLoader color="#36d7b7" />
                    </div>
                  )}
                  <MyTabs
                    tabs={[
                      {
                        id: 1,
                        name: "Source Network",
                        component: (
                          <SourceNetwork network={project.sourceNetwork} />
                        ),
                      },
                      {
                        id: 2,
                        name: "Network Evolution",
                        component:
                          project.timeRanges.length === 0 ? (
                            project.status === ProjectStatus.READY && (
                              <div className="small-title-project">
                                No Time Ranges
                              </div>
                            )
                          ) : (
                            <NetworkEvolution project={project} />
                          ),
                      },
                      {
                        id: 3,
                        name: "Node Evolution",
                        component:
                          project.timeRanges.length === 0 ? (
                            project.status === ProjectStatus.READY && (
                              <div className="small-title-project">
                                No Time Ranges
                              </div>
                            )
                          ) : (
                            <NodesPage project={project} />
                          ),
                      },
                      {
                        id: 4,
                        name: "Community Evolution",
                        component: (
                          <>
                            <div className="title-project">
                              Community Evolution
                            </div>
                            <div className="small-title-project">
                              {/* <CommunityEvolution communities={project.timeRanges.map((timeRange) => {
                            return timeRange.network.communities;
                          })}/> */}
                              {/* input to set threshold */}
                              <div className="small-title-project">
                                <div style={{ color: "white" }}>Threshold</div>
                                <input
                                  type="number"
                                  value={thresholdQuery}
                                  onChange={(e) =>
                                    setThresholdQuery(e.target.value)
                                  }
                                  min={0}
                                  max={1}
                                  step={0.01}
                                />
                                <Button onClick={handleThresholdChange}>
                                  <ArrowForwardIcon />
                                </Button>
                              </div>
                              {/* input to set slice */}
                              <div className="small-title-project">
                                <div style={{ color: "white" }}>
                                  Top Communities
                                </div>
                                <input
                                  type="number"
                                  value={slice}
                                  onChange={(e) => setSlice(e.target.value)}
                                  min={1}
                                  max={Math.max(
                                    ...project.timeRanges.map(
                                      (timeRange) =>
                                        Object.keys(
                                          timeRange.network.communities
                                        ).length
                                    )
                                  )}
                                  step={1}
                                />
                                <Button onClick={handleSliceChange}>
                                  <ArrowForwardIcon />
                                </Button>
                              </div>
                              <CommunityEvolution
                                communities={communities}
                                threshold={threshold}
                              />
                            </div>
                          </>
                        ),
                      },
                    ]}
                  />
                  {isExporting && (
                    <div
                      className="small-title-project"
                      style={{ marginBottom: "10px", textAlign: "center" }}
                    >
                      Exporting project. Please be patient{" "}
                      <BeatLoader color="#36d7b7" />
                    </div>
                  )}
                  {isDeleting && (
                    <div
                      className="small-title-project"
                      style={{ marginBottom: "10px", textAlign: "center" }}
                    >
                      Deleting project. Please be patient{" "}
                      <BeatLoader color="#36d7b7" />
                    </div>
                  )}
                  <div
                    className="button-container"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      width: "100%",
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleExport}
                      style={{
                        "& > *": {
                          margin: "auto",
                        },
                      }}
                    >
                      <FileDownloadIcon />
                      Export
                    </Button>
                    <Delete
                      onDelete={handleDelete}
                      title={`Delete Project: ${title}`}
                    />
                    <Edit
                      inputs={[
                        {
                          type: "text",
                          value: title || project.title,
                          className: "title-project title-timerange-top",
                        },
                        {
                          type: "text",
                          value: description || project.description,
                          className: "mid-title-project width-element-top",
                        },
                      ]}
                      onSubmit={handleEdit}
                    />
                  </div>
                </>
              )
            ) : (
              project.status === ProjectStatus.FAILED && (
                <>
                  <div className="small-title-project">
                    Project failed to create. Please try again.
                  </div>
                  <Delete
                    onDelete={handleDelete}
                    title={`Delete Project: ${title}`}
                  />
                </>
              )
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
