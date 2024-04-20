import React, { useState } from "react";
import '../../style/theater.css'
import ListMovie from "./listMovie";

const Theater = () => {

    const [isShowTheater, setIsShowTheater] = useState(false)
    const [color, setColor] = useState('');
    const [isShowMovie, setIsshowMovie] = useState(false)
    const [colorTheater, setColorTheater] = useState('')


    const handleClick = () => {
        setIsShowTheater(!isShowTheater)
        setColor(color === '' ? '#a33327' : '');
    }

    const handleChoose = () => {
        setIsshowMovie(!isShowMovie)
        setColorTheater(colorTheater === '' ? '#a33327' : '')
    }

    return (
        <div className="theater-container">
            <div style={{
                width: "auto",
                height: "auto",
                padding: "40px",
                border: "1px white solid",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#333333"
            }}>
                <div className="theater-list">
                    <div className="theater-header">DC Cinema</div>
                    <div className="theater-location">
                        <p onClick={handleClick} style={{ backgroundColor: color }}>ha noi</p>
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
                        <p onClick={handleChoose} style={{backgroundColor: colorTheater}}>CGV long bien</p>
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
            {isShowMovie && <ListMovie/>}
        </div>
    )
}

export default Theater