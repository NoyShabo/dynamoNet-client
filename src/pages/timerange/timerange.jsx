import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { DeleteButton } from "../../cmp/delete-button/deleteButton";
import { DisplayGraph } from "../../cmp/network-graph/networkGraph";
import { NetworkMetrics } from "../../cmp/network-metrics/networkMetrics";
import timeRange from "../../data/timeRange.json";
import "../../globalStyle.scss";
import "./timerange.scss";

const buttonStyle = {
  // align icon center
  "& > *": {
    margin: "auto",
  },
};

export function Timerange() {
  const [timeRangeTitle, setTimeRangeTitle] = useState(timeRange.title);
  const [editMode, setEditMode] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    timeRange.title = timeRangeTitle;
    setTimeRangeTitle(timeRange.title);
    setEditMode(false);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setTimeRangeTitle(timeRange.title);
    setEditMode(false);
  };

  const handleDelete = (id) => {
    console.log("Delete");
  };

  return (
    <div className="timerange">
      <div className="timerange-container">
        <div className="timerange-header">
          <div className="timerange-info">
            {editMode ? (
              <form onSubmit={handleSubmit} className="form-container">
                <label>
                  <input
                    type="text"
                    value={timeRangeTitle}
                    onChange={(event) => setTimeRangeTitle(event.target.value)}
                    className="title-project input-element"
                    style={{
                      width: `${timeRangeTitle.length}ch`,
                      maxWidth: "50vw",
                    }}
                  />
                </label>
                <div className="title-project">
                  <Button
                    color="success"
                    type="submit"
                    size="medium"
                    startIcon={<CheckIcon style={{ fontSize: 26 }} />}
                    sx={buttonStyle}
                  ></Button>
                  <Button
                    color="error"
                    onClick={handleCancel}
                    startIcon={<CloseIcon style={{ fontSize: 26 }} />}
                    sx={buttonStyle}
                  ></Button>
                </div>
              </form>
            ) : (
              <>
                <div className="title-project">
                  {timeRange.title}{" "}
                  <Button
                    onClick={() => setEditMode(true)}
                    startIcon={<EditIcon style={{ fontSize: 26 }} />}
                    sx={buttonStyle}
                  ></Button>
                </div>
              </>
            )}

            <div className="small-title-project">
              {new Date(timeRange.startDate).toLocaleDateString()} ↔{" "}
              {new Date(timeRange.endDate).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="network-container">
          <DisplayGraph
            width="80vw"
            height="70vh"
            network={timeRange.network}
          />
        </div>
        <NetworkMetrics network={timeRange.network} />
        <DeleteButton
          onDelete={handleDelete}
          title={`Delete Time Range: ${timeRangeTitle}`}
        />
      </div>
    </div>
  );
}
