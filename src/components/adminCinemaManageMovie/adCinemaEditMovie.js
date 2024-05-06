import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { fetchAllMovie, fetchAllMovieAdminCinema } from "../../service/userService";

const AdminCinemaEditMovie = (props) => {
    const { show, handleClose, handleMovieEdit, dataEditMovie } = props;
    const [ movieData, setMovieData ] = useState({
        movie: "",
        cinema: ""
    })

    useEffect(() => {
        if (dataEditMovie) {
            setMovieData(dataEditMovie);
        }
    }, [dataEditMovie]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData({ ...movieData, [name]: value });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Movie to Cinema</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Select Movie</Form.Label>
                    <Form.Select onChange={handleMovieEdit}>
                        <option value="">-- Select Movie --</option>
                        {/* {movieData.map((movie) => (
                            <option key={movie._id} value={movie._id}>{movie.name}</option>
                        ))} */}
                    </Form.Select>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleMovieEdit(movieData)}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AdminCinemaEditMovie;
