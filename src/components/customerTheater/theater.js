import React, { useState } from "react";
import '../../style/theater.css'

const Theater = () => {

    const [isShowTheater, setIsShowTheater] = useState(false)
    const [color, setColor] = useState('');


    const hanldeClick = () => {
        setIsShowTheater(!isShowTheater)
        setColor(color === '' ? 'red' : '');
    }

    return (
        <div className="theater-container">
            <div style={{
                width: "auto",
                height: "auto", padding: "40px",
                border: "1px white solid",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#333333"
            }}>
                <div className="theater-list">
                    <div className="theater-header">DC Cinema</div>
                    <div className="theater-location">
                        <p onClick={hanldeClick} style={{ color: color }}>ha noi</p>
                        <p>ho chi minh</p>
                        <p>da nang</p>
                        <p>can tho</p>
                        <p>phu tho</p>
                        <p>thai nguyen</p>
                        <p>lang son</p>
                        <p>tra vinh</p>
                        <p>ba ria - vung tau</p>
                    </div>
                    {isShowTheater && <div className="theater-address">
                        <p>CGV long bien</p>
                        <p>CGV tran duy hung</p>
                        <p>CGV cau giay</p>
                        <p>CGV cau giay</p>
                        <p>CGV cau giay</p>
                        <p>CGV cau giay</p>
                        <p>CGV cau giay</p>
                        <p>CGV cau giay</p>
                        <p>CGV cau giay</p>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Theater