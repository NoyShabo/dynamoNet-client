import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useWorkerLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import Graph from "graphology";
import { useEffect } from "react";
import './networkGraph.scss'

export const LoadGraph = ({network}) => {
  const nodes = network.nodes.map((node) => {
    return { id: node, label: node }
  });
  const edges = network.edges.map((edge) => {
    return { from: edge.source, to: edge.destination }
  })
const loadGraph = useLoadGraph();
  const { start, kill } = useWorkerLayoutForceAtlas2({
    settings: { slowDown: 15 },
  });
  useEffect(() => {

    const graph = new Graph();
    nodes.forEach((node) => {
      graph.addNode(node.id, {
        x: Math.random(),
        y: Math.random(),
        size: 3,
        label: node.label,
        color: "#70d8bd",
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

export const DisplayGraph = ({width, height, network}) => {
  return (
    <div className="display-graph">
      <SigmaContainer className="graph-container" style={{width, height, backgroundColor:"#fff"} } >
          <LoadGraph network={network} />
      </SigmaContainer>
    </div>

  );
};
