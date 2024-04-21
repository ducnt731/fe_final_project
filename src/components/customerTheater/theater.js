import React, { useEffect, useState } from "react";
import '../../style/theater.css';
import { fetchDataCinemaByProvince, getProvinceCinema } from "../../service/userService";

const Theater = () => {
    const [isShowTheater, setIsShowTheater] = useState(false);
    const [color, setColor] = useState('');
    const [cinemas, setCinemas] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');

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
        setSelectedProvince(province);
        setIsShowTheater(false); // Optionally hide the cinema list until new data is fetched
    };

    return (
        <div className="theater-container">
            <div className="theater-list">
                <div className="theater-header">DC Cinema</div>
                <div className="theater-location">
                    {provinces.map((province, index) => (
                        <p key={index} onClick={() => handleProvinceClick(province)} style={{ backgroundColor: color }}>
                            {province}
                        </p>
                    ))}
                </div>
                {isShowTheater && (
                    <div className="theater-address">
                        {cinemas.map((cinema, index) => (
                            <p key={index}>
                                {cinema.name}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Theater;
