import { FavoriteNodes } from "../../cmp/favoriteNodes/favoriteNodes";
import { NodeGraphs } from "../../cmp/node-graphs/nodeGraphs";
import "./nodesMetrics.scss";
// import project from "../../data/project.json";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function NodesPage() {
  const myProject = useSelector((state) => state.projectModule.project);
  const [project, setProject] = useState();
  const dispatch = useDispatch();
  const [selectedNode, setSelectedNode] = useState();

  useEffect(() => {
    console.log("project: ", myProject);
    if (myProject && myProject.favoriteNodes) {
      setProject(myProject);
      setSelectedNode(myProject.favoriteNodes[0]);
    }
  }, []);

  return (
    <div className="nodesPage">
      {project && (
        <div className="nodesPage-container">
          <FavoriteNodes setSelectedNode={setSelectedNode}></FavoriteNodes>
          <NodeGraphs
            timeRanges={project.timeRanges}
            nodeName={selectedNode}
          ></NodeGraphs>
        </div>
      )}
    </div>
  );
}
