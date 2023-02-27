import { DisplayGraph } from "../../cmp/network-graph/networkGraph";
import { PieChart } from "../../cmp/pie/pie";
import "./timerange.scss";

export function Timerange() {
  const retweetsQuote = {
    retweets: 32000,
    quotes: 52220,
    // timeRange_3:125,
  };

  return (
    <div className="timerange">
      <h2 className="title">Before election</h2>
      <DisplayGraph width="80vw" height="70vh"/> 
      <h2 className="title">Metrics</h2>
      <div className="container-chart">
        <PieChart width={300} height={300} dataObject={retweetsQuote} />
        <PieChart width={300} height={300} dataObject={retweetsQuote} />
      </div>
    </div>
  );
}
