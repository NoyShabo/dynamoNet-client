import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect } from "react";
import { DatasetList } from "../sourceList/list";
import "./modal.scss";

export const Modal = ({ onRequestClose, dataset }) => {
  // Use useEffect to add an event listener to the document
  useEffect(() => {
    function onKeyDown(event) {
      if (event.keyCode === 27) {
        // Close the modal when the Escape key is pressed
        onRequestClose();
      }
    }

    // Prevent scolling
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    // Clear things up when unmounting this component
    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <div className="project-modal">
      <div className="modal__backdrop">
        <div className="modal__container">
          <DatasetList dataset={dataset} />
          <CloseIcon onClick={onRequestClose} className="close-modal" />
        </div>
      </div>
    </div>
  );
};
