import { useState } from "react";
import { DropZone } from "./drag-drop-file/dragDrop";

import "./tableUploadFile.scss";

export function TableUploadFile({
  array,
  setArray,
  setFileToSend,
  setIsValidCSV,
}) {
  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    if (
      csvHeader[0].toLowerCase() !== "source" ||
      csvHeader[1].toLowerCase() !== "destination" ||
      csvHeader[2].toLowerCase() !== "edgecontent" ||
      csvHeader[3].toLowerCase() !== "timestamp" ||
      !csvHeader[4].toLowerCase().includes("edgetype")
    ) {
      setIsValidCSV(true);
    } else setIsValidCSV(false);

    console.log("csvHeader", csvHeader);
    const newArray = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(newArray);
  };

  return (
    <div className="table-analyser">
      <DropZone
        fileReadCallback={csvFileToArray}
        setFileToSend={setFileToSend}
      />
    </div>
  );
}
