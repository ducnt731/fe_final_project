import React, { useEffect, useState } from "react";
import '../../style/history.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { historyPurchase } from "../../service/userService";

const History = () => {
    const [dataPurchase, setDataPurchase] = useState([])
    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        const fetchhistoryPurchase = async () => {
            try {
                const response = await historyPurchase(userId);
                setDataPurchase(response.data)
            } catch (error) {
                console.error("Error saving booking info:", error);
            }
        };
        fetchhistoryPurchase();
    }, []);
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
                        defaultActiveKey="all"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="all" title="All Purchases">
                            {dataPurchase.map((purchase, index) => (
                                <div key={index} className="ticket-wrap">
                                    <div className="ticketLeft">
                                        <div className="cinemaName"><b>{purchase.showtime.cinema.name}</b></div>
                                        <div className="titleMovie">
                                            <div>{purchase.showtime.movie.name}</div>
                                            <div style={{ fontSize: "10px" }}>Movie's name</div>
                                        </div>
                                        <div className="titleMovie">
                                            <div>{purchase.time}</div>
                                            <div style={{ fontSize: "10px" }}>Time start</div>
                                        </div>

                                        <div className="bottomTicket">
                                            <div className="seat">
                                                <div>{purchase.showtime.room.name}</div>
                                                <div style={{ fontSize: "10px" }}>Room</div>
                                            </div>
                                            <div className="time">
                                                <div>{new Date(purchase.timeOfBooking).toLocaleDateString()}</div>
                                                <div style={{ fontSize: "10px" }}>Date</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ticketRight">
                                        <div style={{ backgroundColor: "red", height: "50px", borderTopRightRadius: "20px" }}></div>
                                        <div style={{ borderLeft: "3px black dashed", height: "75%" }}>
                                            <div className="price">
                                                <div>Seats</div>
                                                <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{purchase.seats}</div>
                                            </div>
                                            <div className="price">
                                                <div>Food</div>
                                                <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{purchase.food}</div>
                                            </div>
                                            <div className="price">
                                                <div>Total</div>
                                                <div>{purchase.totalPrice} $</div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default History