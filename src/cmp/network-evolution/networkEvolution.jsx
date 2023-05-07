import React, { useEffect, useState } from "react";
import { BarChart } from "../../cmp/bar-chart/bar-chart";
import { LineChart } from "../../cmp/line-chart/line-chart";

export function NetworkEvolution({ project }) {
  const [numberOfNodes, setNumberOfNodes] = useState([]);
  const [numberOfEdges, setNumberOfEdges] = useState([]);
  const [density, setDensity] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [modularity, setModularity] = useState([]);
  const [reciprocity, setReciprocity] = useState([]);
  const [degreeCentrality, setDegreeCentrality] = useState([
    { id: "Degree Centralization", data: [] },
  ]);
  const [radius, setRadius] = useState([{ id: "Radius", data: [] }]);
  const [diameter, setDiameter] = useState([{ id: "Diameter", data: [] }]);

  function setMetrics(timeRanges) {
    const numberOfNodes = [];
    const numberOfEdges = [];
    const density = [];
    const communities = [];

    const reciprocity = [];
    const degreeCentrality = [{ id: "Degree Centralization", data: [] }];
    const modularity = [{ id: "Modularity", data: [] }];
    const radius = [{ id: "Radius", data: [] }];
    const diameter = [{ id: "Diameter", data: [] }];
    timeRanges.forEach((timeRange) => {
      numberOfNodes.push({
        window: timeRange.title,
        frequency: timeRange.network.networkMetrics.numberOfNodes,
        key: `${timeRange._id}-numberOfNodes`,
      });
      numberOfEdges.push({
        window: timeRange.title,
        frequency: timeRange.network.networkMetrics.numberOfEdges,
        key: `${timeRange._id}-numberOfEdges`,
      });
      density.push({
        window: timeRange.title,
        frequency: timeRange.network.networkMetrics.density,
        key: `${timeRange._id}-density`,
      });
      communities.push({
        window: timeRange.title,
        frequency: Object.keys(timeRange.network.communities).length,
        key: `${timeRange._id}-density`,
      });
      reciprocity.push({
        window: timeRange.title,
        frequency: timeRange.network.networkMetrics.reciprocity,
        key: `${timeRange._id}-reciprocity`,
      });
      degreeCentrality[0].data.push({
        x: timeRange.title,
        y: timeRange.network.networkMetrics.degreeCentrality,
      });
      modularity[0].data.push({
        x: timeRange.title,
        y: timeRange.network.networkMetrics.modularity,
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
    setNumberOfNodes(numberOfNodes);
    setNumberOfEdges(numberOfEdges);
    setDensity(density);
    setCommunities(communities);
    setReciprocity(reciprocity);
    setDegreeCentrality(degreeCentrality);
    setModularity(modularity);
    setRadius(radius);
    setDiameter(diameter);
  }

  useEffect(() => {
    if (project) {
      setMetrics(project.timeRanges);
    }
  }, [project]);

  return (
    <div className="network-evolution">
      <div className="title-project">Network Evolution</div>
      <div className="small-title-project">Evolution by all Time ranges</div>

      <div className="charts-list">
        <div className="chart-container">
          <div className="small-title-project">Number of Nodes Evolution</div>
          <BarChart
            width={100 * numberOfNodes.length}
            height={400}
            data={numberOfNodes}
          />
        </div>
        <div className="chart-container">
          <div className="small-title-project">Number of Edges Evolution</div>
          <BarChart
            width={100 * numberOfEdges.length}
            height={400}
            data={numberOfEdges}
          />
        </div>
        <div className="chart-container">
          <div className="small-title-project">Density Evolution</div>
          <BarChart width={100 * density.length} height={400} data={density} />
        </div>
        <div className="chart-container">
          <div className="small-title-project">
            Communities Number Evolution
          </div>
          <BarChart
            width={100 * communities.length}
            height={400}
            data={communities}
          />
        </div>
        {/* <div className="chart-container">
          <div className="small-title-project">Reciprocity Evolution</div>
          <BarChart
            width={100 * reciprocity.length}
            height={400}
            data={reciprocity}
          />
        </div> */}

        <div className="chart-container chart-container-line">
          <div className="small-title-project">Modularity Evolution</div>
          <LineChart data={modularity} max={1} />
        </div>
        <div className="chart-container chart-container-line">
          <div className="small-title-project">
            Degree Centralization Evolution
          </div>
          <LineChart data={degreeCentrality} max={1} />
        </div>
        {/* <div className="chart-container chart-container-line">
          <div className="small-title-project">Radius Evolution</div>
          <LineChart data={radius} />
        </div> */}
        <div className="chart-container chart-container-line">
          <div className="small-title-project">Diameter Evolution</div>
          <LineChart data={diameter} />
        </div>
      </div>
    </div>
  );
}
