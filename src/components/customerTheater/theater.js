import React, { useEffect, useState } from "react";
import '../../style/theater.css';
import { fetchDataCinemaByProvince, getProvinceCinema } from "../../service/userService";
import ListMovie from "./listMovie";

const Theater = () => {
    const [isShowTheater, setIsShowTheater] = useState(false);
    const [cinemas, setCinemas] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [isShowMovie, setIsShowMovie] = useState(false);
    const [checkColor, setCheckColor] = useState()
    const [checkColorCinema, setCheckColorCinema] = useState()

    useEffect(() => {
        const fetchDataProvince = async () => {
            try {
                const response = await getProvinceCinema();
                if (response && response.data) {
                    setProvinces(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch provinces:', error);
            }
        };
        fetchDataProvince();
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            const fetchCinemas = async () => {
                try {
                    const response = await fetchDataCinemaByProvince(selectedProvince);
                    console.log(response)
                    if (response && response.data) {
                        setCinemas(response.data);
                        setIsShowTheater(true);

                    }
                } catch (error) {
                    console.error('Failed to fetch cinemas for the selected province:', error);
                }
            };
            fetchCinemas();
        }
    }, [selectedProvince]);

    const handleProvinceClick = (province) => {
        setCheckColor(province)
        setSelectedProvince(province);
        setIsShowTheater(true);// Optionally hide the cinema list until new data is fetched
    };

    const hanldeChoose = (cinema) => {
        setIsShowMovie(!isShowMovie)
        setCheckColorCinema(cinema.name)
    }

    return (
        <div className="theater-container">
            <div style={{
                width: "500px",
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
                        {provinces.map((province, index) => (
                            <p key={index} style={{ backgroundColor: province === checkColor ? 'red' : '' }} onClick={() => handleProvinceClick(province)} >
                                {province}
                            </p>
                        ))}
                    </div>
                    {isShowTheater && (
                        <div className="theater-address">
                            {cinemas.map((cinema, index) => (
                                <p key={index} onClick={() => hanldeChoose(cinema)} style={{ backgroundColor: cinema.name === checkColorCinema ? 'red' : '' }}>
                                    {cinema.name}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {isShowMovie && <ListMovie />}
        </div>
    );
};

export default Theater;