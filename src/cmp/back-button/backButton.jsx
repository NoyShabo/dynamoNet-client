import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./backButton.scss";

const buttonStyle = {
  // align icon center
  "& > *": {
    margin: "auto",
  },
};

export function BackButton({ previous }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate(previous);
  };

  return (
    <div className="back-button">
      <Button
        variant="outlined"
        color="primary"
        // onClick={handleClickOpen}
        onClick={handleBack}
        style={buttonStyle}
      >
        <ArrowBackIosIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to go back?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will lose all unsaved changes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleBack} autoFocus>
            Go Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
