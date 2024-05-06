import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { fetchAllMovie } from '../../service/userService';

const AddMovieToCinema = (props) => {
    const { show, handleClose, handleAddNewMovie } = props;
    const [selectedMovie, setSelectedMovie] = useState("");
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        getAllMovies();
    }, []);

    const getAllMovies = async () => {
        try {
            const res = await fetchAllMovie();
            setMovieList(res.data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const handleSelectMovie = (e) => {
        setSelectedMovie(e.target.value);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Movie to Cinema</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Select Movie</Form.Label>
                    <Form.Select onChange={handleSelectMovie}>
                        <option value="">-- Select Movie --</option>
                        {movieList.map((movie) => (
                            <option key={movie._id} value={movie._id}>{movie.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleAddNewMovie(selectedMovie)}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default AddMovieToCinema;
