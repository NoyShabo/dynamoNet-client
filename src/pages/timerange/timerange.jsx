import { set } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Delete } from "../../cmp/delete/delete";
import { Edit } from "../../cmp/edit/edit";
import { DisplayGraph } from "../../cmp/network-graph/networkGraph";
import { NetworkMetrics } from "../../cmp/network-metrics/networkMetrics";
// import timeRange from "../../data/timeRange.json";
import { Select } from "@mantine/core";
import "../../globalStyle.scss";
import { setTimeRange } from "../../redux/actions/timeRangeActions";
import {
  deleteTimeRange,
  getTimeRange,
  updateTimeRange,
} from "../../serverApi/rest/timeRangeApi";
// import { getNetwork } from "../../serverApi/rest/networkApi";
import { getNetwork } from "../../serverApi/rest/networkApi";
import "./timerange.scss";

export function Timerange() {
  const getNetworkById = async (id) => {
    const res = await getNetwork(id);
    // timeRange.network = res.network;
    setNetwork(res.network);
  };

  const timeRange = useSelector((state) => state.timeRangeModule.timeRange);
  const dispatch = useDispatch();
  const [timeRangeTitle, setTimeRangeTitle] = useState("");
  const { timeRangeId, projectId } = useParams();
  const navigate = useNavigate();
  const [network, setNetwork] = useState(null);

  const getTimeRangeById = async (id, withNetwork = false) => {
    const res = await getTimeRange(id, withNetwork);
    dispatch(setTimeRange(res));
  };

  useEffect(() => {
    getTimeRangeById(timeRangeId);
    return () => {
      // dispatch(removeSelectedTimeRange());
    };
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
      console.log(res);
      navigate(`/project/${projectId}`);
    } catch (e) {
      console.error("error deleting time range: ", e);
    }
  };

  const handleUpdate = async (title) => {
    try {
      const res = await updateTimeRange(timeRangeId, projectId, { title });
      setTimeRangeTitle(title);
    } catch (e) {
      console.error("error updating time range: ", e);
    }
  };

  return (
    <div className="timerange">
      {!timeRange && (
        <div className="timerange-container title-project">Loading...</div>
      )}
      {timeRange && (
        <div className="timerange-container">
          <div className="timerange-header">
            <div className="timerange-info">
              <Edit
                inputs={[
                  {
                    type: "text",
                    value: timeRangeTitle || timeRange.title,
                    className: "title-project",
                  },
                ]}
                onSubmit={(values) => handleUpdate(values[0])}
              />

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
                  data={[
                    { label: "All", value: "all" },
                    { label: "Retweet", value: "retweet" },
                    { label: "Quote", value: "quote" },
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
                <DisplayGraph width="80vw" height="70vh" network={network} />
              </div>
            </div>
          ) : timeRange.network && timeRange.network.nodes ? (
            <div className="small-title-project">
              There's no network to display
            </div>
          ) : (
            <div className="small-title-project">Loading network...</div>
          )}
          <NetworkMetrics network={timeRange.network} />
          <Delete
            onDelete={handleDelete}
            title={`Delete Time Range: ${timeRangeTitle}`}
          />
        </div>
      )}
    </div>
  );
}
