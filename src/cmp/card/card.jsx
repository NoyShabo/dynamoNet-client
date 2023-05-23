import { Card, Image, Text } from "@mantine/core";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

import "../../globalStyle.scss";
import projectImg from "./project.png";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import { deleteTimeRange } from "../../serverApi/rest/timeRangeApi";
import "./card.scss";

export function GlobalCard({
  id,
  title,
  description,
  imgUrl = projectImg,
  linkTo,
  moreDescription,
  isTimeRangeCard = false,
  projectId = "0",
  OnDeleteTimeRange,
}) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const deleteTRShowConfirm = (e) => {
    e.preventDefault();
    // console.log("delete TR "+id)
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async (confirm) => {
    if (confirm) {
      console.log(id);
      OnDeleteTimeRange(id);
    }
    setShowConfirmDelete(false);
  };

  return (
    <div className="card-container">
      <Card
        shadow="sm"
        p="xl"
        component={Link}
        to={linkTo}
        fontFamily="OpenSans"
      >
        <Card.Section>
          <Image
            height={100}
            alt="No way!"
            src={imgUrl}
            fit="contain"
            style={{ marginTop: "10px" }}
          />
        </Card.Section>

        <Text
          weight={500}
          size="lg"
          mt="md"
          color="#e0e0e0"
          className="c-title"
        >
          {title}
        </Text>

        <Text mt="xs" size="sm" color="#70d8bd">
          {description}
        </Text>
        <Text mt="xs" color="#e0e0e0" size="sm" className="p-description">
          {moreDescription ?? ""}
        </Text>
        {isTimeRangeCard && (
          <button className="btn-remove" onClick={deleteTRShowConfirm}>
            <RemoveCircleIcon className="remove-icon" />
          </button>
        )}
      </Card>
      <Dialog
        open={showConfirmDelete}
        onClose={handleConfirmDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleConfirmDelete(false);
            }}
            autoFocus
          >
            Cancel
          </Button>
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleConfirmDelete(true);
            }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
