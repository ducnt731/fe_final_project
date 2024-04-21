import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';

const InforMovie = ({ show, handleClose, movie }) => {
    useEffect(() => {
    }, [movie]);

    if (!movie) {
        return null;
    }

    return (
        <Modal show={show} onHide={handleClose} size='xl'>
            <div style={{ backgroundColor: "slategrey" }}>
                <Modal.Header closeButton>
                    <Modal.Title>Movie's information</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ height: '500px', overflowY: 'auto' }}>
                    <div className='modal-info'>
                        <div className='image'>
                            <img src='https://d1j8r0kxyu9tj8.cloudfront.net/images/1566809340Y397jnilYDd15KN.jpg' style={{ width: "200px" }} />
                        </div>
                        <div className='information'>
                            <div className='movie-information'>
                                <h4>Movie name</h4>
                                <h5>the loai</h5>
                                <h5>dao dien</h5>
                                <h5>dien vien</h5>
                                <h5>ngay khoi chieu</h5>
                                <h5>thoi luong phim</h5>
                                <h5>phu de</h5>
                            </div>
                            <div className='trailer'>
                                <iframe src='https://www.youtube.com/embed/WXLunaC5nWk?si=xRi25nfjapYD66_y' allowFullScreen />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    );
};

export default InforMovie;
