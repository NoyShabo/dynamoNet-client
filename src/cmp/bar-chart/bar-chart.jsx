import React, { useMemo } from 'react'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { Bar } from '@visx/shape'
import { Group } from '@visx/group'
import { GridRows } from '@visx/grid';
import { GradientTealBlue } from '@visx/gradient'
import { Text } from "@visx/text";


import { scaleBand, scaleLinear } from '@visx/scale'


// const data = [
//     {window: 'TimeRange 1', frequency: 20},
//     {window: 'TimeRange 2', frequency:70},
//     {window: 'TimeRange 3', frequency:80},
//     {window: 'TimeRange 4', frequency:55},
//     {window: 'TimeRange 5', frequency:45},
//     {window: 'TimeRange 6', frequency: 70}
// ]
// const data = [
//     {window: 'TimeRange 1', frequency: 0.8024165831775307},
//     {window: 'TimeRange 2', frequency:0.6122687803693816},
//     {window: 'TimeRange 3', frequency:1.0630729527466065},
//     {window: 'TimeRange 4', frequency:0.39},
//     {window: 'TimeRange 5', frequency:0.22},
//     {window: 'TimeRange 6', frequency: 0.28}
// ]
const verticalMargin = 120;


const getLabel = (d) => d.window


const margins = {
  left: 30,
}

// max width 80% of the page view width
const maxWidth = 0.8 * window.innerWidth;

export function BarChart({ width, height, data, isPercent=false, events = false }) {
  // bounds
  width = width<maxWidth ? width : maxWidth;
  const xMax = width - margins.left
  const yMax = height - verticalMargin
  
  const getLabelFrequency = (d) => Number(d.frequency) * (isPercent ?100 :1)
  
  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, xMax],
        round: true,
        domain: data.map(getLabel),
        padding: 0.4,
      }),
    [xMax, data],
  )

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getLabelFrequency))],
      }),
    [yMax, data, getLabelFrequency],
  )

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <GradientTealBlue id="teal"  />
      <rect width={width} height={height} fill="#263145" rx={14} />
      <Group top={verticalMargin / 2} left={margins.left}>
      {/* <Text textAnchor='middle' fill='#FFF' fontSize={16} fontWeight={200} dy={-300}fontFamily='cursive'>Title</Text> */}
        {data.map((d) => {
          const window = getLabel(d)
          const barWidth = xScale.bandwidth()
          const barHeight = yMax - (yScale(getLabelFrequency(d)) ?? 0)
          const barX = xScale(window)
          const barY = yMax - barHeight
          return (
            <Bar
              fontFamily='Sunflower'
              key={`bar-${window}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              strokeWidth={1}
              
            stroke="rgba(10, 102, 128,0.8)"
            // fill="url(#area-gradient) "
              fill="rgb(112, 216, 189,0.8)"
              onClick={() => {
                if (events) alert(`clicked: ${JSON.stringify(Object.values(d))}`)
              }}
            />
          )
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
            fill: '#EBF0F3',
            fontSize: 12,
            textAnchor: 'middle',
            fontFamily:'cursive'
          })}
        />
        <AxisLeft
          scale={yScale.nice()}
          numTicks={10}
          top={0}
          tickLabelProps={(e) => ({
            fill: '#EBF0F3',
            fontSize: 10,
            fontFamily:'cursive',
            textAnchor: 'end',
            x: -1,
            y: (yScale(e) ?? 0) + 3,
          })}
        />
      </Group>
    </svg>
  )
}
