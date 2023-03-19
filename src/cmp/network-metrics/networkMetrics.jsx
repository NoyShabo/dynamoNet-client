import { MetricsBox } from "../../cmp/metricsBox/metricsBox";
import { PieChart } from "../../cmp/pie/pie";

import "../../globalStyle.scss";

export function NetworkMetrics({ network }) {
  const retweetsQuote = {
    retweets: network.retweetNetworkMetrics.numberOfEdges,
    quotes: network.quoteNetworkMetrics.numberOfEdges,
  };

  return (
    <div className="charts-list">
      { network.centralNodes && Object.keys(network.centralNodes).length > 0 && 
        (
        <div className="chart-container" key={`container_centrality`}>
          <div className="title-project" key={`title_centrality`}>Central Nodes</div>
            { Object.keys(network.centralNodes).map((metric, i) => {
              return (
              <div key={`metrics_${metric}_${i}`}>
                <div style={{ marginBottom:"10px" }}  className="small-title-project" key={`central_${metric}`}>
                  {metric} centrality
                </div>
              <div style={{ color: 'white' ,marginBottom:"15px" }} key={`list_${metric}`}>
                  {network.centralNodes[metric].map((name, index) => (
                  <span style={{ backgroundColor: "rgb(33 44 69)" ,marginRight:"8px", padding:"4px", borderRadius:"5px" }}  className="name-cnt" key={`name_${index}`}>{name}  </span>
                  ))}
              </div>              
            </div>
            )
            })}
        </div>
      )}
      {retweetsQuote.retweets > 0 && retweetsQuote.quotes > 0 && (
        <div className="chart-container">
          <div className="small-title-project">Retweet & Quote Edges</div>
          <PieChart dataObject={retweetsQuote} width={300} height={300} />
        </div>
      )}
      <div className="chart-container">
        <div className="title-project">Overall Metrics</div>
        <MetricsBox {...network.networkMetrics} />
      </div>
      {retweetsQuote.retweets > 0 && (
        <div className="chart-container">
          <div className="title-project">Retweets Only Metrics</div>
          <MetricsBox {...network.retweetNetworkMetrics} />
        </div>
      )}
      {retweetsQuote.quotes > 0 && (
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
