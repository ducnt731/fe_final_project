import React, { useEffect, useState } from "react";
import '../../style/booking.css'
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { paymentPaypal } from "../../service/userService";
import axios from 'axios';

const Payment = () => {
    const [isShowPayment, setIsShowPayment] = useState(false)
    const navigate = useNavigate()

    const locationState = useLocation().state;
    const name = locationState ? locationState.name : '';
    const cinema = locationState ? locationState.cinema : '';
    const room = locationState ? locationState.room : '';
    const selectedDate = locationState ? locationState.selectedDate : '';
    const selectedTime = locationState ? locationState.selectedTime : '';
    const selectedMovie = locationState ? locationState.selectedMovie : '';
    const selectedSeats = locationState ? locationState.selectedSeats : [];
    const totalNormalPrice = locationState ? locationState.totalNormalPrice : 0;
    const totalVipPrice = locationState ? locationState.totalVipPrice : 0;
    const food = locationState ? locationState.food : [];
    const foodValues = locationState ? locationState.foodValues : [];
    const showtimeId = locationState ? locationState.showtimeId : '';
    const seats = locationState ? locationState.selectedSeats : [];
    const countdownFromPreviousScreen = locationState ? locationState.countdown : 300;

    const toltalPiceSeat = totalNormalPrice + totalVipPrice;
    const totalFoodPrice = food.reduce((total, item, index) => {
        return total + item.price * foodValues[index];
    }, 0);
    const total = toltalPiceSeat + totalFoodPrice;
    const formattedTotal = parseFloat(toltalPiceSeat + totalFoodPrice).toFixed(2);
    console.log("Tiền", formattedTotal)
    const [countdown, setCountdown] = useState(countdownFromPreviousScreen);
    const [isTimeExpired, setIsTimeExpired] = useState(false);
    useEffect(() => {
        if (countdown > 0) {
            const interval = setInterval(() => {
                setCountdown(current => {
                    if (current <= 1) {
                        clearInterval(interval); // Dừng interval khi đếm đến 1
                        setIsTimeExpired(true);  // Cập nhật trạng thái thời gian hết
                        return 0; // Đặt giá trị đếm ngược là 0 để tránh âm
                    }
                    return current - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        } else if (countdown <= 0) {
            // Để đảm bảo rằng không bao giờ hiển thị giá trị âm nếu countdown được thiết lập nhỏ hơn 0 ban đầu
            setCountdown(0);
            setIsTimeExpired(true);
        }
    }, [countdown]);

    useEffect(() => {
        if (countdown > 0) {
            const interval = setInterval(() => {
                setCountdown(current => {
                    if (current <= 1) {
                        // Xử lý hết giờ tại đây, ví dụ thông báo hoặc chuyển trang
                    }
                    return current - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [countdown]);
    const handlePayment = async () => {
        const formattedTotal = (parseFloat(total).toFixed(2)).toString();
        const paymentData = {
            name: name,
            cinema: cinema,
            room: room,
            showtimeId: showtimeId,
            selectedDate: selectedDate,
            selectedTime: selectedTime,
            selectedMovie: selectedMovie,
            selectedSeats: selectedSeats,
            total: formattedTotal,
            currency: 'USD'
        };
        console.log("Initial payment data:", paymentData);
        localStorage.setItem('paymentData', JSON.stringify(paymentData));

        console.log("Stored in localStorage:", localStorage.getItem('paymentData'));
        try {
            const response = await axios.post('http://localhost:3000/create-payment', paymentData);
            const approvalUrl = response.data.approvalUrl; // Now just a URL, not a redirect
            console.log("Approval URL:", approvalUrl);
            window.location.href = approvalUrl; // Redirect to PayPal approval URL
            console.log("Redirected to PayPal", approvalUrl);
        } catch (error) {
            console.error('Error creating payment:', error);
        }
    };
    const handleGoHome = () => {
        localStorage.removeItem('seatHoldSaved');
        navigate("/");
    };
    return (
        <div className="booking-container">
            <div className="booking-title">Step 4: Payment</div>
            <div className="booking-site">
                {/* <div className="payment">
                    <div className="qr-code">Choose payment method</div>
                    <img src="https://file.hstatic.net/1000259246/file/momo_grande.jpg" className="qr" />
                </div> */}
                <div className="total-price" style={{ width: "50%" }}>
                    <div className="nameRoom">
                        <div style={{ fontWeight: "bold", fontSize: "1.2em", color: "#72be43" }}>{cinema}</div>
                        <div> <span style={{ color: "#72be43" }}>Room:</span> {room} -
                            <span style={{ color: "#ff0000" }}> Date:</span> {selectedDate} -
                            <span style={{ color: "#007bff" }}> Time:</span> {selectedTime}</div>
                    </div>
                    <div className="nameMovie">
                        <div style={{ fontWeight: "bold", fontSize: "1.6em", color: "#72be43" }}>{name}</div>
                        <div> <span style={{ color: "#72be43" }}>Seats: </span> {selectedSeats.join(', ')}</div>
                        <div className="price1">
                            <div>Total price seats: </div>
                            <div>{toltalPiceSeat} $</div>
                        </div>
                        <div className="price2">
                            <div >Combo price:</div>
                            <div >{totalFoodPrice} $</div>
                        </div>
                    </div>
                    <div className="buttonStep-container">
                        <div className="total">
                            <div style={{ fontWeight: "bold", fontSize: "1.6em", color: "#72be43" }}>Total price:</div>
                            <div style={{ fontWeight: "bold", fontSize: "1.6em", color: "#fff" }}>{total} $</div>
                        </div>
                        {!isTimeExpired ? (
                            <>
                                <button className="buttonNext" onClick={handlePayment}>Pay</button>
                                <button
                                    className="buttonBack"
                                    onClick={() => navigate("/booking/bookingsit/bookingfood")}
                                ><MdOutlineKeyboardBackspace /> Back</button>
                            </>
                        ) : (
                            <div style={{
                                textAlign: 'center',
                                fontSize: '24px',
                                margin: '20px 0'
                            }}>
                                <p>Booking time has ended!</p>
                                <button className="buttonHome" onClick={handleGoHome}>Go Home</button>
                            </div>
                        )}
                    </div>
                    <div className="countdown">
                        <div className="munite">{Math.floor(countdown / 60)}</div>
                        <div style={{ display: "flex", alignItems: "center" }}>:</div>
                        <div className="second">{String(countdown % 60).padStart(2, '0')}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment