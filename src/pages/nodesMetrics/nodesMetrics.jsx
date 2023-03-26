import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteNodes } from "../../cmp/favoriteNodes/favoriteNodes";
import { NodeGraphs } from "../../cmp/node-graphs/nodeGraphs";
import "./nodesMetrics.scss";

export function NodesPage({ project }) {
  // const myProject = useSelector((state) => state.projectModule.project);
  // const [project, setProject] = useState();
  // const dispatch = useDispatch();
  const [selectedNode, setSelectedNode] = useState();
  const [selectedNodes, setSelectedNodes] = useState([]);

  // useEffect(() => {
  //   console.log("project: ", myProject);
  //   if (myProject && myProject.favoriteNodes) {
  //     setProject(myProject);
  //     setSelectedNode(myProject.favoriteNodes[0]);
  //   }
  // }, []);

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
              <div className="title-project">
                No favorite nodes to display evolution
              </div>
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
