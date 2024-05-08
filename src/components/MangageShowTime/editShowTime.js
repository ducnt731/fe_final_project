import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { fetchAllCinema, fetchAllMovie, fetchAllRoom } from '../../service/userService';
import { formatDate } from '../../service/formatDate';
import Select from 'react-select';


const EditShowTime = (props) => {
    const { show, handleClose, handleEditShowTime, dataEditShowTime } = props;
    const [selectedTime, setSelectedTime] = useState("")
    const [showTimeData, setshowTimeData] = useState({
        id: "",
        movie: "",
        cinema: "",
        room: "",
        startDate: "",
        endDate: "",
        times: [],
    });
    const [listCinema, setListCinema] = useState([]);
    const [listMovie, setListMovie] = useState([]);
    const [listRoom, setListRoom] = useState([]);

    useEffect(() => {
        if (dataEditShowTime) {
            setshowTimeData(dataEditShowTime);
        }
    }, [dataEditShowTime]);

    // const getAllCinema = async () => {
    //     let res = await fetchAllCinema();
    //     if (res) {
    //         setListCinema(res.data);
    //     }
    // };
    useEffect(() => {
        if (dataEditShowTime && dataEditShowTime.movie) {
            const fetchMovie = async () => {
                try {
                    const response = await fetchAllMovie();
                    if (response && response.data) {
                        // Tìm kiếm phim dựa trên ID
                        const movie = response.data.find(movie => movie._id === dataEditShowTime.movie._id);
                        // console.log("response.data:", response.data);
                        // console.log("dataEditShowTime.movie._id:", dataEditShowTime.movie._id);
                        // console.log("Found movie:", movie);

                        if (movie) {
                            // Cập nhật state nếu tìm thấy phim
                            setshowTimeData(prevData => ({ ...prevData, movie: movie._id }));
                        }
                    }
                    // Luôn lưu trữ danh sách phim để sử dụng sau này
                    setListMovie(response.data || []);
                } catch (error) {
                    console.error("Error fetching movies:", error);
                }
            };
            fetchMovie();
        }
    }, [dataEditShowTime]);

    useEffect(() => {
        if (dataEditShowTime && dataEditShowTime.cinema) {
            const fetchCinema = async () => {
                try {
                    const response = await fetchAllCinema();
                    if (response && response.data) {
                        const cinema = response.data.find(cinema => cinema._id === dataEditShowTime.cinema._id);  // Sửa ở đây
                        console.log("response.data:", response.data);
                        console.log("dataEditShowTime.movie._id:", dataEditShowTime.cinema._id);
                        console.log("Found cinema:", cinema);

                        if (cinema) {
                            setshowTimeData(prevData => ({ ...prevData, cinema: cinema._id }));
                        }
                    }
                    setListCinema(response.data || []);
                } catch (error) {
                    console.error("Error fetching cinemas:", error);
                }
            };
            fetchCinema();
        }
    }, [dataEditShowTime]);

    useEffect(() => {
        if (dataEditShowTime && dataEditShowTime.room) {
            const fetchRoom = async () => {
                try {
                    const response = await fetchAllRoom();
                    if (response && response.data) {
                        // Tìm kiếm phim dựa trên ID
                        const room = response.data.find(room => room._id === dataEditShowTime.room._id);
                        console.log("response.data:", response.data);
                        console.log("dataEditShowTime.movie._id:", dataEditShowTime.room._id);
                        console.log("Found cinema:", room);

                        if (room) {
                            // Cập nhật state nếu tìm thấy phim
                            setshowTimeData(prevData => ({ ...prevData, room: room._id }));
                        }
                    }
                    // Luôn lưu trữ danh sách phim để sử dụng sau này
                    setListRoom(response.data || []);
                } catch (error) {
                    console.error("Error fetching movies:", error);
                }
            };
            fetchRoom();
        }
    }, [dataEditShowTime]);

    useEffect(() => {
        if (dataEditShowTime) {
            setshowTimeData(dataEditShowTime);
            // Đặt giá trị ban đầu cho selectedTime dựa trên dataEditShowTime.times
            if (dataEditShowTime.times && dataEditShowTime.times.length > 0) {
                setSelectedTime(dataEditShowTime.times);
            } else {
                setSelectedTime([]);  // Nếu không có times, đặt mảng rỗng
            }
        }
    }, [dataEditShowTime]);

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
        const times = selectedOptions.map(option => option.value);
        setSelectedTime(times); // Cập nhật thời gian được chọn
        setshowTimeData(prevData => ({ ...prevData, times: times })); // Cập nhật dữ liệu thời gian vào state
    };

    return (
        <Modal show={show} onHide={handleClose} size='x' >
            <Modal.Header closeButton>
                <Modal.Title>Edit Show Time</Modal.Title>
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
                    <div className="mb-3">
                        <label className="form-label">Start Date</label>
                        <input type="date" required name='startDate' className="form-control" value={showTimeData.startDate && formatDate(new Date(showTimeData.startDate))} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">End Date</label>
                        <input type="date" required name='endDate' className="form-control" value={showTimeData.endDate && formatDate(new Date(showTimeData.endDate))} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Select Times</label>
                        <Select
                            isMulti
                            name="times"
                            options={timeOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={handleTimeChange}
                            value={timeOptions.filter(option => selectedTime.includes(option.value))}
                            closeMenuOnSelect={false}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleEditShowTime(showTimeData)}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditShowTime;