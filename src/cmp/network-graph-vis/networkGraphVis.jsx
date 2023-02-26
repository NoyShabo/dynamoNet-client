import React from "react";
import Graph from "react-graph-vis";

export function GraphComponent() {
  const nodes = [];
  const edges = [];
  const NUM_NODES = 100;
  const NUM_EDGES = 500;
  for (let i = 0; i < NUM_NODES; i++) {
    nodes.push({ id: i, label: "Node " + i });
  }
  for (let i = 0; i < NUM_EDGES; i++) {
    edges.push({
      from: Math.round(Math.random() * NUM_NODES),
      to: Math.round(Math.random() * NUM_NODES),
    });
  }

  //   const nodeSet = {};
  //   network.edges.forEach((edge) => {
  //     nodeSet[edge.source] = { id: edge.source, label: edge.source };
  //     nodeSet[edge.destination] = {
  //       id: edge.destination,
  //       label: edge.destination,
  //     };
  //   });
  //   network.edges.forEach((edge) => {
  //     edges.push({ from: edge.source, to: edge.destination });
  //   });
  //   nodes = Object.values(nodeSet);

  const graph = {
    nodes,
    edges,
  };

  const options = {
    nodes: {
      shape: "ellipse", // 'ellipse', 'circle', 'database', 'box', 'text', 'image', 'circularImage', 'diamond', 'dot', 'star', 'triangle', 'triangleDown', 'square', 'icon'
      scaling: {
        min: 10,
        max: 30,
        label: {
          enabled: true,
          min: 8,
          max: 30,
          maxVisible: 30,
          drawThreshold: 5,
        },
      },
      font: {
        size: 12,
        face: "Tahoma",
      },
      // color: {
      //   border: "#2B7CE9",
      //   background: "#97C2FC",
      //   highlight: {
      //     border: "#2B7CE9",
      //     background: "#D2E5FF",
      //   },
      //   hover: {
      //     border: "#2B7CE9",
      //     background: "#D2E5FF",
      //   },
      // },
    },
    edges: {
      smooth: {
        type: "continuous",
        forceDirection: "none",
        roundness: 0.4,
      },
      color: { inherit: "from" },
      width: 0.15,
      //   length: 500,
    },
    physics: {
      enabled: true,
      barnesHut: {
        gravitationalConstant: -80000,
        centralGravity: 0.3,
        springLength: 95,
        springConstant: 0.04,
        damping: 0.09,
        avoidOverlap: 0,
      },
      forceAtlas2Based: {
        gravitationalConstant: -50,
        centralGravity: 0.01,
        springConstant: 0.08,
        springLength: 100,
        damping: 0.4,
        avoidOverlap: 0,
      },
      repulsion: {
        centralGravity: 0.2,
        springLength: 200,
        springConstant: 0.05,
        nodeDistance: 100,
        damping: 0.09,
      },
      hierarchicalRepulsion: {
        centralGravity: 0.0,
        springLength: 100,
        springConstant: 0.01,
        nodeDistance: 120,
        damping: 0.09,
      },
      maxVelocity: 50,
      minVelocity: 0.1,
      solver: "forceAtlas2Based", // barnesHut, repulsion, hierarchicalRepulsion, forceAtlas2Based
      stabilization: {
        enabled: true,
        iterations: 1000,
        updateInterval: 100,
        onlyDynamicEdges: false,
        fit: true,
      },
      timestep: 0.5,
      adaptiveTimestep: true,
    },
    // disable improved layout for better performance
    layout: {
      improvedLayout: false,
    },
    // improve performance by repulsing all nodes
    interaction: {
      dragNodes: false,
      //   dragView: false,
      //   hideEdgesOnDrag: true,
      //   hideNodesOnDrag: true,
      hover: true,
      hoverConnectedEdges: true,
      keyboard: {
        enabled: false,
        speed: { x: 10, y: 10, zoom: 0.02 },
        bindToWindow: true,
      },
      multiselect: true,
      navigationButtons: true,
      selectable: true,
      selectConnectedEdges: true,
      tooltipDelay: 300,
      //   zoomView: false,
    },
    // use 'dynamic' for better performance
    configure: {
      enabled: false,
      filter: "physics", // 'layout', 'physics', 'interaction', 'configure'
      showButton: true,
    },
    height: "800px",
  };

  const events = {
    select: function (event) {
      const { nodes, edges } = event;
    },
  };
  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={(network) => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      }}
    />
  );
}
