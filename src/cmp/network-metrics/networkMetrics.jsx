import { MetricsBox } from "../../cmp/metricsBox/metricsBox";
import { PieChart } from "../../cmp/pie/pie";

export function NetworkMetrics({ network }) {
  const retweetsQuote = {
    retweets: network.retweetNetworkMetrics.numberOfEdges,
    quotes: network.quoteNetworkMetrics.numberOfEdges,
  };

  return (
    <div className="charts-list">
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
    </div>
  );
}
