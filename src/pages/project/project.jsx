import { CardTimeRange } from "../../cmp/card/card";
import "./project.scss";

import { Scroll } from "../../cmp/scroll/scroll";
import "../../globalStyle.scss";

import { BarChart } from "../../cmp/bar-chart/bar-chart";
import { LineChart } from "../../cmp/line-chart/line-chart";
import { MetricsBox } from "../../cmp/metricsBox/metricsBox";
import { PieChart } from "../../cmp/pie/pie";
import project from "../../data/project.json";
import calendarImg from '../../images/calendar.png'


import { NetworkMetrics } from "../../cmp/network-metrics/networkMetrics";

const timeRanges = project.timeRanges;
const cards = timeRanges.map((timeRange) => {
  return (
    <CardTimeRange
      imgUrl={calendarImg}
      key={timeRange._id}
      id={timeRange._id}
      title={timeRange.title}
      description={`${new Date(
        timeRange.startDate
      ).toLocaleDateString()} ↔  ${new Date(
        timeRange.endDate
      ).toLocaleDateString()}`}
    />
  );
});

const numberOfNodes = [];
const numberOfEdges = [];
const density = [];
// const diameter = [];
// const radius = [];
const reciprocity = [];
const degreeCentrality = [
  {
    id: "Degree Centrality",
    data: [],
  },
];

const radius = [
  {
    id: "Radius",
    data: [],
  },
];

const diameter = [
  {
    id: "Diameter",
    data: [],
  },
];

timeRanges.forEach((timeRange) => {
  numberOfNodes.push({
    window: timeRange.title,
    frequency: timeRange.network.networkMetrics.numberOfNodes,
  });
  numberOfEdges.push({
    window: timeRange.title,
    frequency: timeRange.network.networkMetrics.numberOfEdges,
  });
  density.push({
    window: timeRange.title,
    frequency: timeRange.network.networkMetrics.density,
  });
  // diameter.push({window: timeRange.title, frequency: timeRange.network.networkMetrics.diameter});
  // radius.push({window: timeRange.title, frequency: timeRange.network.networkMetrics.radius});
  reciprocity.push({
    window: timeRange.title,
    frequency: timeRange.network.networkMetrics.reciprocity,
  });
  degreeCentrality[0].data.push({
    x: timeRange.title,
    y: timeRange.network.networkMetrics.degreeCentrality,
  });
  radius[0].data.push({
    x: timeRange.title,
    y: timeRange.network.networkMetrics.radius,
  });
  diameter[0].data.push({
    x: timeRange.title,
    y: timeRange.network.networkMetrics.diameter,
  });
});

export function Project() {
  return (
    <div className="project-page">
      <div className="project-container">
        <div className="title-project">Project Title</div>
        <div className="small-title-project">Project Description</div>

        <Scroll items={cards} />

        <div className="network-evolution">
          <div className="title-project">Network Evolution</div>
          <div className="small-title-project">
            Evolution by all Time ranges
          </div>
          <div className="charts-list">
            <div className="chart-container">
              <div className="small-title-project">
                Number of Nodes Evolution
              </div>
              <BarChart
                width={100 * numberOfNodes.length}
                height={400}
                data={numberOfNodes}
              />
            </div>
            <div className="chart-container">
              <div className="small-title-project">
                Number of Edges Evolution
              </div>
              <BarChart
                width={100 * numberOfEdges.length}
                height={400}
                data={numberOfEdges}
              />
            </div>
            <div className="chart-container">
              <div className="small-title-project">Density Evolution</div>
              <BarChart
                width={100 * density.length}
                height={400}
                data={density}
              />
            </div>
            {/* <div className='chart-container'>
                            <div className='small-title-project'>Degree Centrality Evolution</div>
                            <BarChart width={100*degreeCentrality.length} height={400} data={degreeCentrality}/>
                        </div> */}
            {/* <div className='chart-container'>
                            <div className='small-title-project'>Diameter Evolution</div>
                            <BarChart width={100*diameter.length} height={400} data={diameter}/>
                        </div>
                        <div className='chart-container'>
                            <div className='small-title-project'>Radius Evolution</div>
                            <BarChart width={100*radius.length} height={400} data={radius}/>
                        </div> */}
            <div className="chart-container">
              <div className="small-title-project">Reciprocity Evolution</div>
              <BarChart
                width={100 * reciprocity.length}
                height={400}
                data={reciprocity}
              />
            </div>

            <div className="chart-container chart-container-line">
              <div className="small-title-project">
                Degree Centrality Evolution
              </div>
              <LineChart data={degreeCentrality} />
            </div>
            <div className="chart-container chart-container-line">
              <div className="small-title-project">Radius Evolution</div>
              <LineChart data={radius} />
            </div>
            <div className="chart-container chart-container-line">
              <div className="small-title-project">Diameter Evolution</div>
              <LineChart data={diameter} />
            </div>
          </div>
        </div>
        <div className="source-network">
          <div className="title-project">Source Network</div>
          <div className="small-title-project">
            Metrics for the source network
          </div>
          <NetworkMetrics network={project.sourceNetwork} />
        </div>
      </div>
    </div>
  );
}
