import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useWorkerLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import Graph from "graphology";
import { useEffect } from "react";
// import Sigma from "sigma";
import "./networkGraph.scss";

export const LoadGraph = ({ network }) => {
  const nodes = network.nodes.map((node) => {
    return { id: node, label: node };
  });
  const edges = network.edges.map((edge) => {
    return { from: edge.source, to: edge.destination };
  });
  const loadGraph = useLoadGraph();
  const { start, kill } = useWorkerLayoutForceAtlas2({
    settings: { slowDown: 15 },
  });
  // const container = document.getElementById("sigma-container");

  useEffect(() => {
    const graph = new Graph();
    // const renderer = new Sigma(graph, container);
    // const state = {
    //   hoveredNode: undefined,
    //   searchQuery: "",
    //   selectedNode: undefined,
    //   suggestions: undefined,
    //   hoveredNeighbors: undefined,
    // };

    // function setHoveredNode(node) {
    //   if (node) {
    //     state.hoveredNode = node;
    //     state.hoveredNeighbors = new Set(graph.neighbors(node));
    //   } else {
    //     state.hoveredNode = undefined;
    //     state.hoveredNeighbors = undefined;
    //   }

    //   // Refresh rendering:
    //   renderer.refresh();
    // }

    // renderer.on("enterNoode", ({ node }) => {
    //   setHoveredNode(node);
    // });

    // renderer.on("leaveNode", () => {
    //   setHoveredNode(undefined);
    // });

    // // Render nodes accordingly to the internal state:
    // // 1. If a node is selected, it is highlighted
    // // 2. If there is query, all non-matching nodes are greyed
    // // 3. If there is a hovered node, all non-neighbor nodes are greyed
    // renderer.setSetting("nodeReducer", (node, data) => {
    //   const res = { ...data };

    //   if (
    //     state.hoveredNeighbors &&
    //     !state.hoveredNeighbors.has(node) &&
    //     state.hoveredNode !== node
    //   ) {
    //     res.label = "";
    //     res.color = "#f6f6f6";
    //   }

    //   if (state.selectedNode === node) {
    //     res.highlighted = true;
    //   } else if (state.suggestions && !state.suggestions.has(node)) {
    //     res.label = "";
    //     res.color = "#f6f6f6";
    //   }

    //   return res;
    // });

    // // Render edges accordingly to the internal state:
    // // 1. If a node is hovered, the edge is hidden if it is not connected to the
    // //    node
    // // 2. If there is a query, the edge is only visible if it connects two
    // //    suggestions
    // renderer.setSetting("edgeReducer", (edge, data) => {
    //   const res = { ...data };

    //   if (state.hoveredNode && !graph.hasExtremity(edge, state.hoveredNode)) {
    //     res.hidden = true;
    //   }

    //   if (
    //     state.suggestions &&
    //     (!state.suggestions.has(graph.source(edge)) ||
    //       !state.suggestions.has(graph.target(edge)))
    //   ) {
    //     res.hidden = true;
    //   }

    //   return res;
    // });

    nodes.forEach((node) => {
      graph.addNode(node.id, {
        x: Math.random(),
        y: Math.random(),
        size: 3,
        label: node.label,
        color: "#70d8bd",
        // onClick: () => {
        //   console.log("clicked on node", node.id);
        // },
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
  }, [loadGraph, start]);

  return null;
};

export const DisplayGraph = ({ width, height, network }) => {
  return (
    <div className="display-graph">
      <SigmaContainer
        className="graph-container"
        // id="sigma-container"
        style={{ width, height, backgroundColor: "#DEE4E7" }}
      >
        <LoadGraph network={network} />
      </SigmaContainer>
    </div>
  );
};
