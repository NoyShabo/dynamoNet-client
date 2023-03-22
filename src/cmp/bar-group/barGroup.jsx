import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { BarGroup } from "@visx/shape";
import { timeFormat, timeParse } from "d3-time-format";
import React from "react";

const blue = "#aeeef8";
export const green = "#e5fd3d";
const purple = "#9caff6";
export const background = "#612efb";

const data = [
  {
    group: "Group A",
    bars: [
      { key: "Bar 1", value: 10 },
      { key: "Bar 2", value: 2 },
      { key: "Bar 3", value: 30 },
    ],
  },
  {
    group: "Group B",
    bars: [
      { key: "Bar 1", value: 5 },
      { key: "Bar 2", value: 25 },
      { key: "Bar 3", value: 35 },
    ],
  },
  // ...more groups
];
const keys = data[0].bars.map((d) => d.key);
const defaultMargin = { top: 40, right: 0, bottom: 40, left: 0 };

const parseDate = timeParse("%Y-%m-%d");
const format = timeFormat("%b %d");
const formatDate = (date) => format(parseDate(date));

// accessors
const getGroup = (d) => d.group;

// scales
const groupScale = scaleBand({
  domain: data.map(getGroup),
  padding: 0.2,
});
const barScale = scaleBand({
  domain: keys,
  padding: 0.1,
});

const tempValues = data.reduce(
  (all, d) => [...all, ...d.bars.map((bar) => bar.value)],
  []
);

const tempScale = scaleLinear({
  domain: [
    0,
    Math.max(...data.map((d) => Math.max(...d.bars.map((bar) => bar.value)))),
  ],
});
const colorScale = scaleOrdinal({
  domain: keys,
  range: [blue, green, purple],
});

export function Bars({
  width,
  height,
  events = false,
  margin = defaultMargin,
}) {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // update scale output dimensions
  groupScale.rangeRound([0, xMax]);
  barScale.rangeRound([0, groupScale.bandwidth()]);
  tempScale.range([yMax, 0]);

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={background}
        rx={14}
      />
      <Group top={margin.top} left={margin.left}>
        <BarGroup
          data={data}
          keys={keys}
          height={yMax}
          x0={getGroup}
          x0Scale={groupScale}
          x1Scale={barScale}
          yScale={tempScale}
          color={colorScale}
        >
          {(barGroups) =>
            barGroups.map((barGroup) => {
              console.log(barGroup);
              return (
                <Group
                  key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                  left={barGroup.x0}
                >
                  {barGroup.bars.map((bar) => (
                    <rect
                      key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                      x={bar.x}
                      y={bar.y}
                      width={bar.width}
                      height={bar.height}
                      fill={bar.color}
                      rx={4}
                      onClick={() => {
                        if (!events) return;
                        const { key, value } = bar;
                        alert(JSON.stringify({ key, value }));
                      }}
                    />
                  ))}
                </Group>
              );
            })
          }
        </BarGroup>
      </Group>
      <AxisLeft
        scale={tempScale}
        top={margin.top}
        left={margin.left}
        stroke={green}
        tickStroke={green}
        hideAxisLine
      />

      <AxisBottom
        top={yMax + margin.top}
        tickFormat={formatDate}
        scale={groupScale}
        stroke={green}
        tickStroke={green}
        hideAxisLine
        // tickLabelProps={{
        //   fill: green,
        //   fontSize: 11,
        //   textAnchor: "middle",
        // }}
      />
    </svg>
  );
}
