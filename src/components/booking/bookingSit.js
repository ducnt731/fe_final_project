import React, { useState } from "react";
import '../../style/booking.css'
import { MdChair, MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BookingSit = () => {

    const icons = Array.from({ length: 48 }, (_, index) => index + 1) // Tạo một mảng chứa 70 icon giống nhau
    const iconsVip = Array.from({ length: 24 }, (_, index) => index + 1)
    const [isShowButton, setIsShowButton] = useState(false)
    const [isShowPrice, setIsShowPrice] = useState(false)
    const navigate = useNavigate()

    const handleClick = () => {
        setIsShowButton(true)
        setIsShowPrice(true)
    }

    return (
        <div className="booking-container">
            <div className="booking-title">Step 2: Choose seat</div>
            <div className="booking-site">
                <div className="booking-sit">
                    <div className="curve"><h5 style={{ textAlign: "center", paddingTop: "10px" }}>Screen</h5></div>
                    <div className="sit-container">
                        <div className="sit">
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(12, 30px)",
                                gap: "15px",
                                fontSize: "30px"
                            }}>
                                {icons.map((icon, index) => (
                                    <div key={index} className="icon-chair">

                                        {/* Đây là nơi để chèn icon */}
                                        <MdChair onClick={handleClick} />
                                    </div>
                                ))}
                                {iconsVip.map((icon, index) => (
                                    <div key={index} className="icon-chair">
                                        {/* Đây là nơi để chèn icon */}
                                        <MdChair style={{ color: "yellow" }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="sit-guide">
                            <div style={{ marginRight: "10px" }}><MdChair style={{ color: "red" }} /> Ghe da ban</div>
                            <div style={{ marginRight: "10px" }}><MdChair /> Ghe chua ban</div>
                            <div style={{ marginRight: "10px" }}><MdChair style={{ color: "green" }} /> Ghe dang chon</div>
                            <div><MdChair style={{ color: "yellow" }} /> Ghe vip</div>
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
                        {isShowPrice && <div className="price">
                            <div>1 x vip - C1</div>
                            <div>65.000 VND</div>
                        </div>}
                    </div>
                    <div className="buttonStep-container">
                        {isShowPrice && <div className="total">
                            <div>Total</div>
                            <div>145.000 VND</div>
                        </div>}                            
                        {isShowButton && <button className="buttonNext" onClick={() => navigate("/booking/bookingsit/bookingfood")}>Next step</button>}
                        <button
                            className="buttonBack"
                            onClick={() => navigate("/booking")}
                        ><MdOutlineKeyboardBackspace /> Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingSit