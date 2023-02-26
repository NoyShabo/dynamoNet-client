import React from 'react';
import { useTransition, animated ,to} from '@react-spring/web'

const fromLeaveTransition = ({ endAngle }) => ({
  // enter from 360° if end angle is > 180°
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0,
});
const enterUpdateTransition = ({ startAngle, endAngle }) => ({
  startAngle,
  endAngle,
  opacity: 1,
});

export default function AnimatedPie({
  animate,
  arcs,
  path,
  getKey,
  getColor,
  onClickDatum,
  setState
}) {
  const transitions = useTransition(arcs, {
    from: animate ? fromLeaveTransition : enterUpdateTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: animate ? fromLeaveTransition : enterUpdateTransition,
    keys: getKey,
  });
  

//   return transitions((props:{startAngle, endAngle, opacity}, arc, { key }) => {
  return transitions((props, arc, { key }) => {
    const [centroidX, centroidY] = path.centroid(arc);
    const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;

    return (
      <g key={key} onMouseEnter={()=>setState({active:arc.data})} onMouseLeave={()=>setState({active:null})}  >
        <animated.path
          // compute interpolated path d attribute from intermediate angle values
          d={to([props.startAngle, props.endAngle], (startAngle, endAngle) =>
            path({
              ...arc,
              startAngle,
              endAngle,
            }),
          )}
          fill={getColor(arc)}
          fontFamily='cursive'
          onClick={() => onClickDatum(arc)}
          onTouchStart={() => onClickDatum(arc)}
        />
        {hasSpaceForLabel && (
          <animated.g style={{ opacity: props.opacity }}>
            <text
              fill="white"
              x={centroidX}
              y={centroidY}
              dy=".33em"
              fontSize={12}
              textAnchor="middle"
              pointerEvents="none"
              fontFamily="cursive"
            >
              {getKey(arc)}
            </text>
          </animated.g>
        )}
      </g>
    );
  });
}