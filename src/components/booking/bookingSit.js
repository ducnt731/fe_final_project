import React, { useEffect, useState } from "react";
import '../../style/booking.css'
import { MdChair, MdOutlineKeyboardBackspace } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAllSeatPrice } from "../../service/userService";



const BookingSit = () => {

    const rows = ['A', 'B', 'C', 'D', 'E', 'F']; // Các hàng từ A đến E
    const seatsPerRow = 12;


    const icons = Array.from({ length: 48 }, (_, index) => index + 1) // Tạo một mảng chứa 70 icon giống nhau
    const iconsVip = Array.from({ length: 24 }, (_, index) => index + 1)
    const [selectedSeatNor, setSelectedSeatNor] = useState(Array(icons.length).fill(false));
    const [selectedSeatVip, setSelectedSeatVip] = useState(Array(iconsVip.length).fill(false));
    const [isShowButton, setIsShowButton] = useState(false)
    const [isShowPrice, setIsShowPrice] = useState(false)
    const [normalSeatPrice, setNormalSeatPrice] = useState(0);
    const [vipSeatPrice, setVipSeatPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalNormalPrice, setTotalNormalPrice] = useState(0);
    const [totalVipPrice, setTotalVipPrice] = useState(0);
    const navigate = useNavigate();
    const [selectedSeats, setSelectedSeats] = useState([]); // Thêm trạng thái này để lưu trữ các ghế đã chọn

    // const [seatsState, setSeatsState] = useState(() => {
    //     const rows = 6;
    //     const seatsPerRow = 12;
    //     let seats = [];
    //     let seatStatus = [];

    //     // Khởi tạo mảng ghế
    //     for (let i = 0; i < rows; i++) {
    //         seats[i] = [];
    //         seatStatus[i] = [];
    //         for (let j = 0; j < seatsPerRow; j++) {
    //             seats[i][j] = `Row ${i + 1}, Seat ${j + 1}`;
    //             seatStatus[i][j] = false; // false: chưa chọn, true: đã chọn
    //         }
    //     }
    //     return seatStatus;
    // });
    // console.log("seat", seatsState)
    // // Function để đánh dấu ghế đã chọn
    // function markSeat(row, seat) {
    //     console.log("row", row, seat)
    //     seatsState[row][seat] = !seatsState[row][seat]; // Đảo trạng thái của ghế
    // }
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
        setIsShowButton(true)
        setIsShowPrice(true)
        const newSelectedSeat = [...selectedSeatNor];
        console.log(newSelectedSeat, index)
        newSelectedSeat[index] = !newSelectedSeat[index];
        setSelectedSeatNor(newSelectedSeat);

        // const n = (index) / 12;
        // const d = (index) % 12;
        // // console.log(rows[Math.floor(n)], d + 1)
        // markSeat(Math.floor(n), d);
        const row = rows[Math.floor(index / 12)];
        const seatNum = index % 12 + 1;
        updateSelectedSeats(row, seatNum, false);

    }

    const changeColorseat_vip = (index) => {
        setIsShowButton(true)
        setIsShowPrice(true)
        const newSelectedSeatVip = [...selectedSeatVip];
        console.log(newSelectedSeatVip)
        newSelectedSeatVip[index] = !newSelectedSeatVip[index];
        setSelectedSeatVip(newSelectedSeatVip);

        const n = (index + 48) / 12;
        const d = (index) % 12;
        // // console.log(rows[Math.floor(n)], d + 1)
        // markSeat(Math.floor(n), d);
        const row = rows[Math.floor((index + 48) / 12)];
        const seatNum = index % 12 + 1;
        updateSelectedSeats(row, seatNum, true);
    }


    const locationState = useLocation().state;
    const name = locationState ? locationState.name : '';
    const cinema = locationState ? locationState.cinema : '';
    const room = locationState ? locationState.room : '';
    const selectedDate = locationState ? locationState.selectedDate : '';
    const selectedTime = locationState ? locationState.selectedTime : '';
    const movieId = locationState ? locationState.movieId : '';

    console.log(locationState)

    const handleSelectNext = () => {
        // Kiểm tra xem người dùng có ghế nào được chọn hay không
        if (selectedSeats.length === 0) {
            alert("Vui lòng chọn ít nhất một ghế trước khi tiếp tục!");
            return; // Ngăn không cho chuyển hướng nếu không có ghế nào được chọn
        }

        // Có thể thêm thêm các kiểm tra khác ở đây nếu cần

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
                movieId
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
                                            <MdChair onClick={() => changeColorseat_nor(index)} style={selectedSeatNor[index] ? { color: "green" } : {}} />
                                        </div>
                                    ))}
                                    {iconsVip.map((icon, index) => (
                                        <div id={`vip-seat-${index}`} key={index} className="icon-chair">
                                            {/* Đây là nơi để chèn icon */}
                                            <MdChair onClick={() => changeColorseat_vip(index)} style={selectedSeatVip[index] ? { color: "green" } : { color: "yellow" }} />
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
                            <div style={{ marginRight: "10px" }}><MdChair style={{ color: "red" }} /> Ghế đã bán</div>
                            <div style={{ marginRight: "10px" }}><MdChair /> Ghế chưa bán</div>
                            <div style={{ marginRight: "10px" }}><MdChair style={{ color: "green" }} /> Ghế đang chọn</div>
                            <div><MdChair style={{ color: "yellow" }} /> Ghế vip</div>
                        </div>
                    </div>
                </div>
                <div className="total-price">
                    <div className="nameRoom">
                        <div style={{ fontWeight: "bold", fontSize: "1.2em", color: "#72be43" }}>{cinema}</div>
                        <div> <span style={{ color: "#72be43" }}>Room:</span> {room} -
                            <span style={{ color: "#ff0000" }}> Date:</span> {selectedDate} -
                            <span style={{ color: "#007bff" }}> Time:</span> {selectedTime}</div>
                    </div>
                    <div className="nameMovie">
                        <div style={{ fontWeight: "bold", fontSize: "1.6em", color: "#72be43" }}>{name}</div>

                        <div style={{ display: "inline-block" }}>
                            {selectedSeatNor.includes(true) && (
                                <div style={{ marginBottom: "10px" }}>
                                    <div>
                                        <span style={{ color: "#007bff" }}>Normal seat:</span> {selectedSeatNor.filter(seat => seat).length}
                                    </div>
                                    <div>
                                        <span style={{ color: "#007bff" }}>Price:</span> {totalNormalPrice} VND
                                    </div>
                                </div>
                            )}
                            {selectedSeatVip.includes(true) && (
                                <div>
                                    <div>
                                        <span style={{ color: "#007bff" }}>VIP seat:</span> {selectedSeatVip.filter(seat => seat).length}
                                    </div>
                                    <div>
                                        <span style={{ color: "#007bff" }}>Price:</span> {totalVipPrice} VND
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="buttonStep-container">
                        {isShowPrice && (
                            <div className="total">
                                <div style={{ fontWeight: "bold", fontSize: "1.6em", color: "#72be43" }}>Total price: </div>
                                <div style={{ fontWeight: "bold", fontSize: "1.6em", color: "#ff0000" }}>{totalPrice} VND</div>
                            </div>
                        )}
                        {isShowButton && <button className="buttonNext" onClick={() => handleSelectNext()}>Next step</button>}
                        <button
                            className="buttonBack"
                            onClick={() => navigate("/booking")}
                        ><MdOutlineKeyboardBackspace /> Back</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BookingSit