import { SigmaContainer, useLoadGraph, useSigma } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useWorkerLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import Graph from "graphology";
import { useEffect } from "react";
import network from "../../data/network.json";

export const LoadGraph = () => {
  const loadGraph = useLoadGraph();
  // const { position, assign } = useLayoutCircular();
  const { start, kill, isRunning } = useWorkerLayoutForceAtlas2({
    settings: { slowDown: 15 },
  });
  useEffect(() => {
    const nodes = [];
    const edges = [];

    const nodeSet = {};
    network.edges.forEach((edge) => {
      nodeSet[edge.source] = { id: edge.source, label: edge.source };
      nodeSet[edge.destination] = {
        id: edge.destination,
        label: edge.destination,
      };
    });
    network.edges.forEach((edge) => {
      edges.push({ from: edge.source, to: edge.destination });
    });
    nodes.push(...Object.values(nodeSet));

    const graph = new Graph();
    nodes.forEach((node) => {
      graph.addNode(node.id, {
        x: Math.random(),
        y: Math.random(),
        size: 3,
        label: node.label,
        color: "#FA4F40",
      });
    });
    edges.forEach((edge) => {
      if (graph.hasEdge(edge.from, edge.to)) {
        const edgeData = graph.getEdgeAttributes(edge.from, edge.to);
        graph.updateEdgeAttribute(
          edge.from,
          edge.to,
          "weight",
          () => edgeData.weight + 1
        );
      } else {
        graph.addEdgeWithKey(edge.from + edge.to, edge.from, edge.to, {
          weight: 1,
        });
      }
    });

    loadGraph(graph);
    start();
    return () => {
      kill();
    };
  }, [loadGraph, start, kill]);

  return null;
};

export const DisplayGraph = () => {
  return (
    <SigmaContainer>
      <LoadGraph />
    </SigmaContainer>
  );
};
