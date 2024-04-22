import React, { useState } from "react";
import '../../style/booking.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from "react-router-dom";
import StepTwo from "./bookingSit";

const Booking = () => {

    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate()

    return (
        <div className="booking-container">
            <div className="booking-title">Step 1: Choose location and time</div>
            <div className="booking-site">
                <div className="booking-date">
                    <DatePicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat="MMMM d, yyyy"
                        inline
                    />
                </div>
                <div className="booking-time">
                    <div className="booking-item">
                        <div>CGV lieu giai</div>
                        <div>dia chi</div>
                        <div className="buttonTime-container">
                            <button
                                className="buttonTime"
                                onClick={() => navigate("/booking/bookingsit")}
                            >9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                        </div>
                    </div>
                    <div className="booking-item">
                        <div>CGV lieu giai</div>
                        <div>dia chi</div>
                        <div className="buttonTime-container">
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                        </div>
                    </div>
                    <div className="booking-item">
                        <div>CGV lieu giai</div>
                        <div>dia chi</div>
                        <div className="buttonTime-container">
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                        </div>
                    </div>
                    <div className="booking-item">
                        <div>CGV lieu giai</div>
                        <div>dia chi</div>
                        <div className="buttonTime-container">
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                            <button className="buttonTime">9h a.m</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Booking