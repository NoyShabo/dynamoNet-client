import CloseIcon from "@mui/icons-material/Close";
import {
  ControlsContainer,
  FullScreenControl,
  SearchControl,
  SigmaContainer,
  useLoadGraph,
  useRegisterEvents,
  ZoomControl,
} from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { LayoutForceAtlas2Control } from "@react-sigma/layout-forceatlas2";
import Graph from "graphology";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import seedrandom from "seedrandom";
import { getNode } from "../../serverApi/rest/nodeApi";
import { default as ContactInfo } from "../sourceList/list";
import "./networkGraph.scss";

function genColor(seed) {
  const random = seedrandom(seed);
  let color = Math.floor(random() * 16777215);
  color = color.toString(16);
  while (color.length < 6) {
    color = "0" + color;
  }

  return "#" + color;
}

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
      };
    });

    const edgeMap = {};
    edges.forEach((edge) => {
      if (edgeMap[edge.from + edge.to]) {
        edgeMap[edge.from + edge.to].weight += 1;
        edgeMap[edge.from + edge.to].edgeType.push(edge.edgeType);
        edgeMap[edge.from + edge.to].edgeContent.push(edge.edgeContent);
      } else if (edgeMap[edge.to + edge.from]) {
        edgeMap[edge.to + edge.from].weight += 1;
        edgeMap[edge.to + edge.from].edgeType.push(edge.edgeType);
        edgeMap[edge.to + edge.from].edgeContent.push(edge.edgeContent);
      } else {
        edgeMap[edge.from + edge.to] = {
          from: edge.from,
          to: edge.to,
          weight: 1,
          edgeType: [edge.edgeType],
          edgeContent: [edge.edgeContent],
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
        // can ignore this error most likely
      }
    });
    Object.values(edgeMap).forEach((edge) => {
      try {
        graph.addEdgeWithKey(edge.from + edge.to, edge.from, edge.to, {
          weight: edge.weight,
          edgeType: edge.edgeType,
          edgeContent: edge.edgeContent,
          type: "arrow",
        });
      } catch (err) {
        // can ignore this error most likely
      }
    });
    setGraph(graph);
    exportGraph(graph);
  }, [network]);

  return null;
};

export const DisplayGraph = ({ width, height, network, title }) => {
  const [selectedNode, setSelectedNode] = useState();
  const [selectedEdge, setSelectedEdge] = useState();
  const [graph, setGraph] = useState();
  // console.log(selectedEdge)
  const GraphEvents = () => {
    const registerEvents = useRegisterEvents();

    useEffect(() => {
      registerEvents({
        // node events
        clickNode: (event) => {
          // console.log("clickNode", event.node, event.preventSigmaDefault);
          getNode(event.node)
            .then((node) => {
              setSelectedNode(node.node);
            })
            .catch((err) => {
              toast.error(err.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
            });
        },
        // enterNode: (event) => console.log("enterNode", event.node),
        // leaveNode: (event) => console.log("leaveNode", event.node),
        // edge events
        clickEdge: (event) => {
          const edge = graph.getEdgeAttributes(event.edge);
          setSelectedEdge(edge);
        },
        // enterEdge: (event) => {
        //   console.log("enterEdge", event.edge);
        // },
        // leaveEdge: (event) => console.log("leaveEdge", event.edge),
      });
    }, [registerEvents]);

    return null;
  };

  return (
    <>
      <div className="display-graph">
        {selectedNode && (
          <div className="popup">
            <div className="popup_inner">
              <ContactInfo
                person={selectedNode}
                closePopup={() => setSelectedNode(null)}
              />
              <button onClick={() => setSelectedNode(null)}>
                <CloseIcon />
              </button>
            </div>
          </div>
        )}
        {selectedEdge && (
          <div className="popup">
            <div className="popup_inner">
              <div className="edge-popup">
                <div className="edge-popup__title">
                  <h3 className="title-edge-popup">Edge Information</h3>
                  <button onClick={() => setSelectedEdge(null)}>
                    <CloseIcon />
                  </button>
                </div>
                <div className="edge-popup__content">
                  <div className="edge-popup__content__item">
                    <h4> Type</h4>
                    <p>{selectedEdge.edgeType.join(", ")}</p>
                  </div>

                  <div className="edge-popup__content__item">
                    <h4> Content</h4>
                    <p>{selectedEdge.edgeContent.join(", ")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <SigmaContainer
          className="graph-container"
          style={{
            width,
            height,
            backgroundColor: "#DEE4E7",
          }}
        >
          <LoadGraph network={network} exportGraph={setGraph} title={title} />
          <GraphEvents />
          <ControlsContainer
            position={"bottom-left"}
            className="control-graph-nav"
          >
            <LayoutForceAtlas2Control
              autoRunFor={
                network &&
                (!network.nodePositions ||
                  Object.keys(network.nodePositions).length === 0)
                  ? 1000
                  : 1
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
          <ControlsContainer position={"top-right"} className="search">
            <SearchControl />
          </ControlsContainer>
        </SigmaContainer>
      </div>
      <ToastContainer />
    </>
  );
};
