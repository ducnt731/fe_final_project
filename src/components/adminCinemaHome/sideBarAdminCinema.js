import React from "react";
import { IoFastFood } from "react-icons/io5";
import { MdMovie } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const SideBarAdminCinema = ({ openSidebarToggle, OpenSidebar }) => {
    const navigate = useNavigate()
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <i className="fa-solid fa-film icon_header"></i> DC Cinema
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>
            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <a className="item" href="/admin-cinema">
                        <i className="fa-solid fa-chart-simple icon"></i> Dashboard
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a className="item" href="/admin-cinema/manage-movie">
                        <MdMovie className="icon"/> Manage Movie
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a className="item" href="/admin-cinema/show-time">
                        <RiCalendarScheduleFill className="icon"/> Manage Schedule
                    </a>
                </li>
                {/* <li className='sidebar-list-item'>
                    <a className="item" href="">
                        <IoFastFood/> Manage Food 
                    </a>
                </li> */}
                <li className="sidebar-list-item">
                    <a style={{ color: "#fff" }}
                        onClick={() => {
                            localStorage.clear()
                            navigate('/')
                        }}>
                        <i className="fa-solid fa-right-from-bracket icon"></i> Logout
                    </a>
                </li>
            </ul>
        </aside>
    )
}

export default SideBarAdminCinema