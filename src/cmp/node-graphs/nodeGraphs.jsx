import React, { useEffect, useState } from "react";
import "../../globalStyle.scss";
import { getNode } from "../../serverApi/rest/nodeApi";
import { BarChart } from "../bar-chart/bar-chart";
import { LineChart } from "../line-chart/line-chart";
import { NodeCard } from "../node-details/nodeDetails";
import "./nodeGraphs.scss";

function getNodeMetrics(timeRanges, nodeName) {
  const result = [];
  for (const timeRange of timeRanges) {
    const nodeMetrics = timeRange.network.nodeMetrics;
    const newObj = {
      timeRangeTitle: timeRange.title,
      nodeMetrics: nodeMetrics[nodeName],
    };
    result.push(newObj);
  }
  return result;
}
function getNodeMetricsByMetricName(metric, nodeMetrics) {
  const final = [];
  if (metric === "degree") {
    nodeMetrics.forEach((element) => {
      final.push({
        window: element.timeRangeTitle,
        frequency: element.nodeMetrics ? element.nodeMetrics[metric] : null,
      });
    });
  } else {
    final.push({
      id: metric,
      data: [],
    });
    nodeMetrics.forEach((element) => {
      final[0].data.push({
        x: element.timeRangeTitle,
        y: element.nodeMetrics ? element.nodeMetrics[metric] : null,
      });
    });
  }
  return final;
}

export function NodeGraphs({ timeRanges, nodeName }) {
  const [nodeMetrics, setNodeMetrics] = useState([]);
  const [degreeMetricData, setDegreeMetricData] = useState([]);
  const [closenessCentralityMetricData, setclosenessCentralityMetricData] =
    useState([]);
  const [betweennessCentralityMetricData, setbetweennessCentralityMetricData] =
    useState([]);
  const [
    localClusteringCoefficientMetricData,
    setlocalClusteringCoefficientMetricData,
  ] = useState([]);
  const [nodeSelected, setNodeSelected] = useState({});

  useEffect(() => {
    setNodeMetrics(getNodeMetrics(timeRanges, nodeName));
  }, [timeRanges, nodeName]);

  useEffect(() => {
    setDegreeMetricData(getNodeMetricsByMetricName("degree", nodeMetrics));
    setclosenessCentralityMetricData(
      getNodeMetricsByMetricName("closenessCentrality", nodeMetrics)
    );
    setbetweennessCentralityMetricData(
      getNodeMetricsByMetricName("betweennessCentrality", nodeMetrics)
    );
    setlocalClusteringCoefficientMetricData(
      getNodeMetricsByMetricName("localClusteringCoefficient", nodeMetrics)
    );
  }, [nodeMetrics]);

  const getNodeSelectedDetails = async (nodeName) => {
    try {
      const res = await getNode(nodeName);
      setNodeSelected(res.node);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  useEffect(() => {
    console.log("nodeName", nodeName);
    getNodeSelectedDetails(nodeName);
  }, [nodeName]);

  return (
    <div className="graphs">
      <NodeCard nodeDetails={nodeSelected}></NodeCard>
      <div className="head-title"> Node Evolution</div>
      <div className="charts-list">
        <div className="chart-container">
          <div className="small-title-project">Degree Evolution</div>
          <BarChart
            width={100 * degreeMetricData.length}
            height={400}
            data={degreeMetricData}
          />
        </div>
        <div className="chart-container chart-container-line">
          <div className="small-title-project">
            {" "}
            Closeness Centrality Evolution
          </div>
          <LineChart data={closenessCentralityMetricData} />
        </div>
        <div className="chart-container chart-container-line">
          <div className="small-title-project">
            {" "}
            Betweenness Centrality Evolution
          </div>
          <LineChart data={betweennessCentralityMetricData} />
        </div>
        <div className="chart-container chart-container-line">
          <div className="small-title-project">
            {" "}
            Local Clustering Coefficient Evolution
          </div>
          <LineChart data={localClusteringCoefficientMetricData} />
        </div>
      </div>
    </div>
  );
}
