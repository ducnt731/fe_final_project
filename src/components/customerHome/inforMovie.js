import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';

const InforMovie = ({ show, handleClose, movie }) => {
    useEffect(() => {
        // Cập nhật lại dữ liệu phim khi prop movie thay đổi
    }, [movie]);

    if (!movie) {
        // Nếu movie không tồn tại, trả về null
        return null;
    }

    return (
        <Modal show={show} onHide={handleClose} size='xl'>
            <div style={{ backgroundColor: "slategrey" }}>
                <Modal.Header closeButton>
                    <Modal.Title>Movie's Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modal-info'>
                        <div className='image'>
                            <img src={movie.poster} style={{ width: "200px" }} alt={movie.name} />
                        </div>
                        <div className='information'>
                            <div className='movie-information'>
                                <h4>{movie.name}</h4>
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
                                    height="315"
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
