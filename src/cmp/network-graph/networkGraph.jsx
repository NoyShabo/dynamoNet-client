import './networkGraph.scss'
import {
    Sigma,
    RandomizeNodePositions,
    RelativeSize
} from 'react-sigma';
import React, { useEffect, useState } from "react";
import { SigmaContainer, useSigma, useLoadGraph } from "@react-sigma/core";


const numberOfNodes = 4000;
const nodes = [];
for (let i = 0; i < numberOfNodes; i++) {
    nodes.push({
        id: i,
        label: i
    });
}
let edges = [];
for (let i = 0; i < numberOfNodes; i++) {
    edges.push({
        id: i,
        source: i,
        target: (i+11)%numberOfNodes,
        label: 'retweet'
    })
}
let myGraph = {
    nodes: nodes,
    edges: edges
};

export function MyGraph() {
    return ( 
        <div className = 'graph-network' >
        
        <SigmaContainer >

        <Sigma graph = {
            myGraph
        }
        settings = {
            {
                drawEdges: true,
                clone: false,
                nodeSize: 2,
                edgeLength: 80
            }
        } 
        style={{width:"800px", height:"800px"}}
        >
        
        <RelativeSize initialSize = {
            15
        }
        /> 
        <RandomizeNodePositions/>
        
        </Sigma>
        </SigmaContainer>
 
        </div>)
    }

// import React, { useEffect } from "react";
// import './networkGraph.scss'

// import "@react-sigma/core/lib/react-sigma.min.css";
// import { MultiDirectedGraph } from "graphology";
// import { SigmaContainer, useLoadGraph } from "@react-sigma/core";

// export function MultiGraph(){
//   const MyGraph = () => {
//     const loadGraph = useLoadGraph();

//     useEffect(() => {
//       // Create the graph
//       const graph = new MultiDirectedGraph();
//       const numberOfNodes = 4000;
//         const nodes = [];
//         for (let i = 0; i < numberOfNodes; i++) {
//         nodes.push({
//         id: i,
//         label: i
//         });
//     }
//      graph.nodes = nodes;
//       graph.addNode("B", { x: 1, y: 0, label: "Node B", size: 10 });
//       graph.addNode("A", { x: 0, y: 0, label: "Node B", size: 10 });
//       graph.addEdgeWithKey("rel1", "A", "B", { label: "REL_1" });
//       graph.addEdgeWithKey("rel2", "A", "B", { label: "REL_2" });
//       loadGraph(graph);
//     }, [loadGraph]);

//     return null;
//   };

//   return (
//     <div className="graph-network">
//     <SigmaContainer
//       graph={MultiDirectedGraph}
//       style={{ height: "700px", margin:"0 auto", display:"flex", justifyContent:'center' }}
//       settings={{ renderEdgeLabels: true, defaultEdgeType: "arrow" }}
//     >
//       <MyGraph />
//     </SigmaContainer>
//     </div>

//   );
// };


