import { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

const TrailerMovie = ({ show, handleClose, movie }) => {

    useEffect(() => {
    }, [movie]);

    if (!movie) {
        return null;
    }

    return (
        <Modal show={show} onHide={handleClose} size='xl' style={{ fontFamily: "sans-serif" }}>
            <div style={{ color: "white", backgroundColor: "#1a1a1afa", backgroundRepeat: "no-repeat", borderRadius: "5px" }}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Movie's Information</Modal.Title>
                </Modal.Header> */}
                <Modal.Body style={{ height: '600px' }}>
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
                </Modal.Body>
            </div>
        </Modal>
    )
}

export default TrailerMovie