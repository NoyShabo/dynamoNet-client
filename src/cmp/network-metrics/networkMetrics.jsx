import InfoIcon from "@mui/icons-material/Info";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { MetricsBox } from "../../cmp/metricsBox/metricsBox";
import { PieChart } from "../../cmp/pie/pie";

import "../../globalStyle.scss";
import "./networkMetrics.scss";

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

  const tooltipContent = `<strong>Nodes</strong>: represent the entities of the network.<br>
  <strong>Edges</strong>: represent the relationships between the entities.<br>
  <strong>Community</strong>: a group of nodes that are more connected to each other than to the rest of the network.<br>
  <strong>Density</strong>: the ratio of the number of edges in the network to the total number of possible edges.<br>
  <strong>Degree Centrality</strong>: the number of edges connected to a node.<br>
  <strong>Diameter</strong>: the longest shortest path between any two nodes in the network.<br>
  <strong>Modularity</strong>: the degree to which the network may be subdivided into such clearly delineated groups.`;

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
    <div className="charts-list">
      {network.centralNodes && Object.keys(network.centralNodes).length > 0 && (
        <div className="chart-container" key={`container_centrality`}>
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
      {/* {numberOfEdgesPerType.retweets > 0 && numberOfEdgesPerType.quotes > 0 && ( */}
      <div className="chart-container">
        <div className="small-title-project">Edges Types</div>
        {/* {numerRender == 2 ? ( */}
        <PieChart dataObject={numberOfEdgesPerType} width={300} height={300} />
        {/* ) : ( */}
        {/* setNumberRender(2) */}
        {/* )} */}
      </div>
      {/* )} */}
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
          <div className="title-project">Retweets Only Metrics</div>
          {createTooltip(tooltipContent)}
          <MetricsBox {...network.retweetNetworkMetrics} />
        </div>
      )}
      {numberOfEdgesPerType.quotes > 0 && (
        <div className="chart-container">
          <div className="title-project">Quotes Only Metrics</div>
          {createTooltip(tooltipContent)}
          <MetricsBox {...network.quoteNetworkMetrics} />
        </div>
      )}
      {network.metricsPerEdgeType &&
        Object.keys(network.metricsPerEdgeType).length > 0 &&
        Object.keys(network.metricsPerEdgeType).map((edgeType) => (
          <div className="chart-container" key={`container_${edgeType}`}>
            <div className="title-project" key={`title_${edgeType}`}>
              {edgeType} Metrics
            </div>
            {createTooltip(tooltipContent)}
            <MetricsBox {...network.metricsPerEdgeType[edgeType]} />
          </div>
        ))}
    </div>
  );
}
