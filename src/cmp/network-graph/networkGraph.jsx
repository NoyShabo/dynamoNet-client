import { Button } from "@mantine/core";
import {
  ControlsContainer,
  FullScreenControl,
  SearchControl,
  SigmaContainer,
  useLoadGraph,
  ZoomControl,
} from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import {
  LayoutForceAtlas2Control,
  useWorkerLayoutForceAtlas2,
} from "@react-sigma/layout-forceatlas2";
import Graph from "graphology";
import { useEffect, useState } from "react";
import "./networkGraph.scss";

function genColor(seed) {
  let color = Math.floor(Math.abs(Math.sin(seed) * 16777215));
  color = color.toString(16);
  while (color.length < 6) {
    color = "0" + color;
  }

  return "#" + color;
}

export const LoadGraph = ({ network }) => {
  const [graph, setGraph] = useState();
  // const [isLayoutRunning, setIsLayoutRunning] = useState(false);

  const loadGraph = useLoadGraph();
  // const { start, stop } = useWorkerLayoutForceAtlas2({
  //   settings: { slowDown: 10 },
  // });

  const getNodeCommunity = (nodeId, communities) => {
    for (const communityId in communities) {
      if (communities[communityId].includes(nodeId)) return communityId;
    }
  };

  useEffect(() => {
    loadGraph(graph);
  }, [loadGraph, graph]);

  // useEffect(() => {
  //   if (graph && isLayoutRunning) {
  //     stop();
  //     setIsLayoutRunning(false);
  //   }
  //   start();
  //   setIsLayoutRunning(true);
  // }, [graph, isLayoutRunning, stop]);

  // useEffect(() => {
  //   setIsLayoutRunning(true);
  //   start();
  //   return () => {
  //     setIsLayoutRunning(false);
  //     stop();
  //   };
  // }, [start, stop]);

  useEffect(() => {
    const colors = {};
    let i = 0;
    for (const communityId in network.communities) {
      colors[communityId] = genColor(i);
      i++;
    }
    const nodes = network.nodes.map((node) => {
      return { id: node, label: node };
    });
    const edges = network.edges.map((edge) => {
      return { from: edge.source, to: edge.destination, label: edge.edgeType };
    });

    const edgeMap = {};
    edges.forEach((edge) => {
      if (edgeMap[edge.from + edge.to]) {
        edgeMap[edge.from + edge.to].weight += 1;
      } else {
        edgeMap[edge.from + edge.to] = {
          from: edge.from,
          to: edge.to,
          weight: 1,
          label: edge.label,
        };
      }
    });
    const graph = new Graph();
    nodes.forEach((node) => {
      const nodeCommunity = getNodeCommunity(node.id, network.communities);
      graph.addNode(node.id, {
        x: Math.random(),
        y: Math.random(),
        size: 3,
        label: node.label,
        color: nodeCommunity ? colors[nodeCommunity] : "#70d8bd",
      });
    });
    Object.values(edgeMap).forEach((edge) => {
      graph.addEdgeWithKey(edge.from + edge.to, edge.from, edge.to, {
        weight: edge.weight,
        label: edge.label,
      });
    });
    setGraph(graph);
  }, [network]);

  return null;
};

export const DisplayGraph = ({ width, height, network }) => {
  // const [isLayoutRunning, setIsLayoutRunning] = useState(false);
  return (
    <div className="display-graph">
      <SigmaContainer
        className="graph-container"
        style={{
          width,
          height,
          backgroundColor: "#DEE4E7",
        }}
      >
        <LoadGraph network={network} />
        <ControlsContainer position={"bottom-left"}>
          <LayoutForceAtlas2Control
            // run based on number of nodes
            autoRunFor={
              network && network.nodes.length > 1000
                ? network.nodes.length
                : 1000
            }
            settings={{
              slowDown: 10,
              barnesHutOptimize: true,
              barnesHutTheta: 0.5,
              gravity: 1,
              iterationsPerRender: 1,
              linLogMode: true,
              outboundAttractionDistribution: true,
              strongGravityMode: true,
              scalingRatio: 1,
              adjustSizes: true,
              edgeWeightInfluence: 0,
              scalingMode: "outside",
              worker: true,
            }}
          />
          <ZoomControl />
          <FullScreenControl />
        </ControlsContainer>
        <ControlsContainer position={"top-right"}>
          <SearchControl />
        </ControlsContainer>
      </SigmaContainer>
    </div>
  );
};
