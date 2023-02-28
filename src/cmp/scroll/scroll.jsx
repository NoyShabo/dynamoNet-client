import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import { LeftArrow, RightArrow } from "../arrows/arrows";
import usePreventBodyScroll from "./useBodyScroll.js";
import useDrag from "./useDrag";

// NOTE: embrace power of CSS flexbox!
import "./scroll.scss";


export function Scroll({items}) {
  // const [items] = React.useState(getItems);
  const { disableScroll, enableScroll } = usePreventBodyScroll();
  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag = ({ scrollContainer }) => (
    ev
  ) =>
    dragMove(ev, (posDiff) => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft += posDiff;
      }
    });

  const [selected, setSelected] = React.useState("");
  const handleItemClick = (itemId) => () => {
    if (dragging) {
      return false;
    }
    setSelected(selected !== itemId ? itemId : "");
  };

  return (
    <>
      <div className="example" >
        <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
          <ScrollMenu
            // Header={<div>HEADER</div>}
            // Footer={<div>FOOTER</div>}
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            // onWheel={onWheel}
            onMouseDown={() => dragStart}
            onMouseUp={() => dragStop}
            onMouseMove={handleDrag}
          >
            {items}
          </ScrollMenu>
        </div>
      </div>
    </>
  );
}

function onWheel(apiObj, ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}