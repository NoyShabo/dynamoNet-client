import CloseIcon from "@mui/icons-material/Close";
import {
  ControlsContainer,
  FullScreenControl,
  SearchControl,
  SigmaContainer,
  useRegisterEvents,
  ZoomControl,
} from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { LayoutForceAtlas2Control } from "@react-sigma/layout-forceatlas2";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import seedrandom from "seedrandom";
import { getNode } from "../../serverApi/rest/nodeApi";
import { default as ContactInfo } from "../sourceList/list";
import { LoadGraph } from "./load-graph/LoadGraph";
import "./networkGraph.scss";

export const DisplayGraph = ({ width, height, network, title }) => {
  const [selectedNode, setSelectedNode] = useState();
  const [selectedEdge, setSelectedEdge] = useState();
  const [graph, setGraph] = useState();
  const GraphEvents = () => {
    const registerEvents = useRegisterEvents();

    useEffect(() => {
      registerEvents({
        // node events
        clickNode: (event) => {
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
        // edge events
        clickEdge: (event) => {
          const edge = graph.getEdgeAttributes(event.edge);
          console.log(edge);
          setSelectedEdge(edge);
        },
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
                    <h4>Weight</h4>
                    <p>{selectedEdge.edgeType.length}</p>
                  </div>
                  <div className="edge-popup__content__item">
                    <h4> Type</h4>
                    <p>{selectedEdge.edgeType.join(", ")}</p>
                  </div>

                  <div className="edge-popup__content__item">
                    <h4> Content</h4>
                    {selectedEdge.edgeContent.map((content, index) => (
                      <>
                        <p key={`p_${index}`}>"{content}"</p>
                        <br key={`br_${index}`} />
                      </>
                    ))}
                  </div>
                  <div className="edge-popup__content__item">
                    <h4> Timestamp</h4>
                    <p>{selectedEdge.timestamp.join(", ")}</p>
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
