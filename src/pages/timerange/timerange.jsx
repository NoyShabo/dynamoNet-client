import { DisplayGraph } from "../../cmp/network-graph/networkGraph";
import { NetworkMetrics } from "../../cmp/network-metrics/networkMetrics";
import timeRange from "../../data/timeRange.json";
import "../../globalStyle.scss";
import "./timerange.scss";

export function Timerange() {
  return (
    <div className="timerange">
      <div className="timerange-container">
        <div className="title-project">{timeRange.title}</div>
        <div className="small-title-project">
          {new Date(timeRange.startDate).toLocaleDateString()} ↔{" "}
          {new Date(timeRange.endDate).toLocaleDateString()}
        </div>
        <div className="network-container">
          <DisplayGraph
            width="80vw"
            height="70vh"
            network={timeRange.network}
          />
        </div>
        <NetworkMetrics network={timeRange.network} />
      </div>
    </div>
  );
}
