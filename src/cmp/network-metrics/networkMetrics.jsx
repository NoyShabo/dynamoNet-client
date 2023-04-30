import { useEffect, useState } from "react";
import { MetricsBox } from "../../cmp/metricsBox/metricsBox";
import { PieChart } from "../../cmp/pie/pie";

import "../../globalStyle.scss";
import "./networkMetrics.scss";

export function NetworkMetrics({ network }) {
  const [numberOfEdgesPerType, setNumberOfEdgesPerType] = useState({});
  const [isPieReady, setIsPieReady] = useState(false);

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
          <MetricsBox {...network.retweetNetworkMetrics} />
        </div>
      )}
      {numberOfEdgesPerType.quotes > 0 && (
        <div className="chart-container">
          <div className="title-project">Quotes Only Metrics</div>
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
            <MetricsBox {...network.metricsPerEdgeType[edgeType]} />
          </div>
        ))}
    </div>
  );
}
