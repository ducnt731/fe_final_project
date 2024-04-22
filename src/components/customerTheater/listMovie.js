import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import '../../style/theater.css'
import { Button, Modal } from "react-bootstrap";

const ListMovie = ({ cinema }) => {
    const handleDirectionsClick = () => {
        window.open(`/mapbox.html`, '_blank');
    };

    const images = [
        "https://iguov8nhvyobj.vcdn.cloud/media/site/cache/1/980x415/b58515f018eb873dafa430b6f9ae0c1e/f/a/fasade_layer-1.jpg",
        "https://iguov8nhvyobj.vcdn.cloud/media/site/cache/1/980x415/b58515f018eb873dafa430b6f9ae0c1e/t/i/ticket_box_layer-1.jpg",
        "https://iguov8nhvyobj.vcdn.cloud/media/site/cache/1/980x415/b58515f018eb873dafa430b6f9ae0c1e/p/o/popcorn_pactory_layer-1.jpg"
    ];

    return (
        <div className="list-movie">
            <div className="header-title">Theater</div>
            {cinema && (
                <>
                    <div className="theater-name">{cinema.name}</div>
                    <div className="image-theater" style={{ height: '415px', overflow: 'hidden' }}>
                        <Carousel>
                            {images.map((image, index) => (
                                <Carousel.Item key={index} className="carousel-item">
                                    <img
                                        className="d-block w-100"
                                        src={image}
                                        alt={`Slide ${index + 1}`}
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className="carousel-info">
                                        <div className="address-contact">
                                            <div>{cinema.address}, {cinema.commune}, {cinema.district}, {cinema.province}</div>
                                            <div>Hotline: +84 4 6 275 5240</div>
                                            <div>Phone Number: 1900 6017</div>
                                        </div>
                                        <button
                                            className="directions-button"
                                            style={{
                                                backgroundColor: '#007bff',
                                                color: '#fff',
                                                fontSize: '16px',
                                                padding: '10px 20px',
                                                border: 'none',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                marginTop: '10px'
                                            }}
                                            onClick={handleDirectionsClick}
                                        >
                                            Get Directions
                                        </button>
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </>
            )}
        </div>
    )
}

export default ListMovie;