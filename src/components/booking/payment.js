import React, { useState } from "react";
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

    const toltalPiceSeat = totalNormalPrice + totalVipPrice;
    const totalFoodPrice = food.reduce((total, item, index) => {
        return total + item.price * foodValues[index];
    }, 0);
    const total = toltalPiceSeat + totalFoodPrice;
    console.log("object", seats)

    const handlePayment = async () => {
        const paymentData = {
            name: name,
            cinema: cinema,
            room: room,
            showtimeId: showtimeId,
            selectedDate: selectedDate,
            selectedTime: selectedTime,
            selectedMovie: selectedMovie,
            selectedSeats: selectedSeats,
            total: total,
            currency: 'VND'
        };
        console.log("Initial payment data:", paymentData);
        localStorage.setItem('paymentData', JSON.stringify(paymentData));
        console.log("Stored in localStorage:", localStorage.getItem('paymentData'));
        try {

            const rateResponse = await axios.get('https://api.exchangerate-api.com/v4/latest/VND');
            const rate = rateResponse.data.rates.USD;
            console.log("rate", rate)

            // Convert VND to USD
            const totalUSD = (total * rate).toFixed(2); // Ensure conversion is accurate
            console.log("USD", totalUSD)

            // Update payment data with converted USD total
            paymentData.total = totalUSD;
            paymentData.currency = 'USD';

            const response = await axios.post('https://dc-cinema.onrender.com/create-payment', paymentData);


            const approvalUrl = response.data.approvalUrl; // Now just a URL, not a redirect
            console.log("Approval URL:", approvalUrl);
            window.location.href = approvalUrl; // Redirect to PayPal approval URL

        } catch (error) {
            console.error('Error creating payment:', error);
        }
    };

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
                        <div style={{ fontWeight: "bold", fontSize: "1.2em", color: "#72be43" }}>{cinema}</div>
                        <div> <span style={{ color: "#72be43" }}>Room:</span> {room} -
                            <span style={{ color: "#ff0000" }}> Date:</span> {selectedDate} -
                            <span style={{ color: "#007bff" }}> Time:</span> {selectedTime}</div>
                    </div>
                    <div className="nameMovie">
                        <div style={{ fontWeight: "bold", fontSize: "1.6em", color: "#72be43" }}>{name}</div>
                        <div> <span style={{ color: "#72be43" }}>Seats: </span> {selectedSeats.join(', ')}</div>
                        <div className="price">
                            <div>Total price seats: </div>
                            <div>{toltalPiceSeat} VND</div>
                        </div>
                        <div className="price2">
                            <div >Combo name</div>
                            <div >{totalFoodPrice} VND</div>
                        </div>
                    </div>
                    <div className="buttonStep-container">
                        <div className="total">
                            <div style={{ fontWeight: "bold", fontSize: "1.6em", color: "#72be43" }}>Total price:</div>
                            <div style={{ fontWeight: "bold", fontSize: "1.6em", color: "#ff0000" }}>{total} VND</div>
                        </div>
                        <button className="buttonNext" onClick={handlePayment}>Pay</button>

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