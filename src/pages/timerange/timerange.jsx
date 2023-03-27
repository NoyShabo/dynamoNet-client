import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Delete } from "../../cmp/delete/delete";
import { Edit } from "../../cmp/edit/edit";
import { DisplayGraph } from "../../cmp/network-graph/networkGraph";
import { NetworkMetrics } from "../../cmp/network-metrics/networkMetrics";
// import timeRange from "../../data/timeRange.json";
import { Select } from "@mantine/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BeatLoader from "react-spinners/BeatLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../globalStyle.scss";
import { setProject } from "../../redux/actions/projectActions";
import {
  deleteTimeRangeStore,
  setTimeRange,
} from "../../redux/actions/timeRangeActions";
import { getProject } from "../../serverApi/rest/projectApi";
import {
  deleteTimeRange,
  getTimeRange,
  updateTimeRange,
} from "../../serverApi/rest/timeRangeApi";
import "./timerange.scss";

export function Timerange({}) {
  const timeRange = useSelector((state) => state.timeRangeModule.timeRange);
  const project = useSelector((state) => state.projectModule.project);
  const dispatch = useDispatch();
  const [timeRangeTitle, setTimeRangeTitle] = useState("");
  const { timeRangeId, projectId } = useParams();
  const navigate = useNavigate();
  const [network, setNetwork] = useState(null);

  const getTimeRangeById = async (id, withNetwork = false) => {
    const res = await getTimeRange(id, withNetwork);
    dispatch(setTimeRange(res));
  };

  function backPrevPage() {
    navigate(`/project/${projectId}`);
  }
  // const TRIds=["6405c91d024f895891dfe76b","6405c941024f895891dfe76d","6405c959024f895891dfe76f","6405c962024f895891dfe771"]
  const TRIds = [];
  // if(project){
  //   project.timeRanges.forEach((tr) => {
  //     TRIds.push(tr._id);
  //   });
  // }
  const getProjectById = async (id) => {
    const res = await getProject(id);
    dispatch(setProject(res));
  };

  useEffect(() => {
    if (project && project.timeRanges) {
      project.timeRanges.forEach((tr) => {
        TRIds.push(tr._id);
      });
    }
  }, []);

  useEffect(() => {
    if (project && project.timeRanges) {
      project.timeRanges.forEach((tr) => {
        TRIds.push(tr._id);
      });
    } else {
      if (projectId && projectId !== "") getProjectById(projectId);
    }
  }, [project]);

  function clickTrLeftArrow() {
    const index = TRIds.indexOf(timeRangeId);
    console.log(timeRangeId);
    let navigateIndex;
    if (index === 0) {
      navigateIndex = TRIds.length - 1;
    } else {
      navigateIndex = index - 1;
    }
    console.log(TRIds);

    navigate(`/project/${projectId}/timerange/${TRIds[navigateIndex]}`);
  }

  function clickTRightArrow() {
    if (project && project.timeRanges) {
      project.timeRanges.forEach((tr) => {
        TRIds.push(tr._id);
      });
    }
    const index = TRIds.indexOf(timeRangeId);
    console.log(index);

    let navigateIndex;
    if (index === TRIds.length - 1) {
      navigateIndex = 0;
    } else {
      navigateIndex = index + 1;
    }
    console.log(TRIds);

    navigate(`/project/${projectId}/timerange/${TRIds[navigateIndex]}`);
  }

  useEffect(() => {
    getTimeRangeById(timeRangeId);
    // return () => {
    //   dispatch(deleteTimeRangeStore());
    // };
  }, [timeRangeId]);

  useEffect(() => {
    if (timeRange) {
      setTimeRangeTitle(timeRange.title);
      if (timeRange.network && !timeRange.network.nodes)
        getTimeRangeById(timeRangeId, true);
      // getNetworkById(timeRange.network);
      else setNetwork(timeRange.network);
    }
  }, [timeRange]);

  const handleDelete = async () => {
    try {
      const res = await deleteTimeRange(timeRangeId, projectId);
      navigate(`/project/${projectId}`);
    } catch (e) {
      // console.error("error deleting time range: ", e);
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleUpdate = async (title) => {
    try {
      const res = await updateTimeRange(timeRangeId, projectId, { title });
      setTimeRangeTitle(title);
    } catch (e) {
      // console.error("error updating time range: ", e);
      toast.error(e.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <div className="title-project title-header ">
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
        Time Range Details
      </div>
      <div className="timerange">
        {!timeRange || timeRange._id !== timeRangeId ? (
          <div className="timerange-container title-project">
            Loading Time Range <BeatLoader color="#36d7b7" />
          </div>
        ) : (
          <div className="timerange-container">
            <div className="arrow-left-tr" onClick={clickTrLeftArrow}>
              ←
            </div>
            <div className="arrow-right-tr" onClick={clickTRightArrow}>
              →
            </div>
            <div className="timerange-header">
              <div className="timerange-info">
                <Edit
                  inputs={[
                    {
                      type: "text",
                      value: timeRangeTitle || timeRange.title,
                      className: "title-project title-timerange-top",
                    },
                  ]}
                  onSubmit={(values) => handleUpdate(values[0])}
                />
                {/* <div className="title-project title-timerange-top">{timeRange.title}</div> */}
                <div className="small-title-project">
                  {new Date(timeRange.startDate).toLocaleDateString()} ↔{" "}
                  {new Date(timeRange.endDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            {timeRange.network &&
            timeRange.network.nodes &&
            timeRange.network.nodes.length > 0 ? (
              <div>
                {/* select to filter network edges */}
                <div className="network-filter">
                  <Select
                    placeholder="Select edge type"
                    // data={[
                    //   { label: "All", value: "all" },
                    //   { label: "Retweet", value: "retweet" },
                    //   { label: "Quote", value: "quote" },
                    // ]}
                    data={[
                      { label: "All", value: "all" },
                      ...(project
                        ? project.edgeTypes.map((edgeType) => {
                            return { label: edgeType, value: edgeType };
                          })
                        : []),
                    ]}
                    onChange={(value) => {
                      if (value === "all")
                        setNetwork(network ? timeRange.network : null);
                      else {
                        const edges = [];
                        const nodes = new Set();
                        timeRange.network.edges.forEach((edge) => {
                          if (edge.edgeType === value) {
                            edges.push(edge);
                            nodes.add(edge.source);
                            nodes.add(edge.destination);
                          }
                        });

                        const filteredNetwork = {
                          ...timeRange.network,
                          edges,
                          nodes: Array.from(nodes),
                        };
                        setNetwork(filteredNetwork);
                      }
                    }}
                  />
                </div>
                <div className="network-container">
                  <DisplayGraph
                    width="80vw"
                    height="70vh"
                    network={network}
                    title={timeRange.title}
                  />
                </div>
              </div>
            ) : timeRange.network && timeRange.network.nodes ? (
              <div className="small-title-project">
                There's no network to display
              </div>
            ) : (
              <div
                className="small-title-project"
                style={{ textAlign: "center" }}
              >
                Loading network <BeatLoader color="#36d7b7" />
              </div>
            )}
            <NetworkMetrics network={timeRange.network} />
            <Delete
              onDelete={handleDelete}
              title={`Delete Time Range: ${timeRangeTitle}`}
            />
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
