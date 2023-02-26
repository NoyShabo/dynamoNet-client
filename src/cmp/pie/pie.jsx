import React from 'react';
import Pie from '@visx/shape/lib/shapes/Pie';
import { scaleOrdinal } from '@visx/scale';
import { Group } from '@visx/group';
import { useSetState } from 'react-use';
import { Text } from "@visx/text";
import AnimatedPie from './animatedPie/animatedPie';
import LegendPie from './legendPie/legendPie';
import './pie.scss';

const defaultMargin = { top: 30, right: 30, bottom: 30, left: 30 };



export function PieChart({
  width,
  height,
  margin = defaultMargin,
  animate = true,
  dataObject,
}) {


  const [{ active, selectedLabel, sum }, setState] = useSetState({
    active: null,
    selectedLabel: null,
    sum: Object.values(dataObject).reduce((acc, val) => acc + parseFloat(val), 0)
  });

  const labelsNames = Object.keys(dataObject);

  const labelsArray = labelsNames.map((name) => {
    return {
      label: name,
      usage: Number(dataObject[name]),
      // percent: 100 * (Number(dataObject[name]) / sum)
      percent: (100 * (Number(dataObject[name]) / sum)).toFixed(2)
    }
  });

  const usage = (d) => d.usage;
  const colorsRange = [
    'rgba(29, 152, 188,0.9)',
    'rgba(29, 152, 188,0.6)',
    'rgba(29, 152, 188,0.4)',
    'rgba(29, 152, 199,0.2)',
    'rgba(255,255,255,0.2)',
    'rgba(255,255,255,0.1)'
  ];

  // color scales
  const getBrowserColor = scaleOrdinal({
    domain: labelsNames,
    range: colorsRange
  });

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  // const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const donutThickness = 50;
  const padding = 30;

  return (
    <div className='pie-chart'>
      <svg width={width} height={height} viewBox={`0 ${-padding / 2} ${+width} ${+height + padding}`} xmlns="http://www.w3.org/2000/svg">
        <Group top={centerY + margin.top} left={centerX + margin.left}>
          <Pie
            data={
              selectedLabel ? labelsArray.filter(({ label }) => label === selectedLabel) : labelsArray
            }
            pieValue={usage}
            fontFamily='cursive'
            outerRadius={donutThickness}
            innerRadius={({ data }) => {
              const size = active && active.label === data.label;
              return centerY + margin.top + size * 5;
            }}

            cornerRadius={4}
            padAngle={0.05}
          // padRadius={0.005}
          >
            {(pie) => (
            <AnimatedPie
              {...pie}
              animate={animate}
              getKey={(arc) => arc.data.percent+'%'}
              onClickDatum={({ data: { label } }) =>
                animate &&
                setState({selectedLabel:(selectedLabel && selectedLabel === label ? null : label)})
              }
              getColor={(arc) => getBrowserColor(arc.data.label)}

              setState={setState}
            />
          )}
        </Pie>
        <Text  textAnchor='middle' fill='#FFF' fontSize={16} fontWeight={200} fontFamily='cursive' dy={-10}>{active ? active.label:''}</Text> 
        <Text  textAnchor='middle' fill='#FFF' fontSize={16} fontWeight={200} fontFamily='cursive' dy={10}>{active ?active.usage: ''}</Text>
      </Group>
        {animate && (
          <text
            textAnchor="end"
            x={width - 16}
            y={height - 16}
            fill="white"
            fontSize={18}
            fontWeight={300}
            pointerEvents="none"
            fontFamily='cursive'          >
          </text>
        )}
      </svg>
      <LegendPie arr={labelsArray} setStateActive={setState} domain={labelsNames} range={colorsRange} />
    </div>

  );
}

