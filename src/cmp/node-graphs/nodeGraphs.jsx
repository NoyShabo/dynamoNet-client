import React, { useEffect, useState } from "react";
import "../../globalStyle.scss";
import { getNode } from "../../serverApi/rest/nodeApi";
import { BarChart } from "../bar-chart/bar-chart";
import { Bars } from "../bar-group/barGroup";
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
      nodeName: nodeName,
    };
    result.push(newObj);
  }
  return result;
}
function getNodeMetricsByMetricName(metric, nodeMetrics, timeRanges = []) {
  const final = [];
  if (metric === "degree" || metric === "inDegree" || metric === "outDegree") {
    // // nodeMetrics.forEach((element) => {
    // for (const node in nodeMetrics) {
    //   nodeMetrics[node].forEach((element) => {
    //     final.push({
    //       window: element.timeRangeTitle,
    //       frequency: element.nodeMetrics ? element.nodeMetrics[metric] : null,
    //       key: `${element.timeRangeTitle}-${element.nodeName}`,
    //     });
    //   });
    // }
    // // });
    timeRanges.forEach((timeRange) => {
      final.push({
        date: timeRange.title,
      });
    });
    for (const node in nodeMetrics) {
      nodeMetrics[node].forEach((element) => {
        final.forEach((timeRange) => {
          if (timeRange.date === element.timeRangeTitle) {
            timeRange[node] = element.nodeMetrics
              ? element.nodeMetrics[metric]
              : 0;
          }
        });
        // final[final.length - 1][node] = element.nodeMetrics
        //   ? element.nodeMetrics[metric]
        //   : null;
      });
    }
  } else {
    // nodeMetrics.forEach((element) => {
    for (const node in nodeMetrics) {
      final.push({
        id: node,
        data: [],
      });
      nodeMetrics[node].forEach((element) => {
        final[final.length - 1].data.push({
          x: element.timeRangeTitle,
          y: element.nodeMetrics ? element.nodeMetrics[metric] : null,
        });
      });
    }
    // });
  }
  return final;
}

export function NodeGraphs({ timeRanges, nodeName, nodes }) {
  const [nodeMetrics, setNodeMetrics] = useState({});
  const [degreeMetricData, setDegreeMetricData] = useState([]);
  const [indegreeMetricData, setIndegreeMetricData] = useState([]);
  const [outdegreeMetricData, setOutdegreeMetricData] = useState([]);

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
    // setNodeMetrics(getNodeMetrics(timeRanges, nodeName));
    setNodeMetrics({});
    for (const node of nodes) {
      setNodeMetrics((prev) => ({
        ...prev,
        [node]: getNodeMetrics(timeRanges, node),
      }));
    }
  }, [timeRanges, nodes]);

  useEffect(() => {
    setDegreeMetricData(
      getNodeMetricsByMetricName("degree", nodeMetrics, timeRanges)
    );
    setIndegreeMetricData(
      getNodeMetricsByMetricName("inDegree", nodeMetrics, timeRanges)
    );
    setOutdegreeMetricData(
      getNodeMetricsByMetricName("outDegree", nodeMetrics, timeRanges)
    );

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
    getNodeSelectedDetails(nodeName);
  }, [nodeName]);

  return (
    <div className="graphs">
      {/* <NodeCard nodeDetails={nodeSelected}></NodeCard> */}
      {/* <div className="head-title"> Node Evolution</div> */}
      <div className="charts-list">
        <div className="chart-container chart-container-node">
          <div className="small-title-project">Indegree Evolution</div>
          {/* <BarChart
            width={100 * indegreeMetricData.length}
            height={400}
            data={indegreeMetricData}
          /> */}
          {indegreeMetricData.length > 0 && (
            <Bars
              // width={window.innerWidth * 0.8}
              width={Math.min(
                100 * (Object.keys(nodeMetrics).length + timeRanges.length),
                window.innerWidth * 0.6
              )}
              height={400}
              data={indegreeMetricData}
            />
          )}
        </div>
        <div className="chart-container chart-container-node">
          <div className="small-title-project">Outdegree Evolution</div>
          {outdegreeMetricData.length > 0 && (
            <Bars
              width={Math.min(
                100 * (Object.keys(nodeMetrics).length + timeRanges.length),
                window.innerWidth * 0.8
              )}
              height={400}
              data={outdegreeMetricData}
            />
          )}
        </div>
        <div className="chart-container chart-container-node">
          <div className="small-title-project">Degree Evolution</div>
          {degreeMetricData.length > 0 && (
            <Bars
              // width={window.innerWidth * 0.8}
              width={Math.min(
                100 * (Object.keys(nodeMetrics).length + timeRanges.length),
                window.innerWidth * 0.8
              )}
              height={400}
              data={degreeMetricData}
            />
          )}
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
