import React, { useEffect, useState } from "react";
import "../../globalStyle.scss";
import "./nodeGraphs.scss";

import { BarChart } from "../bar-chart/bar-chart";
import { LineChart } from "../line-chart/line-chart";
import { NodeCard } from "../node-details/nodeDetails";

function getNodeSelectedDetails(name) {
  console.log(name == "JoeBiden");
  ///fetche
  let fetchNode;
  if (name == "BernieSanders") {
    return (fetchNode = {
      _id: "63f61e5a43ed141319fe4084",
      twitterId: "74076264",
      name: "BernieSanders",
      screenName: "RevMaryLou",
      location: "Rochester, NY",
      description:
        "I am a retired minister and teacher. I am a singer/songwriter. I am poor. My son & I are medically disabled and share housing. I seek a just society.",
      followersCount: 55,
      friendsCount: 3,
      statusesCount: 44,
      registrationDateTwitter: "2009-09-14T04:54:35.000Z",
    });
  }
  if (name == "JoeBiden") {
    return (fetchNode = {
      _id: "63f61e5a43ed141319fe4084",
      twitterId: "74076264",
      name: "JoeBiden",
      screenName: "RevMaryLou",
      location: "Rochester, NY",
      description:
        "I am a retired minister and teacher. I am a singer/songwriter. I am poor. My son & I are medically disabled and share housing. I seek a just society.",
      followersCount: 3,
      friendsCount: 44,
      statusesCount: 55,
      registrationDateTwitter: "2009-09-14T04:54:35.000Z",
    });
  }

  return (fetchNode = {
    _id: "63f61e5a43ed141319fe4084",
    twitterId: "74076264",
    name: "KamalaHarris",
    screenName: "RevMaryLou",
    location: "Rochester, NY",
    description:
      "I am a retired minister and teacher. I am a singer/songwriter. I am poor. My son & I are medically disabled and share housing. I seek a just society.",
    followersCount: 3,
    friendsCount: 44,
    statusesCount: 55,
    registrationDateTwitter: "2009-09-14T04:54:35.000Z",
  });
}

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
  if (metric == "degree") {
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

  useEffect(() => {
    console.log("nodeSelected", nodeSelected);
    console.log("nodeName", nodeName);
    setNodeSelected(getNodeSelectedDetails(nodeName));
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
