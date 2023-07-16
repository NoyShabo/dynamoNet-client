import InfoIcon from "@mui/icons-material/Info";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { MetricsBox } from "../../cmp/metricsBox/metricsBox";
import { PieChart } from "../../cmp/pie/pie";

import "../../globalStyle.scss";
import "./networkMetrics.scss";

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function createTooltip(content) {
  return (
    <>
      <InfoIcon
        data-tooltip-id="my-tooltip"
        effect="float"
        className="info-icon-metrics"
        data-tooltip-html={content}
      />
      <Tooltip id="my-tooltip" place="bottom" effect="float" />
    </>
  );
}

export function NetworkMetrics({ network }) {
  const [numberOfEdgesPerType, setNumberOfEdgesPerType] = useState({});
  const [isPieReady, setIsPieReady] = useState(false);

  const tooltipContent = `<strong>Nodes</strong>:<br> &emsp; Represent the entities of the network.<br>
  <br><strong>Edges</strong>:<br> &emsp; Represent the relationships between the entities.<br>
  <br><strong>Community</strong>:<br> &emsp; A group of nodes that are more connected to each other than to the rest of the network.<br>
  <br><strong>Density</strong>:<br> &emsp; The ratio of the number of edges in the network to the total number of possible edges.<br>
  <br><strong>Degree Centrality</strong>:<br> &emsp; Higher values indicates that the network is predominantly directed towards specific nodes,<br> &emsp; while lower values signifies a more equal distribution.<br>
  <br><strong>Diameter</strong>:<br> &emsp; The longest shortest path between any two nodes in the network.<br>
  <br><strong>Modularity</strong>:<br> &emsp; The degree to which the network may be subdivided into such clearly delineated groups.`;

  useEffect(() => {
    const keys = Object.keys(network.metricsPerEdgeType);
    setNumberOfEdgesPerType(
      keys.reduce((accumulator, metric) => {
        accumulator[metric] = network.metricsPerEdgeType[metric].numberOfEdges;
        return accumulator;
      }, {})
    );
    setIsPieReady(true);
  }, [network]);

  useEffect(() => {
    if (isPieReady) {
      setIsPieReady(false);
      const keys = Object.keys(network.metricsPerEdgeType);
      setNumberOfEdgesPerType(
        keys.reduce((accumulator, metric) => {
          accumulator[metric] =
            network.metricsPerEdgeType[metric].numberOfEdges;
          return accumulator;
        }, {})
      );
    }
  }, [isPieReady]);

  return (
    <div className="charts-list network-metrics">
      {network.centralNodes && Object.keys(network.centralNodes).length > 0 && (
        <div
          className="chart-container"
          style={{ width: "45%" }}
          key={`container_centrality`}
        >
          <div className="title-project" key={`title_centrality`}>
            Central Nodes
          </div>
          {Object.keys(network.centralNodes).map((metric, i) => {
            return (
              <div key={`metrics_${metric}_${i}`}>
                <div
                  style={{ marginBottom: "10px" }}
                  className="small-title-project"
                  key={`central_${metric}`}
                >
                  {metric} centrality
                </div>
                <div
                  className="name-cnt-conainer"
                  style={{ color: "white", marginBottom: "15px" }}
                  key={`list_${metric}`}
                >
                  {network.centralNodes[metric].map((name, index) => (
                    <span
                      style={{ backgroundColor: "rgb(33 44 69)" }}
                      className="name-cnt"
                      key={`name_${index}`}
                    >
                      {name}{" "}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="chart-container" style={{ width: "45%" }}>
        <div className="small-title-project">Edges Types</div>
        <PieChart dataObject={numberOfEdgesPerType} width={300} height={300} />
      </div>
      <div className="chart-container">
        <div className="title-project">Overall Metrics</div>
        {createTooltip(tooltipContent)}
        <MetricsBox
          {...network.networkMetrics}
          communities={
            network.communities ? Object.keys(network.communities).length : 0
          }
        />
      </div>
      {numberOfEdgesPerType.retweets > 0 && (
        <div className="chart-container">
          <div className="title-project">Retweets Metrics</div>
          {createTooltip(tooltipContent)}
          <MetricsBox {...network.retweetNetworkMetrics} />
        </div>
      )}
      {numberOfEdgesPerType.quotes > 0 && (
        <div className="chart-container">
          <div className="title-project">Quotes Metrics</div>
          {createTooltip(tooltipContent)}
          <MetricsBox {...network.quoteNetworkMetrics} />
        </div>
      )}
      {network.metricsPerEdgeType &&
        Object.keys(network.metricsPerEdgeType).length > 0 &&
        Object.keys(network.metricsPerEdgeType).map((edgeType) => (
          <div className="chart-container" key={`container_${edgeType}`}>
            <div className="title-project" key={`title_${edgeType}`}>
              {capitalize(edgeType)} Metrics
            </div>
            {createTooltip(tooltipContent)}
            <MetricsBox {...network.metricsPerEdgeType[edgeType]} />
          </div>
        ))}
    </div>
  );
}
