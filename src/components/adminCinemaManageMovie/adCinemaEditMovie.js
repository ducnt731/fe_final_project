import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { fetchAllMovie, fetchAllMovieAdminCinema } from "../../service/userService";

const AdminCinemaEditMovie = (props) => {
    const { show, handleClose, handleMovieEdit, dataEditMovie, CinemaInfor } = props;
    console.log("dataEditMovie", dataEditMovie)
    console.log("CinemaInfor", CinemaInfor)
    const [movieData, setMovieData] = useState({
        id: "",
        movie: "",
        cinema: CinemaInfor.id ? CinemaInfor.id : ""
    })
    console.log("movieData", movieData)
    const [movieList, setMovieList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");

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

    useEffect(() => {
        if (dataEditMovie) {
            setMovieData(dataEditMovie);
            setSelectedMovie(dataEditMovie.movie?._id);
        }
    }, [dataEditMovie]);

    const handleChange = (e) => {
        console.log("Selected Movie ID:", e.target.value);
        setSelectedMovie(e.target.value);
        setMovieData({ ...movieData, movie: e.target.value });
    };


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Movie to Cinema</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Select Movie</Form.Label>
                    <Form.Select name="movie" value={selectedMovie} onChange={handleChange}>
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
                <Button variant="primary" onClick={() => handleMovieEdit(movieData)}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AdminCinemaEditMovie;
