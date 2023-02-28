import { DisplayGraph } from "../../cmp/network-graph/networkGraph";
import { PieChart } from "../../cmp/pie/pie";
import "./timerange.scss";
import timeRange from "../../data/timeRange.json";

export function Timerange() {
  const retweetsQuote = {
    retweets: timeRange.network.retweetNetworkMetrics.numberOfEdges,
    quotes: timeRange.network.quoteNetworkMetrics.numberOfEdges,
  };

  return (
    <div className="timerange">
      <h2 className="title">Before election</h2>
      <DisplayGraph width="80vw" height="70vh" network={timeRange.network}/> 
      <h2 className="title">Metrics</h2>
      <div className="container-chart">
        {/* {if (retweetsQuote.retweets > 0 && retweetsQuote.quotes > 0 ) {
          <PieChart width={300} height={300} dataObject={retweetsQuote} />
        } else {
          <div className="no-data">No data</div>
        } } */}
      </div>
    </div>
  );
}
