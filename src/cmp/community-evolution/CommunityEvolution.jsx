import { AlluvialChart } from "@carbon/charts-react";
import "@carbon/styles/index.scss";
import { useEffect, useRef, useState } from "react";
import seedrandom from "seedrandom";
import "./communityEvolution.scss";

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
  const commonStrings = new Set([...set1].filter((x) => set2.has(x)));
  return commonStrings.size;
}

function getData(communities, threshold = 0.3) {
  const communityGroups = [];
  const initializedGroups = {};
  const communityLinks = [];
  const timeRangesLength = communities.length;
  const colorScale = {};
  for (let i = 0; i < timeRangesLength - 1; i++) {
    const timeRange1 = communities[i];
    const timeRange2 = communities[i + 1];
    const timeRange1Communities = timeRange1.communities;
    const timeRange2Communities = timeRange2.communities;
    Object.keys(timeRange1Communities).forEach((communityIndex1) => {
      const community1 = timeRange1Communities[communityIndex1];
      Object.keys(timeRange2Communities).forEach((communityIndex2) => {
        const community2 = timeRange2Communities[communityIndex2];
        const commonStrings = commonBetweenCommunities(community1, community2);
        if (
          commonStrings === 0 ||
          commonStrings >= threshold * community1.length
        ) {
          communityLinks.push({
            source: `${timeRange1.title}-${communityIndex1}`,
            target: `${timeRange2.title}-${communityIndex2}`,
            value: commonStrings > 0 ? commonStrings : 0,
          });
          if (!initializedGroups[`${timeRange1.title}-${communityIndex1}`]) {
            communityGroups.push({
              name: `${timeRange1.title}-${communityIndex1}`,
              category: `${timeRange1.title}`,
            });
            colorScale[`${timeRange1.title}-${communityIndex1}`] = genColor(
              `${timeRange1.title}-${communityIndex1}`
            );
            initializedGroups[`${timeRange1.title}-${communityIndex1}`] = true;
          }
          if (!initializedGroups[`${timeRange2.title}-${communityIndex2}`]) {
            communityGroups.push({
              name: `${timeRange2.title}-${communityIndex2}`,
              category: `${timeRange2.title}`,
            });
            colorScale[`${timeRange2.title}-${communityIndex2}`] = genColor(
              `${timeRange2.title}-${communityIndex2}`
            );
            initializedGroups[`${timeRange2.title}-${communityIndex2}`] = true;
          }
        }
      });
    });
  }

  const communityGroups2 = communityGroups.sort((a, b) =>
    a.category.localeCompare(b.category)
  );
  // console.log("c3", communityGroups2);

  // console.log("communityGroups2", communityGroups2);
  return {
    communityGroups2,
    communityLinks,
    colorScale,
  };
}

export function CommunityEvolution({ communities, threshold, active }) {
  const [myState, setMyState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const alluvialRef = useRef(null);

  useEffect(() => {
    const { communityGroups2, communityLinks, colorScale } = getData(
      communities,
      threshold
    );
    setMyState({
      data: communityLinks,
      options: {
        alluvial: {
          nodes: communityGroups2,
          nodeAlignment: "left",
          nodePadding: 0,
        },
        height: "1000px",
        color: {
          scale: colorScale,
          gradient: {
            enabled: true,
          },
        },
      },
    });
  }, [communities, threshold]);

  function clearStrokeWidth() {
    try {
      if (alluvialRef && alluvialRef.current && alluvialRef.current.chartRef) {
        const ref = alluvialRef.current.chartRef;
        const paths = ref.querySelectorAll(".link");
        console.log("paths", paths);
        if (paths && paths.length > 0) {
          paths.forEach((path) => {
            if (path.getAttribute("stroke-width") == 1) {
              path.setAttribute("stroke-width", 0);
            }
          });
          return true;
        }
      }
    } catch (e) {}
    return false;
  }

  useEffect(() => {
    if (active) {
      clearStrokeWidth();
    }
  }, [active, alluvialRef, myState]);

  if (communities.length > 0 && myState) {
    return (
      <div className="community-evolution">
        <AlluvialChart
          className="alluvial"
          data={myState.data}
          options={myState.options}
          ref={alluvialRef}
        ></AlluvialChart>
      </div>
    );
  } else {
    return <div>No data</div>;
  }
}
