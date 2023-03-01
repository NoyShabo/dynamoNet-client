import { set } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Delete } from "../../cmp/delete/delete";
import { Edit } from "../../cmp/edit/edit";
import { DisplayGraph } from "../../cmp/network-graph/networkGraph";
import { NetworkMetrics } from "../../cmp/network-metrics/networkMetrics";
// import timeRange from "../../data/timeRange.json";
import "../../globalStyle.scss";
import { setTimeRange } from "../../redux/actions/timeRangeActions";
import {
  deleteTimeRange,
  getTimeRange,
  updateTimeRange,
} from "../../serverApi/rest/timeRangeApi";
import "./timerange.scss";

export function Timerange() {
  const timeRange = useSelector((state) => state.timeRangeModule.timeRange);
  const dispatch = useDispatch();
  const [timeRangeTitle, setTimeRangeTitle] = useState("");
  const { timeRangeId } = useParams();

  const getTimeRangeById = async (id, withNetwork = false) => {
    const res = await getTimeRange(id, withNetwork);
    console.log("timeRanges res: ", res);
    dispatch(setTimeRange(res));
  };

  useEffect(() => {
    getTimeRangeById(timeRangeId);
    return () => {
      // dispatch(removeSelectedTimeRange());
    };
  }, [timeRangeId, dispatch]);

  useEffect(() => {
    console.log(timeRange);
    if (timeRange) {
      setTimeRangeTitle(timeRange.title);
      getTimeRangeById(timeRangeId, true);
    }
  }, [timeRange]);

  const handleDelete = (id) => {
    console.log("Delete");
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
                    value: timeRangeTitle,
                    className: "title-project",
                  },
                ]}
                onSubmit={(values) => setTimeRangeTitle(values[0])}
              />

              <div className="small-title-project">
                {new Date(timeRange.startDate).toLocaleDateString()} ↔{" "}
                {new Date(timeRange.endDate).toLocaleDateString()}
              </div>
            </div>
          </div>
          {timeRange.network.nodes && timeRange.network.nodes.length > 0 ? (
            <div className="network-container">
              <DisplayGraph
                width="80vw"
                height="70vh"
                network={timeRange.network}
              />
            </div>
          ) : timeRange.network.nodes ? (
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
