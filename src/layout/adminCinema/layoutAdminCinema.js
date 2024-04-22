import React from "react";
import { useState } from "react"
import "../../style/layoutAdmin.css"
import HeaderAdmin from "../../components/adminHome/headerAdmin";
import SideBar from "../../components/adminHome/sideBar";
import HeaderAdminCinema from "../../components/adminCinemaHome/headerAdminCinema";
import SideBarAdminCinema from "../../components/adminCinemaHome/sideBarAdminCinema";

const LayoutAdminCinema = ({ children }) => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }

    return (
        <>
            <div className="grid-container">
                <HeaderAdminCinema OpenSidebar={OpenSidebar} />
                <SideBarAdminCinema openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
                {children}
            </div>
        </>
    )
}

export default LayoutAdminCinema