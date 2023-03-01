import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import "./edit.scss";

const buttonStyle = {
  "& > *": {
    margin: "auto",
  },
};

export function Edit(props) {
  const [values, setValues] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setValues(props.inputs.map((input) => input.value));
  }, [props.inputs]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(values);
    setEditMode(false);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setValues(props.inputs.map((input) => input.value));
    setEditMode(false);
  };

  return (
    <div className="edit-container">
      {editMode ? (
        <form onSubmit={handleSubmit} className="form-container">
          <div>
            {props.inputs.map((input, index) => (
              <label key={index} style={{ display: "block" }}>
                <input
                  type={input.type}
                  value={values[index]}
                  onChange={(event) => {
                    const newValues = [...values];
                    newValues[index] = event.target.value;
                    setValues(newValues);
                  }}
                  className={input.className}
                  style={{
                    ...input.style,
                    width: `${values[index].length}ch`,
                    maxWidth: "50vw",
                  }}
                  {...input.props}
                />
              </label>
            ))}
          </div>
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
        <div className="edit-button-container">
          <div>
            {props.inputs.map((input, index) => (
              <div key={index} className={input.className}>
                {input.value}
              </div>
            ))}
          </div>
          <Button
            onClick={() => setEditMode(true)}
            startIcon={<EditIcon style={{ fontSize: 26 }} />}
            sx={buttonStyle}
          ></Button>
        </div>
      )}
    </div>
  );
}
