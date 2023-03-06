import { Button } from "@mantine/core";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useWorkerLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
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

export const LoadGraph = ({ network, renderLayout }) => {
  const [graph, setGraph] = useState();
  const [isLayoutRunning, setIsLayoutRunning] = useState(false);

  const loadGraph = useLoadGraph();
  const { start, stop } = useWorkerLayoutForceAtlas2({
    settings: { slowDown: 10 },
  });

  const getNodeCommunity = (nodeId, communities) => {
    for (const communityId in communities) {
      if (communities[communityId].includes(nodeId)) return communityId;
    }
  };

  // useEffect(() => {
  //   if (renderLayout) {
  //     setIsLayoutRunning(true);
  //     start();
  //   } else {
  //     setIsLayoutRunning(false);
  //     stop();
  //   }
  // }, [renderLayout, start, stop]);
  useEffect(() => {
    loadGraph(graph);
  }, [loadGraph, graph]);

  useEffect(() => {
    if (graph && isLayoutRunning) {
      stop();
      setIsLayoutRunning(false);
    }
    start();
    setIsLayoutRunning(true);
  }, [graph, isLayoutRunning, stop]);

  useEffect(() => {
    setIsLayoutRunning(true);
    start();
    return () => {
      setIsLayoutRunning(false);
      stop();
    };
  }, [start, stop]);

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
      return { from: edge.source, to: edge.destination };
    });
    // setColors(colors);
    // setNodes(nodes);
    // setEdges(edges);

    const graph = new Graph();
    nodes.forEach((node) => {
      const nodeCommunity = getNodeCommunity(node.id, network.communities);
      graph.addNode(node.id, {
        x: Math.random(),
        y: Math.random(),
        size: 3,
        label: node.label,
        color: nodeCommunity ? colors[nodeCommunity] : "#70d8bd",
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
    setGraph(graph);
  }, [network]);

  return null;
};

export const DisplayGraph = ({ width, height, network }) => {
  const [isLayoutRunning, setIsLayoutRunning] = useState(false);
  return (
    <div className="display-graph">
      <SigmaContainer
        className="graph-container"
        style={{ width, height, backgroundColor: "#DEE4E7" }}


      >
        <LoadGraph network={network} renderLayout={isLayoutRunning} />
        <Button
          onClick={() => {
            setIsLayoutRunning(false);
          }}
        >
          Stop Layout
        </Button>
        <Button
          onClick={() => {
            setIsLayoutRunning(true);
          }}
        >
          Start Layout
        </Button>
      </SigmaContainer>
    </div>
  );
};
