import React, { useState } from "react";
import '../../style/booking.css'
import { FaCircleMinus } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BookingFood = () => {

    const [isShowPrice, setIsShowPrice] = useState(false)
    const navigate = useNavigate()

    // Khởi tạo state để lưu trữ giá trị trong box
    const [value, setValue] = useState(0);

    // Hàm xử lý sự kiện khi nhấn nút cộng
    const handleIncrement = () => {
        setValue(value + 1);
        setIsShowPrice(true)
    };

    // Hàm xử lý sự kiện khi nhấn nút trừ
    const handleDecrement = () => {
        if (value > 0) {
            setValue(value - 1);
        }
    };

    return (
        <div className="booking-container">
            <div className="booking-title">Step 3: Choose food and drink</div>
            <div className="booking-site">
                <div className="booking-food">
                    <div style={{
                        padding: "20px",
                        borderBottom: "1px white solid",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <div style={{
                            width: "10%",
                            border: "1px white solid",
                            padding: "10px",
                            textAlign: "center",
                            borderRadius: "5px"
                        }}>Combo</div>
                    </div>
                    <div className="food-combo">
                        <div className="combo">
                            <img src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/gia-bap-nuoc-cgv-1.jpg" />
                            <div style={{
                                width: "100%",
                                marginLeft: "10px"
                            }}>
                                <div>combo name</div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    marginTop: "45px"
                                }}>
                                    <div style={{
                                        width: "10%",
                                        height: "10%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <FaCircleMinus onClick={handleDecrement} disabled={value === 0} />
                                        <div className="counter-box">{value}</div>
                                        <FaPlusCircle onClick={handleIncrement} style={{ color: "#72be43" }} />
                                    </div>
                                    <div>90 000 VND</div>
                                </div>
                            </div>
                        </div>
                        <div className="combo">
                            {/* <img src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/gia-bap-nuoc-cgv-1.jpg" />
                            <div style={{
                                width: "100%",
                                marginLeft: "10px"
                            }}>
                                <div>combo name</div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    marginTop: "45px"
                                }}>
                                    <div style={{
                                        width: "10%",
                                        height: "10%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <FaCircleMinus onClick={handleDecrement} disabled={value === 0} />
                                        <div className="counter-box">{value}</div>
                                        <FaPlusCircle onClick={handleIncrement} style={{ color: "#72be43" }} />
                                    </div>
                                    <div>90 000 VND</div>
                                </div>
                            </div> */}
                        </div>
                        <div className="combo">
                            {/* <img src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/gia-bap-nuoc-cgv-1.jpg" />
                            <div style={{
                                width: "100%",
                                marginLeft: "10px"
                            }}>
                                <div>combo name</div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    marginTop: "45px"
                                }}>
                                    <div style={{
                                        width: "10%",
                                        height: "10%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <FaCircleMinus onClick={handleDecrement} disabled={value === 0} />
                                        <div className="counter-box">{value}</div>
                                        <FaPlusCircle onClick={handleIncrement} style={{ color: "#72be43" }} />
                                    </div>
                                    <div>90 000 VND</div>
                                </div>
                            </div> */}
                        </div>
                        <div className="combo">
                            {/* <img src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/gia-bap-nuoc-cgv-1.jpg" />
                            <div style={{
                                width: "100%",
                                marginLeft: "10px"
                            }}>
                                <div>combo name</div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    marginTop: "45px"
                                }}>
                                    <div style={{
                                        width: "10%",
                                        height: "10%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between""
                                    }}>
                                        <FaCircleMinus onClick={handleDecrement} disabled={value === 0} />
                                        <div className="counter-box">{value}</div>
                                        <FaPlusCircle onClick={handleIncrement} style={{ color: "#72be43" }} />
                                    </div>
                                    <div>90 000 VND</div>
                                </div>
                            </div> */}
                        </div>
                        <div className="combo">
                            {/* <img src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/gia-bap-nuoc-cgv-1.jpg" />
                            <div style={{
                                width: "100%",
                                marginLeft: "10px"
                            }}>
                                <div>combo name</div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    marginTop: "45px"
                                }}>
                                    <div style={{
                                        width: "10%",
                                        height: "10%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <FaCircleMinus onClick={handleDecrement} disabled={value === 0} />
                                        <div className="counter-box">{value}</div>
                                        <FaPlusCircle onClick={handleIncrement} style={{ color: "#72be43" }} />
                                    </div>
                                    <div>90 000 VND</div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="total-price">
                    <div className="nameRoom">
                        <div>CGV Leu Giai</div>
                        <div>Room? - Ngay dat ve - Thoi gian</div>
                    </div>
                    <div className="nameMovie">
                        <div>Movie name</div>
                        <div>phu de - thoi gian chieu</div>
                        <div className="price">
                            <div>1 x vip - C1</div>
                            <div>65.000 VND</div>
                        </div>
                        {isShowPrice && <div className="price2">
                            <div>Combo name</div>
                            <div>90 000</div>
                        </div>}
                    </div>
                    <div className="buttonStep-container">
                        <div className="total">
                            <div>Total</div>
                            <div>145.000 VND</div>
                        </div>
                        <button
                            className="buttonNext"
                            onClick={() => navigate("/booking/bookingsit/bookingfood/payment")}>Next step</button>
                        <button
                            className="buttonBack"
                            onClick={() => navigate("/booking/bookingsit")}
                        ><MdOutlineKeyboardBackspace /> Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingFood