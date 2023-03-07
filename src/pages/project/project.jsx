import { Select } from "@mantine/core";
import PeopleIcon from "@mui/icons-material/People";
import { fontWeight } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GlobalCard } from "../../cmp/card/card";
import { Delete } from "../../cmp/delete/delete";
import { Edit } from "../../cmp/edit/edit";
import { Modal } from "../../cmp/modal/modal";
import { NetworkEvolution } from "../../cmp/network-evolution/networkEvolution";
import { DisplayGraph } from "../../cmp/network-graph/networkGraph";
import { NetworkMetrics } from "../../cmp/network-metrics/networkMetrics";
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
    console.log("network: ", res.network);
    setNetworkGraph(res.network);
  };

  useEffect(() => {
    if (network) getNetworkById(network._id);
  }, [network]);

  return (
    <div className="source-network">
      <div className="title-project">Source Network</div>
      {networkGraph && networkGraph.nodes && networkGraph.nodes.length > 0 ? (
        <div>
          {/* select to filter network edges */}
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
        <div className="small-title-project">Loading network...</div>
      )}
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

  const getProjectById = async (id) => {
    const res = await getProject(id);
    dispatch(setProject(res));
  };

  useEffect(() => {
    if (projectId && projectId !== "") getProjectById(projectId);
    return () => {
      dispatch(removeSelectedProject());
    };
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
      console.error("Updating project error!: ", err);
      // notify user about error
    }
  };

  const [isModalOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => {
    setModalIsOpen(!isModalOpen);
  };

  return (
    <>
    <div className="title-project title-header">Project Details</div>
    <div className="project-page">
      
      {!project ? (
        <div className="project-container title-project">Loading...</div>
      ) : (
        <div className="project-container">
          {project.status === ProjectStatus.IN_PROGRESS ? (
            <div className="small-title-project">
              Fetching data for project is in progress. Please be patient...
            </div>
          ) : (
            <>
              <div className="project-header">
                
                <Edit
                  inputs={[
                    {
                      type: "text",
                      value: title || project.title,
                      className: "title-project",
                    },
                    {
                      type: "text",
                      value: description || project.description,
                      className: "small-title-project",
                    },
                  ]}
                  onSubmit={handleEdit}
                />
                <div className="small-title-project">
                  {new Date(project.startDate).toLocaleDateString()} ↔{" "}
                  {new Date(project.endDate).toLocaleDateString()}
                </div>
                {isModalOpen && (
                  <Modal
                    onRequestClose={toggleModal}
                    dataset={project.dataset}
                  />
                )}
                <button
                  onClick={toggleModal}
                  type="button"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "OpenSans-Light",
                  }}
                >
                  <PeopleIcon />
                  <span className="text-dataset"> Dataset</span>
                </button>


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
                <div className="small-title-project">
                  Creating time ranges. Please be patient...
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
                        <div className="title-project">Community Evolution</div>
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
    </>
  );
}
