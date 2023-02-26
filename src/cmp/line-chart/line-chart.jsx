// import React from 'react';
// import { XYPlot,
//   XAxis,
//   YAxis,
//   VerticalGridLines,
//   HorizontalGridLines,
//   LineMarkSeries } from 'react-vis';

// const timeRanges = [{
//   network: {
//     numberOfNodes: 9752,
//     numberOfEdges: 20677,
//     density: 0.0004348852464091734,
//     diameter: 6,
//     radius: 0,
//     reciprocity: 1,
//     degreeCentrality: 0.8024165831775307
//   }
// },
// {
//   network: {
//     numberOfNodes: 39663,
//     numberOfEdges: 47995,
//     density: 0.00006101910334266666,
//     diameter: 4,
//     radius: 0,
//     reciprocity: 1,
//     degreeCentrality: 0.6122687803693816
//   }
// },{
//   network: {
//     numberOfNodes: 1590,
//     numberOfEdges: 4692,
//     density: 0.0037142144697626367,
//     diameter: 4,
//     radius: 2,
//     reciprocity: 1,
//     degreeCentrality: 1.0630729527466065
//   }
// }]

// function LineChart(props) {
//   // const data = [
//   //   { x: 0, y: 10 },
//   //   { x: 1, y: 5 },
//   //   { x: 2, y: 15 },
//   //   { x: 3, y: 20 },
//   //   { x: 4, y: 7 }
//   // ];
//   const data = timeRanges.map((timeRange, index) => {
//     return {
//       x: index,
//       y: timeRange.network.numberOfNodes
//     }
//   });

//   return (
//     <XYPlot width={300} height={300}>
//       <VerticalGridLines />
//       <HorizontalGridLines />
//       <XAxis />
//       <YAxis />
//       <LineMarkSeries
//         className="linemark-series-example"
//         style={{
//           strokeWidth: '3px'
//         }}
//         lineStyle={{stroke: 'red'}}
//         markStyle={{stroke: 'blue'}}
//         data={[{x: 1, y: 10}, {x: 2, y: 5}, {x: 3, y: 15}]}
//         fill={{
//           type: 'linear',
//           gradient: ['#000', '#fff']
//         }}
//       />
//       <LineMarkSeries
//         className="linemark-series-example-2"
//         curve={'curveMonotoneX'}
//         data={[{x: 1, y: 11}, {x: 1.5, y: 29}, {x: 3, y: 7}]}
//       />
//     </XYPlot>
//   );
// }

// export default LineChart;


import React, { useMemo, useCallback, useEffect } from 'react';
import { AreaClosed, Line, Bar } from '@visx/shape';
import appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock';
import { curveMonotoneX } from '@visx/curve';
import { GridRows, GridColumns } from '@visx/grid';
import { scaleTime, scaleLinear } from '@visx/scale';
import { withTooltip, Tooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
// import d3 from 'd3-array';
import { max, extent, bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';

// type TooltipData = AppleStock;

const stock = appleStock.slice(800);
export const background = '#3b6978';
export const background2 = '#204051';
export const accentColor = '#edffea';
export const accentColorDark = '#75daad';
const tooltipStyles = {
  ...defaultStyles,
  background,
  border: '1px solid white',
  color: 'white',
};

// util
const formatDate = timeFormat("%b %d, '%y");

// accessors
const getDate = (d) => new Date(d.date);
const getStockValue = (d) => d.close;
const bisectDate = bisector((d) => new Date(d.date)).left;

// export type AreaProps = {
//   width: number;
//   height: number;
//   margin?: { top: number; right: number; bottom: number; left: number };
// };


export default withTooltip(
  ({
    width = '500px',
    height = "500px",
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    showTooltip,
    hideTooltip,
    tooltipData =appleStock,
    tooltipTop = 0,
    tooltipLeft = 0,
  }) => {
    
    useEffect(() => {
      
      console.log('====================================');
      console.log('dddddddd',stock);
      console.log('====================================');
    }, [])
    
    if (width < 10) return null;

    // bounds
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // scales
    const dateScale = useMemo(
      () =>
        scaleTime({
          range: [margin.left, innerWidth + margin.left],
          domain: extent(stock, getDate) ,
        }),
      [innerWidth, margin.left],
    );
    const stockValueScale = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight + margin.top, margin.top],
          domain: [0, (max(stock, getStockValue) || 0) + innerHeight / 3],
          nice: true,
        }),
      [margin.top, innerHeight],
    );

    // tooltip handler
    const handleTooltip = useCallback(
      (event) => {
        const { x } = localPoint(event) || { x: 0 };
        const x0 = dateScale.invert(x);
        const index = bisectDate(stock, x0, 1);
        const d0 = stock[index - 1];
        const d1 = stock[index];
        let d = d0;
        if (d1 && getDate(d1)) {
          d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
        }
        showTooltip({
          tooltipData: d,
          tooltipLeft: x,
          tooltipTop: stockValueScale(getStockValue(d)),
        });
      },
      [showTooltip, stockValueScale, dateScale],
    );

    return (
      <div>
        <svg width={width} height={height}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="url(#area-background-gradient)"
            rx={14}
          />
          <LinearGradient id="area-background-gradient" from={background} to={background2} />
          <LinearGradient id="area-gradient" from={accentColor} to={accentColor} toOpacity={0.1} />
          <GridRows
            left={margin.left}
            scale={stockValueScale}
            width={innerWidth}
            strokeDasharray="1,3"
            stroke={accentColor}
            strokeOpacity={0}
            pointerEvents="none"
          />
          <GridColumns
            top={margin.top}
            scale={dateScale}
            height={innerHeight}
            strokeDasharray="1,3"
            stroke={accentColor}
            strokeOpacity={0.2}
            pointerEvents="none"
          />
          <AreaClosed
            data={stock}
            x={(d) => dateScale(getDate(d)) ?? 0}
            y={(d) => stockValueScale(getStockValue(d)) ?? 0}
            yScale={stockValueScale}
            strokeWidth={1}
            stroke="url(#area-gradient)"
            fill="url(#area-gradient)"
            curve={curveMonotoneX}
          />
          <Bar
            x={margin.left}
            y={margin.top}
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: margin.top }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                stroke={accentColorDark}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={accentColorDark}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <TooltipWithBounds
              key={Math.random()}
              top={tooltipTop - 12}
              left={tooltipLeft + 12}
              style={tooltipStyles}
            >
              {`$${getStockValue(tooltipData)}`}
            </TooltipWithBounds>
            <Tooltip
              top={innerHeight + margin.top - 14}
              left={tooltipLeft}
              style={{
                ...defaultStyles,
                minWidth: 72,
                textAlign: 'center',
                transform: 'translateX(-50%)',
              }}
            >
              {formatDate(getDate(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>
    );
  },
);