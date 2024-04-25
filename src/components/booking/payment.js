import React, { useState } from "react";
import '../../style/booking.css'
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

const Payment = () => {
    const [isShowPayment, setIsShowPayment] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="booking-container">
            <div className="booking-title">Step 4: Payment</div>
            <div className="booking-site">
                {<div className="payment">
                    <div className="qr-code">Scan QR code below to pay</div>
                    <img src="https://file.hstatic.net/1000259246/file/momo_grande.jpg" className="qr" />
                </div>}
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
                        <div className="price2">
                            <div>Combo name</div>
                            <div>90 000 VND</div>
                        </div>
                    </div>
                    <div className="buttonStep-container">
                        <div className="total">
                            <div>Total</div>
                            <div>145.000 VND</div>
                        </div>
                        <button className="buttonNext" onClick={() => navigate("/booking/bookingsit/bookingfood/payment")}>Confirm</button>
                        <button
                            className="buttonBack"
                            onClick={() => navigate("/booking/bookingsit/bookingfood")}
                        ><MdOutlineKeyboardBackspace /> Back</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Payment