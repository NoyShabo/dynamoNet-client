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

function calculateEvolutionValues(communities, threshold = 0.3) {
  const communityGroups = [];
  const communityLinks = [];
  const timeRangesLength = communities.length;
  const colorScale = {};
  // iterate through all time ranges
  for (let i = 0; i < timeRangesLength; i++) {
    const timeRange = communities[i];
    // iterate through all communities in time range
    Object.keys(timeRange.communities).forEach((communityIndex) => {
      // add community to communityGroups
      communityGroups.push({
        name: `${timeRange.title}-${communityIndex}`,
        category: `${timeRange.title}`,
      });
      colorScale[`${timeRange.title}-${communityIndex}`] = genColor(
        `${timeRange.title}-${communityIndex}`
      );
    });
  }

  // iterate through all time ranges
  for (let i = 0; i < timeRangesLength - 1; i++) {
    const timeRange1 = communities[i];
    const timeRange2 = communities[i + 1];
    const timeRange1Communities = timeRange1.communities;
    const timeRange2Communities = timeRange2.communities;
    // iterate through all communities in time range 1
    Object.keys(timeRange1Communities).forEach((communityIndex1) => {
      const community1 = timeRange1Communities[communityIndex1];
      // iterate through all communities in time range 2
      Object.keys(timeRange2Communities).forEach((communityIndex2) => {
        const community2 = timeRange2Communities[communityIndex2];
        // evaluate if there is a link between the two communities
        const commonStrings = commonBetweenCommunities(community1, community2);
        if (
          commonStrings === 0 ||
          commonStrings >= threshold * community1.length
        ) {
          communityLinks.push({
            source: `${timeRange1.title}-${communityIndex1}`,
            target: `${timeRange2.title}-${communityIndex2}`,
            value: commonStrings,
          });
        }
      });
    });
  }

  return {
    communityGroups,
    communityLinks,
    colorScale,
  };
}

export function CommunityEvolution({ communities, threshold, active }) {
  const [myState, setMyState] = useState(null);
  const alluvialRef = useRef(null);

  useEffect(() => {
    const { communityGroups, communityLinks, colorScale } =
      calculateEvolutionValues(communities, threshold);
    setMyState({
      data: communityLinks,
      options: {
        alluvial: {
          nodes: communityGroups,
          nodeAlignment: "left",
          nodePadding: 0,
        },
        height: "900px",
        color: {
          scale: colorScale,
          gradient: {
            enabled: false,
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
        if (paths && paths.length > 0) {
          paths.forEach((path) => {
            if (path.getAttribute("stroke-width") === "1") {
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
      const strokeInterval = setInterval(() => {
        if (clearStrokeWidth()) {
          clearInterval(strokeInterval);
        }
      }, 50);
    }
  }, [active, alluvialRef, myState]);

  if (communities.length > 0 && myState) {
    return (
      <div className="community-evolution">
        <AlluvialChart
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
