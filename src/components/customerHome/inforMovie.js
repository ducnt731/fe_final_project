import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';

const InforMovie = ({ show, handleClose, movie }) => {
    useEffect(() => {
    }, [movie]);

    if (!movie) {
        return null;
    }

    return (
        <Modal show={show} onHide={handleClose} size='xl' style={{ marginTop: "40px", fontFamily: "sans-serif" }}>
            <div style={{ color: "white", backgroundColor: "#1a1a1afa", backgroundRepeat: "no-repeat", borderRadius: "5px" }}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Movie's Information</Modal.Title>
                </Modal.Header> */}
                <Modal.Body style={{ height: '500px', overflowY: 'auto' }}>
                    <div className='modal-info'>
                        <div className='image'>
                            {movie.poster && <img src={movie.poster} style={{ width: "310px", borderRadius: "10px" }} alt={movie.name} />}
                        </div>
                        <div className='information'>
                            <div className='movie-information'>
                                <h4 style={{ fontSize: "1.5 em", color: "#72be43", marginBottom: "20px" }}>{movie.name}</h4>
                                <h5>Category: {movie.category?.name}</h5>
                                <h5>Director: {movie.director}</h5>
                                <h5>Cast: {movie.performer}</h5>
                                <h5>Premiere Date: {new Date(movie.premiere).toLocaleDateString()}</h5>
                                <h5>Duration: {movie.time} minutes</h5>
                                <h5>Language: {movie.language}</h5>
                            </div>
                            <div className='trailer'>
                                <iframe
                                    src={`https://www.youtube.com/embed/${new URLSearchParams(new URL(movie.trailerUrl).search).get('v')}`}
                                    allowFullScreen
                                    title="Movie Trailer"
                                    frameBorder="0"
                                    width="100%"
                                    height="100%"
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default InforMovie;
