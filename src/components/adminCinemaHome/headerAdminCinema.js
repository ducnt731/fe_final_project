import React from "react";

const HeaderAdminCinema = ({ OpenSidebar }) => {
    return (
        <header className='header'>
            <div className='menu-icon'>
                <i className="fa-solid fa-align-justify icon" onClick={OpenSidebar}></i>
            </div>
            <div className='header-left'>

            </div>
            <div className='header-right'>
                <i className="fa-solid fa-bell icon"></i>
                <i className="fa-solid fa-envelope icon"></i>
                <i className="fa-solid fa-circle-user icon"></i>
            </div>
        </header>
    )
}

export default HeaderAdminCinema