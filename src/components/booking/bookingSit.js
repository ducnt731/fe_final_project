import React, { useEffect, useState } from "react";
import '../../style/booking.css'
import { MdChair, MdOutlineKeyboardBackspace } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAllSeatPrice, fetchAllSeatStatus, seatHoldStatus } from "../../service/userService";



const BookingSit = () => {

    const rows = ['A', 'B', 'C', 'D', 'E', 'F']; // Các hàng từ A đến E
    const seatsPerRow = 12;

    const icons = Array.from({ length: 48 }, (_, index) => index + 1) // Tạo một mảng chứa 70 icon giống nhau
    const iconsVip = Array.from({ length: 24 }, (_, index) => index + 1)
    const [selectedSeatNor, setSelectedSeatNor] = useState(Array(icons.length).fill(false));
    const [selectedSeatVip, setSelectedSeatVip] = useState(Array(iconsVip.length).fill(false));
    const [countdown, setCountdown] = useState();
    const [isShowButton, setIsShowButton] = useState(false)
    const [isShowPrice, setIsShowPrice] = useState(false)
    const [normalSeatPrice, setNormalSeatPrice] = useState(0);
    const [vipSeatPrice, setVipSeatPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalNormalPrice, setTotalNormalPrice] = useState(0);
    const [totalVipPrice, setTotalVipPrice] = useState(0);
    const navigate = useNavigate();
    const [selectedSeats, setSelectedSeats] = useState([]); // Thêm trạng thái này để lưu trữ các ghế đã chọn
    const [countdownStarted, setCountdownStarted] = useState(false);

    const [bookedSeats, setBookedSeats] = useState([]);
    const [seatHold, setSeatHold] = useState([])
    const locationState = useLocation().state;
    const name = locationState ? locationState.name : '';
    const cinema = locationState ? locationState.cinema : '';
    const room = locationState ? locationState.room : '';
    const selectedDate = locationState ? locationState.selectedDate : '';
    const selectedTime = locationState ? locationState.selectedTime : '';
    const movieId = locationState ? locationState.movieId : '';
    const showtimeId = locationState ? locationState.showtimeId : '';

    useEffect(() => {
        const fetchSeatsStatus = async () => {
            try {
                const response = await fetchAllSeatStatus(showtimeId, selectedTime, selectedDate);
                console.log("API Response:", response); // Đảm bảo xem phản hồi từ API

                if (response) {
                    const seatsArray = response.data.flatMap(seatList => seatList.split(','));
                    console.log("Processed Seats Array:", seatsArray);
                    setBookedSeats(seatsArray);
                } else {
                    console.log("No seats data available or error in response");
                    setBookedSeats([]); // Xử lý trường hợp không có dữ liệu ghế hoặc lỗi
                }
            } catch (error) {
                console.error('Error fetching seats status:', error);
            }
        };

        fetchSeatsStatus();
    }, []);

    useEffect(() => {
        const fetchAllSeatHold = async () => {
            try {
                const res = await seatHoldStatus();
                console.log(res)
                if (res && res.data && res.data.length > 0) {
                    const seatsArray = res.data.flatMap(seatList => seatList.split(','));
                    console.log("Processed Seats Array:", seatsArray);
                    setSeatHold(seatsArray);
                } else {
                    console.log("No seats data available or error in response");
                    setSeatHold([]); // Thiết lập giá trị mặc định là một mảng rỗng
                }
            } catch (error) {
                console.error('Error fetching seat hold status:', error);
            }
        }
        fetchAllSeatHold()
    }, []);
    const updateSelectedSeats = (row, seatNum, isVip) => {
        const seatString = `${row}${seatNum}${isVip ? ' (VIP)' : ''}`;
        setSelectedSeats(prevSelectedSeats => {
            if (prevSelectedSeats.includes(seatString)) {
                return prevSelectedSeats.filter(seat => seat !== seatString);
            } else {
                return [...prevSelectedSeats, seatString];
            }
        });
    };

    useEffect(() => {
        fetchSeatPrices();
    }, []);

    useEffect(() => {
        if (selectedSeatNor.includes(true) || selectedSeatVip.includes(true)) {
            setIsShowButton(true)
        } else {
            setIsShowButton(false)
        }
        const selectedNormalSeats = selectedSeatNor.filter(seat => seat).length;
        const selectedVipSeats = selectedSeatVip.filter(seat => seat).length;
        const totalNormalPrice = selectedNormalSeats * normalSeatPrice;
        const totalVipPrice = selectedVipSeats * vipSeatPrice;
        const totalPrice = totalNormalPrice + totalVipPrice;
        console.log(selectedNormalSeats, selectedVipSeats, totalPrice);
        setTotalNormalPrice(totalNormalPrice);
        setTotalVipPrice(totalVipPrice);
        setTotalPrice(totalPrice);
    }, [selectedSeatNor, selectedSeatVip, normalSeatPrice, vipSeatPrice]);

    const fetchSeatPrices = async () => {
        try {
            const response = await fetchAllSeatPrice()
            console.log(response)
            if (response && response.data) {
                const seatPrices = response.data;
                const normalPrice = seatPrices.find(seat => seat.seatType === "Normal");
                const vipPrice = seatPrices.find(seat => seat.seatType === "VIP");
                if (normalPrice) {
                    setNormalSeatPrice(normalPrice.price);
                }
                if (vipPrice) {
                    setVipSeatPrice(vipPrice.price);
                }
            }
        } catch (error) {
            console.error('Error fetching seat prices:', error);
        }
    };

    const changeColorseat_nor = (index) => {
        // setIsShowButton(true)
        // setIsShowPrice(true)
        // const newSelectedSeat = [...selectedSeatNor];
        // console.log(newSelectedSeat, index)
        // newSelectedSeat[index] = !newSelectedSeat[index];
        // setSelectedSeatNor(newSelectedSeat);

        // const row = rows[Math.floor(index / 12)];
        // const seatNum = index % 12 + 1;
        // updateSelectedSeats(row, seatNum, false);
        const row = rows[Math.floor(index / 12)];
        const seatNum = index % 12 + 1;
        // const seatNum = (index + 1) % seatsPerRow;
        const seatString = `${row}${seatNum}`;
        if (bookedSeats.includes(seatString)) {
            return; // Không cho chọn nếu ghế đã được đặt
        }
        if (seatHold.length > 0 && seatHold.includes(seatString)) {
            return null; // Không cho chọn nếu ghế đang được giữ
        }
        console.log(seatString)
        setIsShowButton(true);
        setIsShowPrice(true);
        const newSelectedSeat = [...selectedSeatNor];
        newSelectedSeat[index] = !newSelectedSeat[index];
        setSelectedSeatNor(newSelectedSeat);
        // updateSelectedSeats(row, seatNum, false);
        // Gọi hàm kiểm tra sau khi cập nhật trạng thái
        updateSelectedSeats(row, seatNum, false);
        checkAndStartCountdown();

    }

    const changeColorseat_vip = (index) => {
        // setIsShowButton(true)
        // setIsShowPrice(true)
        // const newSelectedSeatVip = [...selectedSeatVip];
        // console.log(newSelectedSeatVip)
        // newSelectedSeatVip[index] = !newSelectedSeatVip[index];
        // setSelectedSeatVip(newSelectedSeatVip);

        // const row = rows[Math.floor((index + 48) / 12)];
        // const seatNum = index % 12 + 1;
        // updateSelectedSeats(row, seatNum, true);
        const row = rows[Math.floor((index + 48) / 12)];
        const seatNum = index % 12 + 1;
        const seatString = `${row}${seatNum} (VIP)`;
        if (bookedSeats.includes(seatString)) {
            console.log("Seat is booked.");
            return; // Không cho chọn nếu ghế đã được đặt
        }
        if (seatHold.length > 0 && seatHold.includes(seatString)) {
            return; // Không cho chọn nếu ghế đang được giữ
        }
        setIsShowButton(true);
        setIsShowPrice(true);
        const newSelectedSeatVip = [...selectedSeatVip];
        newSelectedSeatVip[index] = !newSelectedSeatVip[index];
        setSelectedSeatVip(newSelectedSeatVip);

        // Cập nhật trạng thái ghế đã chọn
        updateSelectedSeats(row, seatNum, true);
        checkAndStartCountdown();

    }

    const checkAndStartCountdown = () => {
        const hasSelectedSeats = selectedSeatNor.includes(true) || selectedSeatVip.includes(true);

        if (hasSelectedSeats && !countdownStarted) {
            setCountdown(300); // Thiết lập thời gian bắt đầu là 5 phút
            setCountdownStarted(true); // Đánh dấu bộ đếm ngược đã bắt đầu
        }
    };
    useEffect(() => {
        checkAndStartCountdown();
    }, [selectedSeatNor, selectedSeatVip]);

    useEffect(() => {
        if (countdown > 0) {
            const interval = setInterval(() => {
                setCountdown(current => current - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [countdown]);;

    const handleSelectNext = () => {
        // Nếu mọi thứ hợp lệ, tiến hành chuyển hướng người dùng và truyền dữ liệu
        navigate('/booking/bookingsit/bookingfood', {
            state: {
                name, // Tên phim hoặc sự kiện
                cinema, // Tên rạp
                room, // Số phòng
                selectedDate, // Ngày đã chọn
                selectedTime, // Giờ đã chọn
                selectedSeats, // Ghế đã chọn
                totalNormalPrice,
                totalVipPrice,
                movieId,
                showtimeId,
                countdown
            }
        });
    }

    return (
        <div className="booking-container">
            <div className="booking-title">Step 2: Choose seat</div>
            <div className="booking-site">
                <div className="booking-sit">
                    <div className="curve"><h5 style={{ textAlign: "center", paddingTop: "10px" }}>Screen</h5></div>
                    <div className="sit-container">
                        <div className="sit">
                            <div className="sit-row0" style={{
                                display: "flex",
                                justifyContent: "center",
                                marginLeft: "-35px"
                            }}>
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(12, 30px)",
                                    gap: "15px",
                                    fontSize: "30px"
                                }}>
                                    {Array.from({ length: 12 },).map((row, index) => (
                                        <div key={index} className="icon-chair">{index + 1}</div>
                                    ))}

                                </div>
                            </div>
                            <div className="sit-row1" style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(12, 30px)",
                                    gap: "15px",
                                    fontSize: "30px"
                                }}>
                                    {icons.map((icon, index) => (
                                        <div id={`normal-seat-${index}`} key={index} className="icon-chair" >

                                            {/* Đây là nơi để chèn icon */}
                                            {/* <MdChair onClick={() => changeColorseat_nor(index)} style={selectedSeatNor[index] ? { color: "green" } : {}} /> */}
                                            {/* <MdChair onClick={() => changeColorseat_nor(index)} style={bookedSeats.includes(`${rows[Math.floor(index / 12)]}${(index % 12) + 1}`) ? { color: "red" } : (selectedSeatNor[index] ? { color: "green" } : {})} /> */}
                                            <MdChair onClick={() => changeColorseat_nor(index)} style={bookedSeats.includes(`${rows[Math.floor(index / 12)]}${(index % 12) + 1}`) ? { color: "red" }
                                                : seatHold.includes(`${rows[Math.floor(index / 12)]}${(index % 12) + 1}`)
                                                    ? { color: "orange" }
                                                    : selectedSeatNor[index] ? { color: "green" } : {}} />

                                        </div>
                                    ))}
                                    {iconsVip.map((icon, index) => (
                                        <div id={`vip-seat-${index}`} key={index} className="icon-chair">
                                            {/* Đây là nơi để chèn icon */}
                                            {/* <MdChair onClick={() => changeColorseat_vip(index)} style={selectedSeatVip[index] ? { color: "green" } : { color: "yellow" }} /> */}
                                            {/* <MdChair onClick={() => changeColorseat_vip(index)} style={bookedSeats.includes(`${rows[Math.floor((index + 48) / 12)]}${(index % 12) + 1} (VIP)`)
                                                ? { color: "red" } : (selectedSeatVip[index]
                                                    ? { color: "green" }
                                                    : { color: "yellow" })} /> */}
                                            <MdChair onClick={() => changeColorseat_vip(index)} style={bookedSeats.includes(`${rows[Math.floor((index + 48) / 12)]}${(index % 12) + 1} (VIP)`) ? { color: "red" }
                                                : seatHold.includes(`${rows[Math.floor((index + 48) / 12)]}${(index % 12) + 1} (VIP)`)
                                                    ? { color: "orange" } : selectedSeatVip[index] ? { color: "green" } : { color: "yellow" }} />

                                        </div>
                                    ))}
                                </div>
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(0, 15px)",
                                    gridAutoFlow: "row",
                                    gap: "15px",
                                    fontSize: "30px",
                                    flexDirection: "row-reverse"
                                }}>
                                    {rows.map((row, index) => (
                                        <div id={`vip-seat-${index}`} key={index} className="icon-chair">
                                            {row}

                                        </div>
                                    ))}

                                </div>
                            </div>

                        </div>
                        <div className="sit-guide">
                            <div style={{ marginRight: "10px" }}><MdChair style={{ color: "red" }} /> Chair sold</div>
                            <div style={{ marginRight: "10px" }}><MdChair /> Seats not yet sold</div>
                            <div style={{ marginRight: "10px" }}><MdChair style={{ color: "green" }} /> Selected seat</div>
                            <div style={{ marginRight: "10px" }}><MdChair style={{ color: "orange" }} /> Pending</div>
                            <div><MdChair style={{ color: "yellow" }} /> Seat VIP</div>
                        </div>
                    </div>
                </div>
                <div className="price-time">
                    <div className="total-price">
                        <div className="nameRoom">
                            <div style={{ fontWeight: "bold", fontSize: "1.2em", color: "#72be43" }}>{cinema}</div>
                            <div>
                                <span style={{ color: "#72be43" }}>Room:</span> {room} -
                                <span style={{ color: "#ff0000" }}> Date:</span> {selectedDate} -
                                <span style={{ color: "#007bff" }}> Time:</span> {selectedTime}
                            </div>
                        </div>
                        <div className="nameMovie">
                            <div style={{ fontWeight: "bold", fontSize: "1.2em", color: "#72be43" }}>{name}</div>

                            <div style={{ display: "inline-block" }}>
                                {selectedSeatNor.includes(true) && (
                                    <div style={{ marginBottom: "10px" }}>
                                        <div>
                                            <span style={{ color: "#007bff" }}>Normal seat:</span> {selectedSeatNor.filter(seat => seat).length}
                                        </div>
                                        <div>
                                            <span style={{ color: "#007bff" }}>Price:</span> {totalNormalPrice} $
                                        </div>
                                    </div>
                                )}
                                {selectedSeatVip.includes(true) && (
                                    <div>
                                        <div>
                                            <span style={{ color: "#007bff" }}>VIP seat:</span> {selectedSeatVip.filter(seat => seat).length}
                                        </div>
                                        <div>
                                            <span style={{ color: "#007bff" }}>Price:</span> {totalVipPrice} $
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="buttonStep-container">
                            {isShowPrice && (
                                <div className="total">
                                    <div style={{ fontWeight: "bold", fontSize: "1.6em", color: "#72be43" }}>Total price: </div>
                                    <div style={{ fontWeight: "bold", fontSize: "1.6em", color: "#ff0000" }}>{totalPrice} $</div>
                                </div>
                            )}
                            {isShowButton && <button className="buttonNext" onClick={() => handleSelectNext()}>Next step</button>}
                            <button
                                className="buttonBack"
                                onClick={() => navigate("/booking")}
                            ><MdOutlineKeyboardBackspace /> Back</button>

                        </div>
                    </div>
                    {countdown > 0 && (selectedSeatNor.includes(true) || selectedSeatVip.includes(true)) && (
                        <div className="countdown">
                            <div className="munite">{Math.floor(countdown / 60)}</div>
                            <div style={{ display: "flex", alignItems: "center" }}>:</div>
                            <div className="second">{String(countdown % 60).padStart(2, '0')}</div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default BookingSit