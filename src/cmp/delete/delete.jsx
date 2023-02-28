import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";

const buttonStyle = {
  // align icon center
  "& > *": {
    margin: "auto",
  },
};

export function Delete({ onDelete, title, message }) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDelete = (event) => {
    event.preventDefault();
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = (confirm) => {
    if (confirm) {
      onDelete();
    }
    setShowConfirmDelete(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={handleDelete}
        style={buttonStyle}
      >
        <DeleteForeverIcon />
        Delete
      </Button>
      <Dialog
        open={showConfirmDelete}
        onClose={handleConfirmDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title || "Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message ||
              "Are you sure you want to delete? This action cannot be undone."}
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
