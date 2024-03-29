import { AxisBottom, AxisLeft } from "@visx/axis";
import { GradientTealBlue } from "@visx/gradient";
import { GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar } from "@visx/shape";
import React, { useMemo } from "react";

const verticalMargin = 120;
const getLabel = (d) => d.window;
const margins = {
  left: 30,
};

// max width 80% of the page view width
const maxWidth = 0.8 * window.innerWidth;

export function BarChart({
  width,
  height,
  data,
  isPercent = false,
  events = false,
}) {
  // bounds
  width = width < maxWidth ? width : maxWidth;
  const xMax = width - margins.left;
  const yMax = height - verticalMargin;

  const getLabelFrequency = (d) => Number(d.frequency) * (isPercent ? 100 : 1);

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, xMax],
        round: true,
        domain: data.map(getLabel),
        padding: 0.4,
      }),
    [xMax, data]
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getLabelFrequency))],
      }),
    [yMax, data, getLabelFrequency]
  );

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <GradientTealBlue id="teal" />
      <rect width={width} height={height} fill="#141b2d" rx={14} />
      <Group top={verticalMargin / 2} left={margins.left}>
        {data.map((d) => {
          const window = getLabel(d);
          const key = d.key;
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getLabelFrequency(d)) ?? 0);
          const barX = xScale(window);
          const barY = yMax - barHeight;
          return (
            <Bar
              fontFamily="Sunflower"
              key={key}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              strokeWidth={1}
              stroke="rgba(10, 102, 128,0.9)"
              fill="rgb(112, 216, 189,0.9)"
              onClick={() => {
                if (events)
                  alert(`clicked: ${JSON.stringify(Object.values(d))}`);
              }}
            />
          );
        })}

        <GridRows
          scale={yScale.nice()}
          numTicks={10}
          top={0}
          width={xMax}
          strokeDasharray="1,1"
          strokeOpacity={0.1}
          pointerEvents="none"
        />

        <AxisBottom
          numTicks={data.length}
          top={yMax}
          scale={xScale}
          tickLabelProps={() => ({
            fill: "#EBF0F3",
            fontSize: 12,
            textAnchor: "middle",
            fontFamily: "cursive",
            overflow: "hidden",
          })}
        />
        <AxisLeft
          scale={yScale.nice()}
          numTicks={10}
          top={0}
          tickLabelProps={(e) => ({
            fill: "#EBF0F3",
            fontSize: 10,
            fontFamily: "cursive",
            textAnchor: "end",
            x: -1,
            y: (yScale(e) ?? 0) + 3,
          })}
        />
      </Group>
    </svg>
  );
}
