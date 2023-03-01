import React,{useState} from 'react'
import {Icon} from 'react-icons-kit'
import {menu} from 'react-icons-kit/feather/menu'
import {x} from 'react-icons-kit/feather/x'
import "./navbar.scss";
import { NavLink } from "react-router-dom";

export const Navbar = () => {

  const [toggle, setToggle]=useState(false);

  const handleToggle=()=>{
    setToggle(!toggle);
  }


  return (
    <nav className={toggle?'navbar expanded':'navbar'}>
        <NavLink  to="/timerange"> 
              <h2 className='logo'></h2>
          </NavLink>
        <div className='toggle-icon' onClick={handleToggle}>
          {toggle?<Icon icon={x} size={28}/>:<Icon icon={menu} size={28}/>}
        </div>
        <ul className='links'>
        <li className="nav-item">
            <NavLink
                exact="true"
                to="/projects"
                className="nav-links"
                onClick={handleToggle}

            >
                My Projects
            </NavLink>
         </li>
         <li className="nav-item">
            <NavLink
                exact="true"
                to="/addProject"
                className="nav-links"
                onClick={handleToggle}

            >
                New Project
            </NavLink>
         </li>
         <li className="nav-item">
            <NavLink
                exact="true"
                to="/profile"
                className="nav-links"
                onClick={handleToggle}
            >
             Profile
            </NavLink>
         </li>
        </ul>
    </nav>
  )
}