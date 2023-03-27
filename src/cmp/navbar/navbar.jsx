import React, { useState } from "react";
import { Icon } from "react-icons-kit";
import { menu } from "react-icons-kit/feather/menu";
import { x } from "react-icons-kit/feather/x";
import { NavLink } from "react-router-dom";
import "./navbar.scss";
import { useDispatch, useSelector } from "react-redux";

export const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const user = useSelector((state) => state.userModule.user);

  const handleToggle = () => {
    setToggle(!toggle);
  };

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
        {user&&<li className="nav-item">
           <NavLink
            exact="true"
            to="/projects"
            className="nav-links"
            // isActive={isNavLinkActive}
            onClick={handleToggle}
          >
            My Projects
          </NavLink>
        </li>}
        {user&&<li className="nav-item">
         <NavLink
            exact="true"
            to="/addProject"
            className="nav-links"
            onClick={handleToggle}
          >
            New Project
          </NavLink>
        </li>}
        {user&&<li className="nav-item">
          <NavLink
            exact="true"
            to="/profile"
            className="nav-links"
            onClick={handleToggle}
          >
            Profile
          </NavLink>
        </li>}
      </ul>
    </nav>
  );
};
