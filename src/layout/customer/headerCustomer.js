import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from "react-router-dom";
import '../../style/home.css'
import { ImProfile } from "react-icons/im";
import { FaLocationDot, FaNewspaper } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { BiHomeAlt } from "react-icons/bi";

const Header = () => {

    const navigate = useNavigate()

    return (
        <div className="header-customer" style={{ position: "fixed", top: "0", left: "0", width: "100%", zIndex: "1000" }}>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-secondary">
                    <Container fluid>
                        <Navbar.Brand href="/home">
                            <img style={{ width: "30px", height: "30px" }} src={require('../../assets/logo1.png')} /> DC Cinema
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                            className='menu'
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Hi, {localStorage.getItem("name")}
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Link href="/home" className="menu-item"><BiHomeAlt /> Home</Nav.Link>
                                    <Nav.Link href="/profile" className="menu-item"><ImProfile /> Profile</Nav.Link>
                                    <Nav.Link href="/theater" className="menu-item"><FaLocationDot /> Theater</Nav.Link>
                                    <Nav.Link href="#action2" className="menu-item"><FaHistory /> History purchase</Nav.Link>
                                    <Nav.Link href="#action2" className="menu-item"><FaNewspaper /> Breaking news</Nav.Link>
                                    <Nav.Link
                                        className="menu-item"
                                        onClick={() => {
                                            localStorage.clear()
                                            navigate('/')
                                        }}><LuLogOut /> Logout
                                    </Nav.Link>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </div>
    )
}

export default Header