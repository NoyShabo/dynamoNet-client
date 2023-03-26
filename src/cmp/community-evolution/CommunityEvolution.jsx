import { useState, useEffect } from "react";
import { AlluvialChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import seedrandom from 'seedrandom';
import './communityEvolution.scss'

function genColor(seed) {
    const random = seedrandom(seed);
    let color = Math.floor(random() * 16777215);
    color = color.toString(16);
    while (color.length < 6) {
      color = "0" + color;
    }
  
    return "#" + color;
}

function commonBetweenCommunities(community1, community2) {
    const set1 = new Set(community1);
    const set2 = new Set(community2);
    const commonStrings = new Set([...set1].filter(x => set2.has(x)));
    return commonStrings.size;
}

function getData(communities, threshold = 0.3) {
    const communityGroups = [];
    const initializedGroups = {};
    const communityLinks = [];
    const timeRangesLength = communities.length;
    const colorScale = {};
    for (let i = 0; i < timeRangesLength-1; i++) {
        const timeRange1 = communities[i];
        const timeRange2 = communities[i+1];
        const timeRange1Communities = timeRange1.communities;
        const timeRange2Communities = timeRange2.communities;
        Object.keys(timeRange1Communities).forEach((communityIndex1) => {
            const community1 = timeRange1Communities[communityIndex1];
            Object.keys(timeRange2Communities).forEach((communityIndex2) => {
                const community2 = timeRange2Communities[communityIndex2];
                const commonStrings = commonBetweenCommunities(community1, community2);
                if (commonStrings > 0 && commonStrings >= threshold * community1.length) {
                    communityLinks.push({
                        "source": `${timeRange1.title}-${communityIndex1}`,
                        "target": `${timeRange2.title}-${communityIndex2}`,
                        "value": commonStrings,
                    });
                    if (!initializedGroups[`${timeRange1.title}-${communityIndex1}`]) {
                        communityGroups.push({
                            "name":`${timeRange1.title}-${communityIndex1}`,
                            "category":`${timeRange1.title}`,
                        });
                        colorScale[`${timeRange1.title}-${communityIndex1}`] = genColor(`${timeRange1.title}-${communityIndex1}`);
                        initializedGroups[`${timeRange1.title}-${communityIndex1}`] = true;
                    }
                    if (!initializedGroups[`${timeRange2.title}-${communityIndex2}`]) {
                        communityGroups.push({
                            "name":`${timeRange2.title}-${communityIndex2}`,
                            "category":`${timeRange2.title}`,
                        });
                        colorScale[`${timeRange2.title}-${communityIndex2}`] = genColor(`${timeRange2.title}-${communityIndex2}`);
                        initializedGroups[`${timeRange2.title}-${communityIndex2}`] = true;
                    }
                }
            });
        });
    }

   
    const communityGroups2=communityGroups.sort((a, b) => a.category.localeCompare(b.category));
    console.log("c3", communityGroups2);

    console.log("communityGroups2", communityGroups2);
    return {
        communityGroups2,
        communityLinks,
        colorScale,
    };
}

export function CommunityEvolution({ communities, threshold }){
    const [myState, setMyState] = useState(null);

    useEffect(() => {
        const {communityGroups2, communityLinks, colorScale} = getData(communities, threshold);
        setMyState({
            data: communityLinks,
                options: {
              "title": "Alluvial (gradient)",
              "alluvial": {
                    "nodes": communityGroups2,
                    "nodeAlignment": "left",
                    "nodePadding": 0
                  },
              height: "1000px",
              color: {
                scale: colorScale,
                gradient: {
                  enabled: true
                }
              }
            }
          });
    }, [communities, threshold]);


  if (communities.length > 0 && myState) {
  return  <AlluvialChart className="alluvial"
  data={myState.data}
  options={myState.options}
></AlluvialChart>
    } else {
        return <div>No data</div>
    }
}

// import React, { useState } from "react";
// import { Sankey } from "paths-js";
// var data = [
//   {
//     nodes: [
//       [
//         {
//           id: "Energy",
//         },
//         {
//           id: "Agriculture",
//         },
//         {
//           id: "Minerals",
//         },
//       ],
//       [
//         {
//           id: "Transportation",
//         },
//         {
//           id: "Harvest",
//         },
//         {
//           id: "Fuel",
//         },
//       ],
//       [
//         {
//           id: "Road",
//         },
//         {
//           id: "Chemicals",
//         },
//       ],
//     ],
//     links: [
//       {
//         start: "Energy",
//         end: "Transportation",
//         weight: 0,
//       },
//       {
//         start: "Energy",
//         end: "Harvest",
//         weight: 10,
//       },
//       {
//         start: "Energy",
//         end: "Fuel",
//         weight: 30,
//       },
//       {
//         start: "Agriculture",
//         end: "Road",
//         weight: 10,
//       },
//       {
//         start: "Agriculture",
//         end: "Transportation",
//         weight: 10,
//       },
//       {
//         start: "Agriculture",
//         end: "Harvest",
//         weight: 10,
//       },
//       {
//         start: "Minerals",
//         end: "Fuel",
//         weight: 30,
//       },
//       {
//         start: "Transportation",
//         end: "Chemicals",
//         weight: 20,
//       },
//       {
//         start: "Harvest",
//         end: "Chemicals",
//         weight: 10,
//       },
//       {
//         start: "Fuel",
//         end: "Road",
//         weight: 30,
//       },
//       {
//         start: "Minerals",
//         end: "Chemicals",
//         weight: 25,
//       },
//     ],
//   },
//   {
//     nodes: [
//       [
//         {
//           id: "Energy",
//         },
//         {
//           id: "Agriculture",
//         },
//         {
//           id: "Minerals",
//         },
//       ],
//       [
//         {
//           id: "Transportation",
//         },
//         {
//           id: "Harvest",
//         },
//         {
//           id: "Fuel",
//         },
//       ],
//       [
//         {
//           id: "Road",
//         },
//         {
//           id: "Chemicals",
//         },
//       ],
//     ],
//     links: [
//       {
//         start: "Energy",
//         end: "Transportation",
//         weight: 0,
//       },
//       {
//         start: "Energy",
//         end: "Harvest",
//         weight: 30,
//       },
//       {
//         start: "Energy",
//         end: "Fuel",
//         weight: 10,
//       },
//       {
//         start: "Agriculture",
//         end: "Road",
//         weight: 60,
//       },
//       {
//         start: "Agriculture",
//         end: "Transportation",
//         weight: 5,
//       },
//       {
//         start: "Agriculture",
//         end: "Harvest",
//         weight: 70,
//       },
//       {
//         start: "Minerals",
//         end: "Fuel",
//         weight: 15,
//       },
//       {
//         start: "Transportation",
//         end: "Chemicals",
//         weight: 10,
//       },
//       {
//         start: "Harvest",
//         end: "Chemicals",
//         weight: 40,
//       },
//       {
//         start: "Fuel",
//         end: "Road",
//         weight: 12,
//       },
//       {
//         start: "Minerals",
//         end: "Chemicals",
//         weight: 0,
//       },
//     ],
//   },
//   {
//     nodes: [
//       [
//         {
//           id: "Energy",
//         },
//         {
//           id: "Agriculture",
//         },
//         {
//           id: "Minerals",
//         },
//       ],
//       [
//         {
//           id: "Transportation",
//         },
//         {
//           id: "Harvest",
//         },
//         {
//           id: "Fuel",
//         },
//       ],
//       [
//         {
//           id: "Road",
//         },
//         {
//           id: "Chemicals",
//         },
//       ],
//     ],
//     links: [
//       {
//         start: "Energy",
//         end: "Transportation",
//         weight: 10,
//       },
//       {
//         start: "Energy",
//         end: "Harvest",
//         weight: 10,
//       },
//       {
//         start: "Energy",
//         end: "Fuel",
//         weight: 20,
//       },
//       {
//         start: "Agriculture",
//         end: "Road",
//         weight: 30,
//       },
//       {
//         start: "Agriculture",
//         end: "Transportation",
//         weight: 0,
//       },
//       {
//         start: "Agriculture",
//         end: "Harvest",
//         weight: 10,
//       },
//       {
//         start: "Minerals",
//         end: "Fuel",
//         weight: 45,
//       },
//       {
//         start: "Transportation",
//         end: "Chemicals",
//         weight: 40,
//       },
//       {
//         start: "Harvest",
//         end: "Chemicals",
//         weight: 50,
//       },
//       {
//         start: "Fuel",
//         end: "Road",
//         weight: 10,
//       },
//       {
//         start: "Minerals",
//         end: "Chemicals",
//         weight: 10,
//       },
//     ],
//   },
// ];

// var palette = ["#707b82", "#7881c2", "#3e90f0"];

// function opacity(i, j) {
//   if (j == null) return 0.7;
//   if (j === i) return 1;
//   return 0.3;
// }

// function opacityRect(item, start, end) {
//   if (start == null) return 0.7;
//   if (item.id === start || item.id === end) return 1;
//   return 0.3;
// }

// export function SankeyChart({communities})   {
//   const [state, setState] = useState({ index: null, start: null, end: null });

//   function enter(r) {
//     setState({ index: r.index, start: r.item.start, end: r.item.end });
//   }

//   function exit() {
//     setState({ index: null, start: null, end: null });
//   }

//   const sankey = Sankey({
//     data: data[0],
//     width: 500,
//     height: 400,
//     gutter: 15,
//     rectWidth: 10,
//     nodeaccessor: function (x) {
//       return x.id;
//     },
//   });

//   const curvedRectangles = sankey.curvedRectangles.map((r, i) => {
//     return (
//       <g key={i}>
//         <path
//           d={r.curve.path.print()}
//           fill="#acd1e9"
//           style={{ opacity: opacity(i, state.index) }}
//           onMouseEnter={() => enter(r)}
//           onMouseLeave={exit}
//         />
//       </g>
//     );
//   });

//   const rectangles = sankey.rectangles.map((r, i) => {
//     const op = opacityRect(r.item, state.start, state.end);
//     const x = r.curve.centroid[0];
//     const y = r.curve.centroid[1];
//     const transform =
//       r.group < data[0].nodes.length / 2
//         ? `translate(${x + 7},${y})`
//         : `translate(${x - 7},${y})`;

//     return (
//       <g key={i}>
//         <path d={r.curve.path.print()} fill={palette[r.group]} />
//         <text
//           transform={transform}
//           style={{ opacity: op }}
//           textAnchor={r.group < data[0].nodes.length / 2 ? "start" : "end"}
//         >
//           {r.item.id}
//         </text>
//       </g>
//     );
//   });

//   return (
//     <div>
//       <svg width={500} height={400}>
//         {curvedRectangles}
//         {rectangles}
//       </svg>
//     </div>
//   );
// }
