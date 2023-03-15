import { Select } from "@mantine/core";
import PeopleIcon from "@mui/icons-material/People";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { GlobalCard } from "../../cmp/card/card";
import { Delete } from "../../cmp/delete/delete";
import { Edit } from "../../cmp/edit/edit";
import { Modal } from "../../cmp/modal/modal";
import { NetworkEvolution } from "../../cmp/network-evolution/networkEvolution";
import { DisplayGraph } from "../../cmp/network-graph/networkGraph";
import { NetworkMetrics } from "../../cmp/network-metrics/networkMetrics";
import { NotificationPopup } from "../../cmp/notification-popup/notificationPopup";
import { Scroll } from "../../cmp/scroll/scroll";
import { Tabs } from "../../cmp/tabs/tabs";
import { ProjectStatus } from "../../constants";
import "../../globalStyle.scss";
import newTimeRangeImg from "../../images/add_timerange.png";
import calendarImg from "../../images/calendar.png";
import {
  removeSelectedProject,
  setProject,
} from "../../redux/actions/projectActions";
import { getNetwork } from "../../serverApi/rest/networkApi";
import { getProject, updateProject } from "../../serverApi/rest/projectApi";
import { NodesPage } from "../nodesMetrics/nodesMetrics";
import "./project.scss";

import Chip from '@mui/material/Chip';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

function getTimeRangeCards(project) {
  const timeRanges = project.timeRanges;
  const cards = timeRanges.map((timeRange) => {
    return (
      <GlobalCard
        imgUrl={calendarImg}
        key={timeRange._id}
        id={timeRange._id}
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

export function Project() {
  const project = useSelector((state) => state.projectModule.project);
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  function backPrevPage(){
      navigate("/projects");
  }

  const getProjectById = async (id) => {
    const res = await getProject(id);
    dispatch(setProject(res));
  };

  useEffect(() => {
    if (projectId && projectId !== "") getProjectById(projectId);
    // return () => {
    //   dispatch(removeSelectedProject());
    // };
  }, []);

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
    }
  }, [project]);

  const handleDelete = (id) => {
    console.log("Delete");
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
      setError(err);
      setShowNotification(true);
    }
  };

  const [isModalOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  return (
    <>
      <div>
        <div className="title-project title-header"><span><ArrowBackIcon onClick={backPrevPage} style={{ borderRadius: '50%', backgroundColor: '#222c45', color: '#fff', padding: '8px' ,fontSize : '50px' , position: "absolute",left: '20px',top:' 105px',cursor:"pointer"}} /></span>Project Details</div>
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
              <div className="title-project">{project.title}</div>
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
                    {project.keywords && project.keywords.map((keyword) => (
                      <span className="chip">
                        <Chip label={keyword} size="small" key={keyword} style={{ backgroundColor: '#70d8bd', color: 'black', margin: '3px' }} />
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
              </div>
            </div>
            {project.status === ProjectStatus.IN_PROGRESS ? (
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
                      ...getTimeRangeCards(project),
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
                <Tabs
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
                            In the works...
                          </div>
                        </>
                      ),
                    },
                  ]}
                />
                <Delete
                  onDelete={handleDelete}
                  title={`Delete Project: ${title}`}
                />
              </>
            )}
          </div>
        )}
      </div>
      <NotificationPopup
        message={error}
        showNotification={showNotification}
        setShowNotification={setShowNotification}
      />
    </>
  );
}
