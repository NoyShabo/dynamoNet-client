import { useLoadGraph } from "@react-sigma/core";
import Graph from "graphology";
import { useEffect, useState } from "react";
import { genColor } from "../../../utils";

export const LoadGraph = ({ network, exportGraph, title }) => {
  const [graph, setGraph] = useState();
  const loadGraph = useLoadGraph();

  const getNodeCommunity = (nodeId, communities) => {
    for (const communityId in communities) {
      if (communities[communityId].includes(nodeId)) return communityId;
    }
  };

  useEffect(() => {
    loadGraph(graph);
  }, [loadGraph, graph]);

  useEffect(() => {
    const colors = {};
    for (const communityId in network.communities) {
      colors[communityId] = genColor(`${title}-${communityId}`);
    }
    const nodes = network.nodes.map((node) => {
      return { id: node, label: node };
    });
    const edges = network.edges.map((edge) => {
      return {
        from: edge.source,
        to: edge.destination,
        _id: edge._id,
        edgeType: edge.edgeType,
        edgeContent: edge.edgeContent,
        timestamp: edge.timestamp,
      };
    });

    const edgeMap = {};
    edges.forEach((edge) => {
      if (edgeMap[edge.from + edge.to]) {
        edgeMap[edge.from + edge.to].weight += 1;
        edgeMap[edge.from + edge.to].edgeType.push(edge.edgeType);
        edgeMap[edge.from + edge.to].edgeContent.push(edge.edgeContent);
        edgeMap[edge.from + edge.to].timestamp.push(edge.timestamp);
      } else if (edgeMap[edge.to + edge.from]) {
        edgeMap[edge.to + edge.from].weight += 1;
        edgeMap[edge.to + edge.from].edgeType.push(edge.edgeType);
        edgeMap[edge.to + edge.from].edgeContent.push(edge.edgeContent);
        edgeMap[edge.to + edge.from].timestamp.push(edge.timestamp);
      } else {
        edgeMap[edge.from + edge.to] = {
          from: edge.from,
          to: edge.to,
          weight: 1,
          edgeType: [edge.edgeType],
          edgeContent: [edge.edgeContent],
          timestamp: [edge.timestamp],
        };
      }
    });

    const graph = new Graph();
    nodes.forEach((node) => {
      try {
        const nodeCommunity = getNodeCommunity(node.id, network.communities);
        graph.addNode(node.id, {
          x:
            network.nodePositions && network.nodePositions[node.id]
              ? network.nodePositions[node.id][0]
              : Math.random(),
          y:
            network.nodePositions && network.nodePositions[node.id]
              ? network.nodePositions[node.id][1]
              : Math.random(),
          size: 3,
          label: node.label,
          color: nodeCommunity ? colors[nodeCommunity] : "#70d8bd",
        });
      } catch (err) {
        // can ignore this error
      }
    });
    Object.values(edgeMap).forEach((edge) => {
      try {
        graph.addEdgeWithKey(edge.from + edge.to, edge.from, edge.to, {
          weight: edge.weight,
          edgeType: edge.edgeType,
          edgeContent: edge.edgeContent,
          timestamp: edge.timestamp,
          type: "arrow",
        });
      } catch (err) {
        // can ignore this error
      }
    });
    setGraph(graph);
    exportGraph(graph);
  }, [network]);

  return null;
};
