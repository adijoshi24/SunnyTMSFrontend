import React, {useEffect} from "react";
import cn from "classnames";
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import {SidebarData} from "./SidebarData";
import "./Sidebar.css";
import {FaBars} from "react-icons/fa";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {IconContext} from "react-icons";
import {Logo} from "../HelperCells";

function Sidebar(props) {
    var user = useSelector((state) => state.Login),
        {pathname = ''} = useLocation();
    return (
        <>
            <IconContext.Provider value={{color: "rgb(83, 80, 80)"}}>
                <nav className={"nav-menu active"}>
                    <ul className="nav-menu-items">
                        <li className="navbar-toggle">
                            <Logo style={{fontSize: "x-large"}}/>
                        </li>
                        {SidebarData.map((item, index) => {
                            if (item.userRole.includes(user.role)) {
                                return (
                                    <li key={index}
                                        className={cn(item.cName, {'sidebarSelectedMenu': item.path === pathname})}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span className="moduleTitle">{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Sidebar;
