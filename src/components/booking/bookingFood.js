import React, { useEffect, useState } from "react";
import '../../style/booking.css'
import { FaCircleMinus } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteSeatHold, fetchAllFood, seatHold } from "../../service/userService";

const BookingFood = () => {

    const [isShowPrice, setIsShowPrice] = useState(false)
    const [food, setFood] = useState([]);
    const [comboValues, setComboValues] = useState([]);
    const [isTimeExpired, setIsTimeExpired] = useState(false);
    const [idSeatHold, setIdSeatHold] = useState('')

    const navigate = useNavigate()
    const location = useLocation();

    const locationState = useLocation().state;
    console.log("object", locationState)
    const name = locationState ? locationState.name : '';
    const cinema = locationState ? locationState.cinema : '';
    const room = locationState ? locationState.room : '';
    const selectedDate = locationState ? locationState.selectedDate : '';
    const selectedTime = locationState ? locationState.selectedTime : '';
    const selectedMovie = locationState ? locationState.selectedMovie : '';
    const selectedSeats = locationState ? locationState.selectedSeats : [];
    const totalNormalPrice = locationState ? locationState.totalNormalPrice : 0;
    const totalVipPrice = locationState ? locationState.totalVipPrice : 0;
    const movieId = locationState ? locationState.movieId : '';
    const showtimeId = locationState ? locationState.showtimeId : '';
    const countdownFromPreviousScreen = locationState ? locationState.countdown : 300;
    const heldSeatIds = locationState ? locationState.heldSeatIds : [];
    console.log("countdownFromPreviousScreen", heldSeatIds)

    const toltalPiceSeat = totalNormalPrice + totalVipPrice;

    console.log("showtimeId", showtimeId)
    // Khởi tạo state để lưu trữ giá trị trong box
    const [countdown, setCountdown] = useState(countdownFromPreviousScreen);
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
        getAllFood();
    }, []);
    useEffect(() => {
        // Khi danh sách thức ăn cập nhật, thiết lập mảng số lượng với giá trị ban đầu là 0
        setComboValues(food.map(() => 0));
    }, [food]);
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
    const saveSeatsHold = async () => {
        const userId = localStorage.getItem('user_id');
        console.log('userId:', userId); // Check if userId is retrieved correctly
        const holdExpires = new Date();
        holdExpires.setSeconds(holdExpires.getSeconds() + countdownFromPreviousScreen);
        const data = {
            user: userId,
            seatHold: selectedSeats.join(','),
            holdExpires: holdExpires
        };
        console.log('Data being sent to seatHold:', data.holdExpires); // Verify the data is correct
        try {
            const response = await seatHold(data);
            console.log('Response from seatHold:', response);
            setIdSeatHold(response.data._id);
            localStorage.setItem('seatHoldSaved', 'true');
            console.log('Seat information saved successfully');
        } catch (error) {
            console.error('Error while holding seats:', error);
            // Thêm bất kỳ xử lý nào tại đây dựa trên lỗi được trả về
        }
    }
    useEffect(() => {
        const alreadySaved = localStorage.getItem('seatHoldSaved') === 'true';
        console.log('Booking already saved:', alreadySaved);
        if (!alreadySaved) {
            saveSeatsHold();
        }

    }, []);

    const getAllFood = async () => {
        try {
            const response = await fetchAllFood();
            console.log(response)
            if (response && response.data) {
                setFood(response.data);
            }
        } catch (error) {
            console.error('Error fetching food:', error);
        }
    };



    const handleIncrement = (index) => {
        setComboValues(comboValues.map((value, idx) => {
            if (idx === index) return value + 1;
            return value;
        }));
        setIsShowPrice(true);
    };

    const handleDecrement = (index) => {
        setComboValues(comboValues.map((value, idx) => {
            if (idx === index && value > 0) return value - 1;
            return value;
        }));
    };

    const calculateFoodTotal = () => {
        const foodTotal = food.reduce((total, combo, index) => {
            return total + (comboValues[index] * combo.price);
        }, 0);
        return foodTotal;
    };

    const calculateTotal = () => {
        const foodTotal = calculateFoodTotal();
        const totalPrice = toltalPiceSeat + foodTotal;
        return totalPrice;
    };

    const handleNextStep = () => {
        navigate("/booking/bookingsit/bookingfood/payment", {
            state: {
                name,
                cinema,
                room,
                selectedDate,
                selectedTime,
                selectedMovie,
                selectedSeats,
                totalNormalPrice,
                totalVipPrice,
                food: food.filter((combo, index) => comboValues[index] > 0),
                foodValues: comboValues,
                showtimeId,
                countdown,
                idSeatHold
            },

        });
    };
    const handleGoHome = async() => {
        await deleteSeatHold(idSeatHold);
        localStorage.removeItem('seatHoldSaved');
        navigate("/");
    };

    return (
        <div className="booking-container">
            <div className="booking-title">Step 3: Choose food and drink</div>
            <div className="booking-site">
                <div className="booking-food">
                    <div style={{
                        padding: "20px",
                        borderBottom: "1px white solid",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <div style={{
                            width: "10%",
                            border: "1px white solid",
                            padding: "10px",
                            textAlign: "center",
                            borderRadius: "5px"
                        }}>Combo</div>
                    </div>
                    <div className="food-combo">
                        {food.map((combo, index) => (
                            <div className="combo" key={index}>
                                <img src={combo.image} alt={combo.name} />
                                <div style={{ width: "100%", marginLeft: "10px" }}>
                                    <div>{combo.name}</div>
                                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "45px" }}>
                                        <div style={{ width: "10%", height: "10%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <FaCircleMinus onClick={() => handleDecrement(index)} disabled={comboValues[index] === 0} />
                                            <div className="counter-box">{comboValues[index]}</div>
                                            <FaPlusCircle onClick={() => handleIncrement(index)} style={{ color: "#72be43" }} />
                                        </div>
                                        <div>{combo.price} $</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="price-time">
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
                            <div className="price1">
                                <div>Total price seats: </div>
                                <div>{toltalPiceSeat} $</div>
                            </div>
                            {isShowPrice && <div className="price2">
                                <div >Combo price:</div>
                                <div >{calculateFoodTotal()} $</div>
                            </div>}
                        </div>
                        <div className="buttonStep-container">
                            <div className="total">
                                <div style={{ fontWeight: "bold", fontSize: "1.6em", color: "#72be43" }}>Total price: </div>
                                <div style={{ fontWeight: "bold", fontSize: "1.6em", color: "#ff0000" }}>{calculateTotal()} $</div>
                            </div>
                                {!isTimeExpired ? (
                                    <>
                                        <button className="buttonNext" onClick={() => handleNextStep()}>Next step</button>
                                        <button className="buttonBack" onClick={handleGoHome}><MdOutlineKeyboardBackspace /> Cancel</button>
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
                        {/* <div className="countdown">
                            <div className="munite">{Math.floor(countdown / 60)}</div>
                            <div style={{ display: "flex", alignItems: "center" }}>:</div>
                            <div className="second">{String(countdown % 60).padStart(2, '0')}</div>
                        </div> */}
                    </div>
                    <div className="countdown">
                        <div className="munite">{Math.floor(countdown / 60)}</div>
                        <div>:</div>
                        <div className="second">{String(countdown % 60).padStart(2, '0')}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingFood