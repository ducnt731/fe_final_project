import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { getAllProvince, getAllDistrict, getAllCommune } from '../../service/userService';

const AddCinema = (props) => {
    const { show, handleClose, handleAddNewCinema } = props
    const [cinemaData, setCinemaData] = useState({
        name: "",
        province: "",
        district: "",
        commune: "",
        address: ""
    });

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await getAllProvince();
                setProvinces(response.data);
            } catch (error) {
                console.error("Error fetching provinces:", error);
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (cinemaData.province) {
                try {
                    const response = await getAllDistrict(cinemaData.province);
                    setDistricts(response.data);
                } catch (error) {
                    console.error("Error fetching districts:", error);
                }
            } else {
                setDistricts([]);
            }
        };
        fetchDistricts();
    }, [cinemaData.province]);

    useEffect(() => {
        const fetchCommunes = async () => {
            if (cinemaData.district) {
                try {
                    const response = await getAllCommune(cinemaData.district);
                    setCommunes(response.data);
                } catch (error) {
                    console.error("Error fetching communes:", error);
                }
            } else {
                setCommunes([]);
            }
        };
        fetchCommunes();
    }, [cinemaData.district]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCinemaData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!cinemaData.name || !cinemaData.province || !cinemaData.district || !cinemaData.commune || !cinemaData.address) {
            alert("All fields must be filled.");
            return;
        }
        handleAddNewCinema(cinemaData);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Add New Cinema</Modal.Title>
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
                        <select className="form-select" name="district" value={cinemaData.district} onChange={handleChange} required disabled={!cinemaData.province}>
                            <option value="">Select District</option>
                            {districts.map(district => (
                                <option key={district.code} value={district.code}>{district.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Commune</label>
                        <select className="form-select" name="commune" value={cinemaData.commune} onChange={handleChange} required disabled={!cinemaData.district}>
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
                <Button variant="primary" onClick={handleSubmit}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddCinema;
