import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { duplicateShowtime, fetchAllCinemaNotPagination, fetchAllMovieNotPagination, fetchAllRoomInCinema } from '../../service/userService';
import { formatDate } from '../../service/formatDate';
import Select from 'react-select';


const AddShowTime = (props) => {
    const { show, handleClose, handleAddNewShowTime } = props;
    const [selectedTime, setSelectedTime] = useState("")
    const [selectedRoom, setSelectedRoom] = useState("");
    // const [showPoster, setShowPoster] = useState();
    const [showTimeData, setshowTimeData] = useState({
        cinema: "",
        movie: "",
        room: "",
        dateStart: "",
        endDate: "",
        times: []
    });
    const [listCinema, setListCinema] = useState([]);
    const [listMovie, setListMovie] = useState([]);
    const [listRoom, setListRoom] = useState([]);
    const [existingShowtimes, setExistingShowtimes] = useState([]);

    const fetchShowtimes = async (cinema, room, startDate, endDate) => {
        if (showTimeData.cinema && showTimeData.room && showTimeData.startDate && showTimeData.endDate) {
            try {
                const response = await duplicateShowtime(cinema, room, startDate, endDate)
                console.log("API Response:", response.data);
                if (response && response.data) {
                    setExistingShowtimes(response.data);
                } else {
                    console.error("Fetching error");
                }
            } catch (error) {
                console.error("Fetching error:", error);

            }
        }
    };

    useEffect(() => {
        if (showTimeData.cinema && showTimeData.room && showTimeData.startDate && showTimeData.endDate) {
            fetchShowtimes(showTimeData.cinema, showTimeData.room, showTimeData.startDate, showTimeData.endDate);
        }
    }, [showTimeData.cinema, showTimeData.room, showTimeData.startDate, showTimeData.endDate]);

    const getAllCinema = async () => {
        let res = await fetchAllCinemaNotPagination();
        if (res) {
            setListCinema(res.data);
        }
    };
    const getAllMovie = async () => {
        let res = await fetchAllMovieNotPagination();
        if (res) {
            setListMovie(res.data)
        }
    };
    const getAllRoom = async (cinemaId) => {
        if (cinemaId) {
            let res = await fetchAllRoomInCinema(cinemaId);
            if (res && res.data) {
                setListRoom(res.data);
            } else {
                setListRoom([]); // Rỗng nếu không có phòng hoặc lỗi
            }
        } else {
            setListRoom([]); // Rỗng nếu không có rạp được chọn
        }
    };
    useEffect(() => {
        getAllCinema();
        getAllMovie();
    }, []);
    useEffect(() => {
        if (showTimeData.cinema) {
            getAllRoom(showTimeData.cinema);
        } else {
            setListRoom([]);
        }
    }, [showTimeData.cinema]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setshowTimeData({ ...showTimeData, [name]: value });
    };
    const timeOptions = [
        { value: '09:00-11:00', label: '09:00 - 11:00' },
        { value: '11:00-13:00', label: '11:00 - 13:00' },
        { value: '13:00-15:00', label: '13:00 - 15:00' },
        { value: '15:00-17:00', label: '15:00 - 17:00' },
        { value: '17:00-19:00', label: '17:00 - 19:00' },
        { value: '19:00-21:00', label: '19:00 - 21:00' },
        { value: '21:00-23:00', label: '21:00 - 23:00' },
        { value: '23:00 - 1:00', label: '23:00 - 1:00' }
    ];
    // Sự kiện khi thay đổi lựa chọn thời gian
    const handleTimeChange = (selectedOptions) => {
        // const times = selectedOptions.map(option => option.value);
        // setSelectedTime(times); // Cập nhật thời gian được chọn
        // setshowTimeData(prevData => ({ ...prevData, times })); // Cập nhật dữ liệu thời gian vào state
        const times = selectedOptions.map(option => option.value);
        const overlaps = times.some(time =>
            existingShowtimes.some(showtime =>
                showtime.times.includes(time) &&
                new Date(showtime.startDate) <= new Date(showTimeData.endDate) &&
                new Date(showtime.endDate) >= new Date(showTimeData.startDate)
            )
        );

        if (overlaps) {
            alert("One or more selected time slots overlap with available showtimes. Please choose another.");
            return;  // Ngừng cập nhật state nếu có trùng lặp
        }

        setSelectedTime(times);
        setshowTimeData(prevData => ({ ...prevData, times }));
    };




    return (
        <Modal show={show} onHide={handleClose} size='x' >
            <Modal.Header closeButton>
                <Modal.Title>New Movie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-add">
                    <select style={{ marginBottom: "1.5rem" }} className="form-select" required value={showTimeData.movie} name='movie' onChange={handleChange} >
                        <option style={{ backgroundColor: "white" }}>Choose Movie</option>
                        {listMovie && listMovie.map((movie) => {
                            return (
                                <option style={{ backgroundColor: "white" }} key={movie._id} value={movie._id}>{movie.name}</option>
                            )
                        })}
                    </select>
                    <select style={{ marginBottom: "1.5rem" }} className="form-select" required value={showTimeData.cinema} name='cinema' onChange={handleChange} >
                        <option style={{ backgroundColor: "white" }}>Choose Cinema</option>
                        {listCinema && listCinema.map((cinema) => {
                            return (
                                <option style={{ backgroundColor: "white" }} key={cinema._id} value={cinema._id}>{cinema.name}</option>
                            )
                        })}
                    </select>
                    <select style={{ marginBottom: "1.5rem" }} className="form-select" required value={showTimeData.room} name='room' onChange={handleChange} >
                        <option style={{ backgroundColor: "white" }}>Choose Room</option>
                        {listRoom && listRoom.map((room) => {
                            return (
                                <option style={{ backgroundColor: "white" }} key={room._id} value={room._id}>{room.name}</option>
                            )
                        })}
                    </select>
                    {/* <div className="mb-3">
                        <label className="form-label">Select Rooms</label>
                        <Select
                            isMulti
                            name="rooms"
                            options={listRoom && listRoom.length > 0 ? listRoom.map(room => ({ value: room._id, label: room.name })) : []}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleRoomChange}
                            value={showTimeData.rooms && showTimeData.rooms.map(roomId => ({
                                value: roomId,
                                label: (listRoom.find(room => room._id === roomId) || {}).name || 'Room not found'
                            }))}
                            closeMenuOnSelect={false}
                        />
                    </div> */}
                    <div className="mb-3">
                        <label className="form-label">Start Date</label>
                        <input type="date" required name='startDate' className="form-control" value={showTimeData.startDate && formatDate(new Date(showTimeData.startDate))} onChange={handleChange} min={formatDate(new Date())} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">End Date</label>
                        {/* <input type="date" required name='endDate' className="form-control" value={showTimeData.endDate && formatDate(new Date(showTimeData.endDate))} onChange={handleChange} /> */}
                        <input type="date" required name='endDate' className="form-control" value={showTimeData.endDate && formatDate(new Date(showTimeData.endDate))} onChange={handleChange} min={showTimeData.startDate ? formatDate(new Date(showTimeData.startDate)) : ''} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Select Times</label>
                        {/* <Select
                            isMulti
                            name="times"
                            options={timeOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleTimeChange}
                            value={timeOptions.filter(option => showTimeData.times.includes(option.value))}
                            closeMenuOnSelect={false}
                            isOptionDisabled={(option) => existingShowtimes.some(showtime =>
                                showtime.times.includes(option.value) &&
                                new Date(showtime.startDate) <= new Date(showTimeData.endDate) &&
                                new Date(showtime.endDate) >= new Date(showTimeData.startDate)
                            )}
                        /> */}
                        <Select
                            isMulti
                            name="times"
                            options={timeOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleTimeChange}
                            value={timeOptions.filter(option => showTimeData.times.includes(option.value))}
                            closeMenuOnSelect={false}
                            isOptionDisabled={(option) => Array.isArray(existingShowtimes) && existingShowtimes.some(showtime =>
                                showtime.times.includes(option.value) &&
                                new Date(showtime.startDate) <= new Date(showTimeData.endDate) &&
                                new Date(showtime.endDate) >= new Date(showTimeData.startDate)
                            )}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleAddNewShowTime(showTimeData)}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddShowTime;