import React, { useState } from "react";
import { Delete } from "../../cmp/delete/delete";
import { Edit } from "../../cmp/edit/edit";
import { DisplayGraph } from "../../cmp/network-graph/networkGraph";
import { NetworkMetrics } from "../../cmp/network-metrics/networkMetrics";
import timeRange from "../../data/timeRange.json";
import "../../globalStyle.scss";
import "./timerange.scss";

export function Timerange() {
  const [timeRangeTitle, setTimeRangeTitle] = useState(timeRange.title);

  const handleDelete = (id) => {
    console.log("Delete");
  };

  return (
    <div className="timerange">
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
        <div className="network-container">
          <DisplayGraph
            width="80vw"
            height="70vh"
            network={timeRange.network}
          />
        </div>
        <NetworkMetrics network={timeRange.network} />
        <Delete
          onDelete={handleDelete}
          title={`Delete Time Range: ${timeRangeTitle}`}
        />
      </div>
    </div>
  );
}
