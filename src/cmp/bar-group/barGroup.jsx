import { AxisBottom, AxisLeft } from "@visx/axis";
import { Group } from "@visx/group";
import { LegendOrdinal } from "@visx/legend";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { BarGroup } from "@visx/shape";
import React from "react";

const colors = {
  blue: "#aeeef8",
  green: "#e5fd3d",
  purple: "#9caff6",
  yellow: "#f6e58d",
  red: "#ff7979",
};
const background = "transparent";

export function Bars({ width, height, events = false, margin = null, data }) {
  const keys = Object.keys(data[0]).filter((d) => d !== "date");
  const defaultMargin = { top: 40, right: 0, bottom: 40, left: 50 };
  if (margin === null) margin = defaultMargin;

  // accessors
  const getDate = (d) => d.date;

  // scales
  const dateScale = scaleBand({
    domain: data.map(getDate),
    padding: 0.2,
  });
  const cityScale = scaleBand({
    domain: keys,
    padding: 0.1,
  });
  const tempScale = scaleLinear({
    domain: [
      0,
      Math.max(
        ...data.map((d) => Math.max(...keys.map((key) => Number(d[key]))))
      ),
    ],
  });
  const colorScale = scaleOrdinal({
    domain: keys,
    range: [
      colors.blue,
      colors.green,
      colors.purple,
      colors.yellow,
      colors.red,
    ],
  });

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // update scale output dimensions
  dateScale.rangeRound([0, xMax]);
  cityScale.rangeRound([0, dateScale.bandwidth()]);
  tempScale.range([yMax, 0]);

  return width < 10 ? null : (
    <div
      style={{
        width: "100%",
        maxWidth: "80vw",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "transparent",
        display: "flex",
      }}
    >
      <svg width={"100%"} height={height}>
        <rect
          x={0}
          y={0}
          width={"100%"}
          height={height}
          fill={background}
          rx={14}
        />
        <Group top={margin.top} left={margin.left}>
          <BarGroup
            data={data}
            keys={keys}
            height={yMax}
            x0={getDate}
            x0Scale={dateScale}
            x1Scale={cityScale}
            yScale={tempScale}
            color={colorScale}
          >
            {(barGroups) =>
              barGroups.map((barGroup) => (
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
              ))
            }
          </BarGroup>
        </Group>
        <AxisLeft
          scale={tempScale.nice()}
          top={margin.top}
          left={margin.left}
          stroke={"white"}
          tickStroke={"white"}
          tickLabelProps={(e) => ({
            fill: "white",
            color: "white",
            fontSize: 11,
            textAnchor: "end",
            x: -10,
            y: (tempScale(e) ?? 0) + 3,
          })}
        />
        <AxisBottom
          top={yMax + margin.top}
          left={margin.left}
          scale={dateScale}
          stroke={"white"}
          tickStroke={"white"}
          tickLabelProps={() => ({
            fill: "white",
            fontSize: 11,
            textAnchor: "middle",
          })}
        />
      </svg>

      <LegendOrdinal
        scale={colorScale}
        direction="row"
        labelMargin="0 15px 0 0"
        style={{
          color: "white",
          fontSize: "11px",
          alignSelf: "start",
          marginLeft: "10px",
          marginBottom: margin.bottom,
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      />
    </div>
  );
}
