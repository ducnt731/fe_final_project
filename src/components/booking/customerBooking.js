import React, { useEffect, useState } from "react";
import '../../style/booking.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from "react-router-dom";
import StepTwo from "./bookingSit";
import { fetchShowTimeByMovie } from "../../service/userService";

const Booking = () => {
    const { movieId } = useParams();
    const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with today's date
    const [showtimes, setShowtimes] = useState({});
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (movieId) {
            getAllShowTime(movieId);
        } else {
            console.error("movieId is undefined");
        }
    }, [selectedDate, movieId]); // Include movieId in the dependency array

    const getAllShowTime = async (movieId) => {
        try {
            const response = await fetchShowTimeByMovie(movieId);
            console.log(response)
            if (response && response.data) {
                setShowtimes(response.data);
            }
        } catch (error) {
            console.error('Error fetching showtimes:', error);
            setError(error);
        }
    };
    const formatDate = (date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };
    const todaysShowtimes = showtimes[formatDate(selectedDate)] || [];
    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    const filterTimesForToday = (times) => {
        const now = new Date();
        const currentTime = `${now.getHours()}:${now.getMinutes()}`;
        return times.filter(time => isToday(selectedDate) ? time >= currentTime : true);
    };
    const handleSelectTime = (session, time) => {
        const formattedDate = formatDate(selectedDate);
        console.log("name:", session.movie);
        console.log("cinema:", session.cinema);
        console.log("room:", session.room);
        console.log("selectedDate:", formattedDate);
        console.log("selectedTime:", time);
        console.log("movieId:", session.id);
        navigate(`/booking/bookingsit/${movieId}`, {
            state: {
                name: session.movie,
                cinema: session.cinema,
                room: session.room,
                selectedDate: formattedDate,
                selectedTime: time,
                movieId: movieId,
                showtimeId: session.id
            }
        });
    };
    const validShowtimes = todaysShowtimes.filter(session =>
        filterTimesForToday(session.times).length > 0
    );
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
                        minDate={new Date()}
                    />
                </div>
                <div className="booking-time">
                    {validShowtimes.length > 0 ? validShowtimes.map((session) => (
                        <div key={session.id} className="booking-item">
                            <div>{session.cinema}</div>
                            <div>Room: {session.room}</div>
                            <div className="buttonTime-container">
                                {filterTimesForToday(session.times).map(time => (
                                    <button key={`${session.id}-${time}`} className="buttonTime" onClick={() => handleSelectTime(session, time)}>
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )) : <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        color: 'green',
                        fontSize: '2.5em',
                        fontFamily: "Oswald , sans-serif"
                    }}>There are no available screenings.</div>}
                </div>
            </div>
        </div>

    )
}

export default Booking