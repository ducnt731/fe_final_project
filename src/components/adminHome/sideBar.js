import React from "react";
import { useNavigate } from "react-router-dom";

const SideBar = ({ openSidebarToggle, OpenSidebar }) => {
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
                    <a className="item" href="/admin">
                        <i className="fa-solid fa-chart-simple icon"></i> Dashboard
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a className="item" href="/admin/manage_movie">
                        <i className="fa-solid fa-table-cells-large icon"></i> Manage Movie
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a className="item" href="/admin/manage_accounts">
                        <i className="fa-solid fa-users icon"></i> Manage Accounts
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a className="item" href="/admin/manage_time_show">
                        <i className="fa-solid fa-location-dot icon"></i> Manage Show Time
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a className="item" href="/admin/cinema">
                        <i className="fa-solid fa-location-dot icon"></i> Theaters
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a className="item" href="">
                        <i className="fa-solid fa-ticket icon"></i> Coupon
                    </a>
                </li>
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

export default SideBar