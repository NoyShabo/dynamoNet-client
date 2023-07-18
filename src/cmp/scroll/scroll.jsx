import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import { LeftArrow, RightArrow } from "./arrows/arrows";
import usePreventBodyScroll from "./useBodyScroll.js";
import useDrag from "./useDrag";

import "./scroll.scss";

export function Scroll({ items }) {
  const { disableScroll, enableScroll } = usePreventBodyScroll();
  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag =
    ({ scrollContainer }) =>
    (ev) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  return (
    <>
      <div className="example">
        <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
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
