import React from "react";
import '../../style/history.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const History = () => {
    return (
        <div className="history-container">
            <div className="history-tabs">
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    borderBottom: "1px white solid",
                }}>
                    <div className="history-title">History purchase</div>
                </div>
                <div style={{
                    marginTop: "20px",
                }}>
                    <Tabs
                        defaultActiveKey="watched"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="watched" title="Watched">
                            <div className="ticket-wrap">
                                <div className="ticketLeft">
                                    <div className="cinemaName"><b>DC Cinema</b></div>
                                    <div className="titleMovie">
                                        <div>Game of thrones</div>
                                        <div style={{ fontSize: "10px" }}>Movie's name</div>
                                    </div>
                                    <div className="directorName">
                                        <div>Rose Glass</div>
                                        <div style={{ fontSize: "10px" }} >Director's name</div>
                                    </div>
                                    <div className="bottomTicket">
                                        <div className="seat">
                                            <div>A10 - Standar</div>
                                            <div style={{ fontSize: "10px" }}>Seat</div>
                                        </div>
                                        <div className="time">
                                            <div>9:00 a.m</div>
                                            <div style={{ fontSize: "10px" }}>Time</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ticketRight">
                                    <div style={{ backgroundColor: "red", height: "50px", borderTopRightRadius: "20px" }}></div>
                                    <div style={{ borderLeft: "3px black dashed", height: "75%" }}>
                                        <div className="price">
                                            <div>Combo food x 1</div>
                                            <div>90 000 VND</div>
                                        </div>
                                        <div className="price">
                                            <div>Ticket price</div>
                                            <div>65 000 VND</div>
                                        </div>
                                        <div className="price">
                                            <div>Total</div>
                                            <div>145 000 VND</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="unwatched" title="Unwatched">
                            <div className="ticket-wrap">
                                <div className="ticketLeft">
                                    <div className="cinemaName"><b>DC Cinema</b></div>
                                    <div className="titleMovie">
                                        <div>Game of thrones</div>
                                        <div style={{ fontSize: "10px" }}>Movie's name</div>
                                    </div>
                                    <div className="directorName">
                                        <div>Rose Glass</div>
                                        <div style={{ fontSize: "10px" }} >Director's name</div>
                                    </div>
                                    <div className="bottomTicket">
                                        <div className="seat">
                                            <div>A10 - Standar</div>
                                            <div style={{ fontSize: "10px" }}>Seat</div>
                                        </div>
                                        <div className="time">
                                            <div>9:00 a.m</div>
                                            <div style={{ fontSize: "10px" }}>Time</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ticketRight">
                                    <div style={{ backgroundColor: "red", height: "50px", borderTopRightRadius: "20px" }}></div>
                                    <div style={{ borderLeft: "3px black dashed", height: "75%" }}>
                                        <div className="price">
                                            <div>Combo food x 1</div>
                                            <div>90 000 VND</div>
                                        </div>
                                        <div className="price">
                                            <div>Ticket price</div>
                                            <div>65 000 VND</div>
                                        </div>
                                        <div className="price">
                                            <div>Total</div>
                                            <div>145 000 VND</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default History