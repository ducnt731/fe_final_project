import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { getAllProvince, getAllDistrict, getAllCommune, editCinema, fetchAllCinema } from '../../service/userService';

const EditCinema = (props) => {
    const { show, handleClose, handleEditCinema, dataEditCinema } = props;
    const [cinemaData, setCinemaData] = useState({
        id: "",
        name: "",
        province: "",
        district: "",
        commune: "",
        address: "",
    });

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);

    useEffect(() => {
        if (dataEditCinema) {
            setCinemaData(dataEditCinema);
        }
    }, [dataEditCinema]);
    useEffect(() => {
        if (dataEditCinema) {
            const fetchProvinces = async () => {
                try {
                    const response = await getAllProvince();
                    if (response && response.data) {
                        // console.log(response.data)
                        // console.log(dataEditCinema.province)
                        const provinces = response && response.data.find(province => dataEditCinema.province == province.name)
                        console.log(provinces)
                        if (provinces) {
                            setCinemaData(prevData => ({ ...prevData, province: provinces.code }));
                        }
                    }
                    setProvinces(response.data || []); // Chú ý sửa `response.data` thành `response.data.data`
                } catch (error) {
                    console.error("Error fetching provinces:", error);
                }
            };
            fetchProvinces();
            // district.name == dataEditCinema.district
        }
    }, [dataEditCinema]);
    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                if (cinemaData.province) {
                    const response = await getAllDistrict(cinemaData.province);
                    console.log(response)
                    if (response && response.data) {
                        const district = response && response.data.find(district => dataEditCinema.district == district.name);
                        console.log(district)
                        if (district) {
                            setCinemaData(prevData => ({ ...prevData, district: district.code }));
                        }
                    }
                    setDistricts(response.data || []);
                }
            } catch (error) {
                console.error("Error fetching districts:", error);
            }
        };
        fetchDistricts();
    }, [cinemaData.province]);

    useEffect(() => {
        const fetchCommunes = async () => {
            try {
                if (cinemaData.district) {
                    const response = await getAllCommune(cinemaData.district);
                    if (response && response.data) {
                        const commune = response && response.data.find(commune => dataEditCinema.commune == commune.name);
                        if (commune) {
                            setCinemaData(prevData => ({ ...prevData, commune: commune.code }));
                        }
                    }
                    setCommunes(response.data || []);
                }
            } catch (error) {
                console.error("Error fetching communes:", error);
            }
        };
        fetchCommunes();
    }, [cinemaData.district]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCinemaData({ ...cinemaData, [name]: value });
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Cinema</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" value={cinemaData.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Province</label>
                        <select className="form-select" name="province" value={cinemaData.province} onChange={handleChange} required>
                            <option value="">Select Province</option>
                            {provinces.map(province => (
                                <option key={province.code} value={province.code}>{province.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">District</label>
                        <select className="form-select" name="district" value={cinemaData.district} onChange={handleChange} required >
                            <option value="">Select District</option>
                            {districts.map(district => (
                                <option key={district.code} value={district.code}>{district.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Commune</label>
                        <select className="form-select" name="commune" value={cinemaData.commune} onChange={handleChange} required >
                            <option value="">Select Commune</option>
                            {communes.map(commune => (
                                <option key={commune.code} value={commune.code}>{commune.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" name="address" value={cinemaData.address} onChange={handleChange} required />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={() => { handleEditCinema(cinemaData) }}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditCinema;
