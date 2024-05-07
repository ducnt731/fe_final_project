import React, { useEffect, useState } from "react";
import '../../style/booking.css'
import { FaCircleMinus } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAllFood } from "../../service/userService";

const BookingFood = () => {

    const [isShowPrice, setIsShowPrice] = useState(false)
    const [food, setFood] = useState([]);
    const [comboValues, setComboValues] = useState([]);
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
    const seats = locationState ? locationState.selectedSeats : [];

    const toltalPiceSeat = totalNormalPrice + totalVipPrice;

    console.log("showtimeId", showtimeId)
    // Khởi tạo state để lưu trữ giá trị trong box
    const [value, setValue] = useState(0);

    useEffect(() => {
        getAllFood();
    }, []);
    useEffect(() => {
        // Khi danh sách thức ăn cập nhật, thiết lập mảng số lượng với giá trị ban đầu là 0
        setComboValues(food.map(() => 0));
    }, [food]);

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
            },

        });
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
                                        <div>{combo.price} VND</div>
                                    </div>
                                </div>
                            </div>
                        ))}
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
                        <div> <span style={{ color: "#72be43" }}>Seats: </span> {selectedSeats.join(', ')}</div>
                        <div className="price">
                            <div>Total price seats: </div>
                            <div>{toltalPiceSeat} VND</div>
                        </div>
                        {isShowPrice && <div className="price2">
                            <div >Combo name</div>
                            <div >{calculateFoodTotal()} VND</div>
                        </div>}
                    </div>
                    <div className="buttonStep-container">
                        <div className="total">
                            <div style={{ fontWeight: "bold", fontSize: "1.6em", color: "#72be43" }}>Total price: </div>
                            <div style={{ fontWeight: "bold", fontSize: "1.6em", color: "#ff0000" }}>{calculateTotal()} VND</div>
                        </div>
                        <button
                            className="buttonNext"
                            onClick={() => handleNextStep()}>Next step</button>
                        <button
                            className="buttonBack"
                            onClick={() => navigate(`/booking/bookingsit/${movieId}`)}
                        ><MdOutlineKeyboardBackspace /> Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingFood