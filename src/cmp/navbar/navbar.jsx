import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import React, { useEffect, useRef, useState } from "react";
import { Icon } from "react-icons-kit";
import { menu } from "react-icons-kit/feather/menu";
import { x } from "react-icons-kit/feather/x";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.scss";

export const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(1);

  const handleToggle = (num) => {
    setToggle(!toggle);
    setIsActive(num);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    if (
      event.target.innerText === "Twitter project" ||
      event.target.innerText === "By CSV"
    ) {
      handleToggle(2);
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [window.location.pathname]);

  return (
    <nav className={toggle ? "navbar expanded" : "navbar"}>
      <NavLink to="/projects">
        <h2 className="logo"></h2>
      </NavLink>
      <div className="toggle-icon" onClick={handleToggle}>
        {toggle ? <Icon icon={x} size={28} /> : <Icon icon={menu} size={28} />}
      </div>
      <ul className="links">
        {user && (
          <li className="nav-item">
            <NavLink
              exact="true"
              to="/projects"
              className={`nav-links ${isActive === 1 ? "Myactive" : ""}`}
              onClick={() => handleToggle(1)}
            >
              My Projects
            </NavLink>
          </li>
        )}
        {user && (
          <li className="nav-item">
            <NavLink
              exact="true"
              className={`nav-links ${isActive === 2 ? "Myactive" : ""}`}
            >
              <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={() => {
                  setOpen((prevOpen) => !prevOpen);
                }}
                style={{
                  color: "inherit",
                  textTransform: "capitalize",
                  fontSize: "14px",
                }}
              >
                <span className="nav-intrnal">create New Project</span>
              </Button>

              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                          className="drop-down"
                        >
                          <MenuItem onClick={handleClose}>
                            <NavLink
                              className="drop-item "
                              exact="true"
                              to={"/addProject/twitter"}
                            >
                              Twitter project
                            </NavLink>{" "}
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <NavLink
                              className="drop-item "
                              exact="true"
                              to={"/addProject/csv"}
                            >
                              By CSV
                            </NavLink>
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </NavLink>
          </li>
        )}
        {user && (
          <li className="nav-item">
            <NavLink
              exact="true"
              to="/profile"
              className={`nav-links ${isActive === 3 ? "Myactive" : ""}`}
              onClick={() => {
                handleToggle(3);
              }}
            >
              Profile
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
