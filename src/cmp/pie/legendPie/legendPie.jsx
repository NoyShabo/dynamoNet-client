import React from 'react';
import { scaleOrdinal } from '@visx/scale';
import { LegendOrdinal, LegendItem, LegendLabel, } from '@visx/legend';

import './legendPie.scss'

export default function LegendPie({ domain, range, setStateActive, arr }) {

  const legendGlyphSize = 15;

  const ordinalColorScale = scaleOrdinal({
    domain: domain,
    range: range,
  });

  return (
    <div className='legend-pie' >
      <LegendOrdinal direction='column' scale={ordinalColorScale} labelFormat={(label) => `${label.toUpperCase()}`} >
        {(labels) => (
          <div >
            {labels.map((label, i) => {
              return (
                <LegendItem
                  key={`legend-quantile-${label.datum + i}`}
                  margin="0 5px"
                  fontFamily="Open Sans"
                  onClick={() => {
                    console.log('label', label);
                    setStateActive({ active: arr[label.index] });
                  }}
                  onMouseEnter={() => {
                    setStateActive({ active: arr[label.index] });
                  }
                  }
                  onMouseLeave={() => {
                    setStateActive({ active: null });
                  }}

                >
                  <svg width={legendGlyphSize} height={legendGlyphSize}>
                    <rect fill={label.value} width={legendGlyphSize} height={legendGlyphSize} />
                  </svg>
                  <LegendLabel align="left" margin="0 0 5px 4px" fontFamily="Open Sans">
                    <div className='text-label'>{label.text}</div>
                  </LegendLabel>
                </LegendItem>
              )
            })}
          </div>
        )}
      </LegendOrdinal>
    </div>

  )

}