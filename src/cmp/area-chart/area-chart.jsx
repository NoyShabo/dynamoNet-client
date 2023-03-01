import React, { useMemo, useCallback, useEffect } from 'react';
import { AreaClosed,  Bar } from '@visx/shape';
// import appleStock from '@visx/mock-data/lib/mocks/appleStock';
import { curveMonotoneX } from '@visx/curve';
import { scaleTime, scaleLinear } from '@visx/scale';
import {  defaultStyles,useTooltip,useTooltipInPortal } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { max, extent, bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';
import { Group } from '@visx/group';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows  } from '@visx/grid';

// util
const formatDate = timeFormat("%b %d, '%y");

// const dataArray =[
//   {date: '2007-04-24T07:00:00.000Z', close: 93.24},
//   {date: '2007-04-25T07:00:00.000Z', close: 95.35},
//   {date: '2007-04-26T07:00:00.000Z', close: 98.84},  
//   {date: '2007-04-27T07:00:00.000Z', close: 99.92},
//   {date: '2007-04-30T07:00:00.000Z', close: 99.8},
//   {date: '2007-05-01T07:00:00.000Z', close: 99.47},
//   {date: '2007-05-02T07:00:00.000Z', close: 100.39}
// ]

// accessors
const getDate = (d) => new Date(d.date);
const getStockValue = (d) => d.close;
const bisectDate = bisector((d) => new Date(d.date)).left;

export function AreaChart({dataArray,width,height}) {

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    // use TooltipWithBounds
    detectBounds: true,
    // when tooltip containers are scrolled, this will correctly update the Tooltip position
    scroll: true,
  })

  const dataSorted = dataArray.sort(({ date: dateA }, { date: dateB }) => new Date(dateA) - new Date(dateB));
  const stock = dataSorted.map(dataItem => ({ date: new Date(dataItem.date), close: dataItem.close }))

  const dateScale = useMemo(() => {
    return scaleTime({ range: [0, width], domain: extent(stock, getDate) })
  }, [width,stock])

  const stockValueScale = useMemo(() => {
    const domain = [0, (max(stock, getStockValue) || 0) + height / 3]
    return scaleLinear({ range: [height, 0], domain, nice: true, })
  }, [height,stock])

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
        tooltipLeft: parseFloat(dateScale(getDate(d))) /* Use x for cursor position */,
        tooltipTop: stockValueScale(getStockValue(d)),
      });
    },
    [showTooltip, stockValueScale, dateScale,stock],
  );


  return (
    <div ref={containerRef}>
      <svg width={width} height={height} viewBox={`0 0 ${+width - 20} ${+height + 20}`}>
        <Group>
          <LinearGradient id="area-background-gradient" from={"rgba(29, 152, 188,0.9)"} to={"rgba(29, 152, 188,0.1)"}  />
          <LinearGradient id="area-gradient" from={"rgba(29, 152, 188,0.9)"} to={"rgba(29, 152, 188,0.1)"}  toOpacity={0.1} />
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="rgba(0,0,0,0.1)"
            rx={14}
          />
          <GridRows
            scale={stockValueScale}
            width={width}
            strokeDasharray="1,1"
            stroke={"white"}
            strokeOpacity={0.1}
            pointerEvents="none"
          />

          <AreaClosed
            data={stock}
            x={(d) => dateScale(getDate(d)) ?? 0}
            y={(d) => stockValueScale(getStockValue(d)) ?? 0}
            yScale={stockValueScale}
            // strokeWidth={1}
            // strokeLinecap="round"
            // stroke="url(#area-gradient)"
            fill="url(#area-gradient)"
            curve={curveMonotoneX}
          />
          <AxisBottom tickLabelProps={() => ({
            fill: '#EBF0F3',
            fontSize: 11,
            textAnchor: 'middle',
          })} top={height} scale={dateScale} numTicks={width > 520 ? 10 : 5} />
          <AxisLeft
            tickLabelProps={() => ({
              fill: '#EBF0F3',
              fontSize: 11,
              textAnchor: 'end',
            })}
            numTicks={height > 520 ? 10 : 5}
            scale={stockValueScale} />
          <Bar
            width={width}
            height={height}
            fill="transparent"
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
          {tooltipData && (
            <g>
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
                fill={"green"}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}


        </Group>
      </svg>

      {tooltipData && (
        <div>
          <TooltipInPortal
            key={Math.random()}
            top={tooltipTop - 12}
            left={tooltipLeft}
            offsetLeft={30}
            style={{...defaultStyles}}
          >
            {`${getStockValue(tooltipData)}`}
          </TooltipInPortal>
          <TooltipInPortal
            top={height - 14}
            left={tooltipLeft}
            style={{
              ...defaultStyles,
            }}
          >
            {formatDate(getDate(tooltipData))}
          </TooltipInPortal>
        </div>
      )}
    </div>


  );
}