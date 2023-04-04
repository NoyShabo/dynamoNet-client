import { wind } from "fontawesome";
import React, { useEffect, useState } from "react";
import { Icon } from "react-icons-kit";
import { menu } from "react-icons-kit/feather/menu";
import { x } from "react-icons-kit/feather/x";
// import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.scss";
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Button from '@mui/material/Button';
import { useRef } from "react";
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';


export const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  // const user = useSelector((state) => state.userModule.user);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(1);



  const handleToggle = (num) => {
    setToggle(!toggle);
    setIsActive(num)
  };

  const handleClose = (event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }

    if(event.target.innerText === "Twitter project" || event.target.innerText === "By CSV") {
      handleToggle(2)
    //   console.log("Basic project---");
    //   navigate("/addProject/basic");
    
    }
    
    // else if(event.target.innerText === "By CSV") {
    //   console.log("By CSV---");
    //   navigate("/addProject/csv");
    // }
    // handleToggle(2)
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [window.location.pathname]);

  // function isNavLinkActive(match, location) {
  //   console.log(location.pathname);
  //   return match || location.pathname.startsWith("/project");
  // }
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
              // isActive={isNavLinkActive}
              onClick={()=>handleToggle(1)}
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
              // onClick={()=>{handleToggle(2)}}
              // to={}
            >
              <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={() => {setOpen((prevOpen) => !prevOpen)}}
                style={{color: "inherit", textTransform:"capitalize", fontSize:"14px"}}
            >
            <span className="nav-intrnal">create  New Project</span>
            </Button>

          <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          // className="popper-position"
          // style={{transform: "translate(852px, 67px)"}}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
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
                    <MenuItem  onClick={handleClose}><NavLink className="drop-item "  exact="true" to={'/addProject/twitter'}>Twitter project</NavLink> </MenuItem>
                    <MenuItem  onClick={handleClose}><NavLink className="drop-item " exact="true" to={'/addProject/csv'}>By CSV</NavLink></MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper> 
      
              {/* New Project */}
            </NavLink>
          </li>
        )}
        {user && (
          <li className="nav-item">
            <NavLink
              exact="true"
              to="/profile"
              className={`nav-links ${isActive === 3 ? "Myactive" : ""}`}
              onClick={()=>{handleToggle(3)}}
            >
              Profile
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};
