import React, { useState } from "react";
import { FavoriteNodes } from "../../cmp/favoriteNodes/favoriteNodes";
import { NodeGraphs } from "../../cmp/node-graphs/nodeGraphs";
import "./nodesMetrics.scss";

export function NodesPage({ project }) {
  const [selectedNode, setSelectedNode] = useState();
  const [selectedNodes, setSelectedNodes] = useState([]);

  return (
    <>
      <div className="title-project">Node Evolution</div>
      <div className="nodesPage">
        {project && (
          <div className="nodesPage-container">
            <FavoriteNodes
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
              setSelectedNodes={setSelectedNodes}
              favoriteNodes={project.favoriteNodes}
            ></FavoriteNodes>
            {!project.favoriteNodes || project.favoriteNodes.length === 0 ? (
              <div className="title-project"></div>
            ) : (
              selectedNodes.length > 0 && (
                <NodeGraphs
                  timeRanges={project.timeRanges}
                  nodeName={selectedNode}
                  nodes={selectedNodes}
                ></NodeGraphs>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}
