import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { fetchAllShowTimeDaily } from "../../service/userService";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const calculateStartDate = (index) => {
    // Get today's date and remove the time part
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate the start date for the current view based on the index
    const startDate = new Date(today);
    startDate.setDate(today.getDate() + (index * 7));
    return startDate;
};


const ShowTimeSchedule = () => {
    const [listShowTime, setListShowTime] = useState([]);
    const [selectedCinema, setSelectedCinema] = useState(null);
    const [currentDateIndex, setCurrentDateIndex] = useState(0);
    const [cinemaList, setCinemaList] = useState([]);
    const [filteredShowTime, setFilteredShowTime] = useState([]);
    const startDate = calculateStartDate(currentDateIndex);

    const getAllShowTimeDaily = async () => {
        try {
            const response = await fetchAllShowTimeDaily();
            console.log('API Data:', response); // Log to check the response
            if (response && response.data) {
                const formattedData = formatDataForDisplay(response.data);
                setListShowTime(formattedData);
                console.log('Formatted Data:', formattedData); // Log to check formatted data
                // Extract cinema list
                const cinemas = [...new Set(formattedData.map(show => show.cinema))];
                setCinemaList(cinemas);
                if (cinemas.length > 0) {
                    setSelectedCinema(cinemas[0]); // Select the first cinema by default
                    const filtered = formattedData.filter(show => show.cinema === cinemas[0]);
                    setFilteredShowTime(filtered);
                }
            } else {
                setListShowTime([]);
            }
        } catch (error) {
            console.error('Error fetching show times:', error);
            setListShowTime([]);
        }
    };

    useEffect(() => {
        getAllShowTimeDaily();
    }, []);
    useEffect(() => {
        // Cập nhật filteredShowTime sau khi listShowTime thay đổi
        const filtered = listShowTime.filter(show => show.cinema === selectedCinema);
        setFilteredShowTime(filtered);
    }, [listShowTime, selectedCinema]);

    const formatTime = (time) => {
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours, 10);
        const minute = parseInt(minutes, 10);
        return `${hour}:${minute < 10 ? '0' : ''}${minute}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Format to match the keys in listShowTime object (YYYY-MM-DD)
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const getTimeSlot = (time) => {
        if (!time) return '';

        const [hours] = time.split(':').map(Number);
        if (hours >= 6 && hours < 12) return 'Morning'; // 6:00 - 11:59
        if (hours >= 12 && hours < 18) return 'Afternoon'; // 12:00 - 17:59
        return 'Evening'; // 18:00 - 5:59
    };

    const formatDataForDisplay = (data) => {
        const formattedData = [];

        // Iterate through each date in the response data
        for (const date in data) {
            // Iterate through each movie showing on the current date
            data[date].forEach(show => {
                // Iterate through each time slot for the current movie
                show.times.forEach(time => {
                    // Determine the time slot (morning, afternoon, or evening) for the current time
                    const slot = getTimeSlot(time);

                    // Add the current movie to the formattedData array
                    formattedData.push({ ...show, time, slot, date });
                });
            });
        }

        return formattedData;
    };

    // Generate the array of dates for the current week view
    const dates = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        return date;
    });

    const handlePrevDate = () => {
        setCurrentDateIndex(currentDateIndex - 1);
    };

    const handleNextDate = () => {
        setCurrentDateIndex(currentDateIndex + 1);
    };

    const handleCinemaSelect = (eventKey, event) => {
        setSelectedCinema(eventKey);
        const filtered = listShowTime.filter(show => show.cinema === eventKey);
        setFilteredShowTime(filtered);
    };



    return (
        <div className="account-container">
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", marginLeft: "18px" }}>
                <div>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title={selectedCinema || 'Select Cinema'}
                        onSelect={handleCinemaSelect}
                    >
                        {cinemaList.map((cinema, index) => (
                            <Dropdown.Item key={index} eventKey={cinema}>
                                {cinema}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
                <div className="account-container" style={{ marginRight: "20px" }} >
                    <Button onClick={handlePrevDate} className="mr-2">Previous Week</Button>
                    <Button style={{ marginLeft: "10px" }} onClick={handleNextDate}>Next Week</Button>
                    <a style={{ marginLeft: "10px" }} href="/admin/manage_time_show" className="btn btn-primary">Back</a>
                </div>
            </div>
            <div className="table-account" style={{ backgroundColor: "white", borderRadius: "10px", marginTop: "10px", boxShadow: "0 0 0px #b8bec4", padding: "5px" }}>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "left", verticalAlign: "middle" }}>Day</th>
                            {dates.map(date => (
                                <th style={{}} key={date.toISOString()}>
                                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()]}
                                    <br />
                                    ({formatDate(date.toISOString().split('T')[0])})
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {['Morning', 'Afternoon', 'Evening'].map((slot, index) => (
                            <tr key={slot}>
                                <td style={{}}><strong>{slot}</strong></td>
                                {dates.map(date => {
                                    const formattedDate = formatDate(date.toISOString().split('T')[0]);
                                    return (
                                        <td key={`${formattedDate}-${slot}`}>
                                            {filteredShowTime
                                                .filter(show => show.date === formattedDate && show.slot === slot)
                                                .map((show, showIndex) => (
                                                    <div style={{ borderRadius: "10px", marginTop: "10px", backgroundColor: "#fefefe", boxShadow: "0 0 10px #b8bec4", padding: "5px" }} key={showIndex}>
                                                        <span><strong>Movie:</strong> {show.movie}</span><br />
                                                        <span><strong>Room:</strong> {show.room}</span><br />
                                                        <span><strong>Showtime:</strong> {formatTime(show.time)} h</span>
                                                        {/* {show.times.map((time, timeIndex) => (
                                                            <div key={timeIndex}><strong>Time:</strong> {time}</div>
                                                        ))} */}
                                                    </div>
                                                ))
                                            }
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div >
    );
};

export default ShowTimeSchedule;
