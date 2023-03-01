import  {FavoriteNodes} from "../../cmp/favoriteNodes/favoriteNodes";
import  {NodeGraphs} from "../../cmp/node-graphs/nodeGraphs";
import "./nodesMetrics.scss";
import project from "../../data/project.json";
import React, { useState } from "react";

export function NodesPage() {
const [selectedNode,setSelectedNode]=useState();

    return (
        <div className="nodesPage">
            <div className='nodesPage-container'>
                <FavoriteNodes setSelectedNode={setSelectedNode}></FavoriteNodes>
                <NodeGraphs timeRanges={project.timeRanges} nodeName={selectedNode}></NodeGraphs>
            </div>
        </div>
    );
}
