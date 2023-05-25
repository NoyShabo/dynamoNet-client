import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button } from "@mui/material";
import * as FileSaver from "file-saver";
import React, { useEffect, useState } from "react";
import XLSX from "sheetjs-style";
import { BarChart } from "../../cmp/bar-chart/bar-chart";
import { LineChart } from "../../cmp/line-chart/line-chart";

import "./networkEvolution.scss";
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

  const exportExcel = () => {
    const data = [];
    const timeRanges = project.timeRanges;
    console.log(timeRanges);
    timeRanges.forEach((timeRange) => {
      const timeRangeName = timeRange.title;
      const dates =
        new Date(timeRange.startDate).toLocaleDateString() +
        " - " +
        new Date(timeRange.endDate).toLocaleDateString();
      const nodes = timeRange.network.networkMetrics.numberOfNodes;
      const edges = timeRange.network.networkMetrics.numberOfEdges;
      const communities = Object.keys(timeRange.network.communities).length;
      const density = timeRange.network.networkMetrics.density;
      const diameter = timeRange.network.networkMetrics.diameter;
      const degreeCentralization =
        timeRange.network.networkMetrics.degreeCentrality;
      const modularity = timeRange.network.networkMetrics.modularity;
      data.push({
        "Timerange Name": timeRangeName,
        Dates: dates,
        Nodes: nodes,
        Edges: edges,
        Communities: communities,
        Density: density,
        Diameter: diameter,
        "Degree Centralization": degreeCentralization,
        Modularity: modularity,
      });
    });
    const fileName = `${project.title}- TimeRanges metrics`;
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataExport = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(dataExport, fileName + fileExtension);
  };

  return (
    <div className="network-evolution">
      <div className="title-project container-title-button">
        Network Evolution
        <Button
          variant="contained"
          size="small"
          onClick={exportExcel}
          style={{
            "& > *": {
              margin: "auto",
            },
          }}
        >
          <FileDownloadIcon />
          Export Metrics
        </Button>
      </div>
      <div className="container-title-button">
        <div className="small-title-project">Evolution by all Time ranges</div>
      </div>

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
