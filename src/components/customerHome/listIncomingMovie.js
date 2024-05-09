import React, { useEffect, useState } from 'react';
import '../../style/listBox.css'; // Import CSS file
import { Button } from 'react-bootstrap';
import { IoIosInformationCircle } from "react-icons/io";
import InforMovie from './inforMovie';
import { getMovieNowShowing, getMovieUpComing } from '../../service/userService';
import TrailerMovie from './trailer';
import { IoPlaySharp } from 'react-icons/io5';
import { HiPlay } from 'react-icons/hi2';

const ListIncoming = ({ items }) => {
    const [startIndex, setStartIndex] = useState(0);
    const [listMovie, setListMovie] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isShowModalTrailer, setIsShowModalTrailer] = useState(false);

    useEffect(() => {
        getAllMovieUpComing(); // Gọi hàm này khi component mount
    }, []);

    const getAllMovieUpComing = async () => {
        try {
            const response = await getMovieUpComing(); // Sử dụng API để lấy danh sách phim
            if (response && response.data) {
                setListMovie(response.data); // Cập nhật state
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleShowInfo = (movie) => {
        setSelectedMovie(movie);
        setShowModal(true);
    };

    const handleShowTrailer = (movie) => {
        setSelectedMovie(movie);
        setIsShowModalTrailer(true)
    }

    const nextItems = () => {
        if (startIndex < items.length - 5) {
            setStartIndex(startIndex + 1);
        } else {
            setStartIndex(0); // Quay lại box đầu tiên nếu đã đến cuối
        }
    };

    const prevItems = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        } else {
            setStartIndex(items.length - 5); // Quay lại box cuối cùng nếu đã ở box đầu tiên
        }
    };

    // Hàm để chuyển các phần tử từ cuối danh sách sang đầu và ngược lại
    const rotateItems = (array, steps) => {
        return [...array.slice(steps), ...array.slice(0, steps)];
    };

    const [showTrailerButton, setShowTrailerButton] = useState(true);

    const handleMouseEnter = (index) => {
        const newShowTrailerButton = [...showTrailerButton];
        newShowTrailerButton[index] = true;
        setShowTrailerButton(newShowTrailerButton);
    };

    const handleMouseLeave = (index) => {
        const newShowTrailerButton = [...showTrailerButton];
        newShowTrailerButton[index] = false;
        setShowTrailerButton(newShowTrailerButton);
    };
    useEffect(() => {
        // Khởi tạo mảng showTrailerButton với tất cả giá trị là false
        setShowTrailerButton(Array(items.length).fill(false));
    }, [items]);

    return (
        <>
            <div className="list-box">
                <button onClick={prevItems} className="prev">&#10094;</button>
                <div className="items-box">
                    {rotateItems(listMovie, startIndex).slice(0, 5).map((movie, index) => (
                        <div key={index} className="item-box">
                            <div className='item-content'>
                                <div
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={() => handleMouseLeave(index)}
                                    onClick={() => handleShowTrailer(movie)}
                                >
                                    <img src={movie.poster} className='movie-img' alt={movie.name} onClick={() => handleShowTrailer(movie)} />
                                    {showTrailerButton[index] && (
                                        <div className='trailer-hover'>
                                            <div>View trailer</div>
                                            <br />
                                            <HiPlay style={{ fontSize: "50px" }} />
                                        </div>
                                    )}
                                </div>
                                <div style={{ marginTop: "10px", display: "flex", flexDirection: "column" }}>
                                    <div className='movieName'>Movie name: {movie.name}</div>
                                    <div>Genres: {movie.category?.name}</div>
                                </div>
                            </div>
                            <div className='btn-container'>
                                {/* <button className='buttonBooking'>Book now</button> */}
                                <button
                                    className='buttonBooking'
                                    onClick={() => handleShowInfo(movie)}  // Đảm bảo movie được cập nhật trước khi mở modal
                                >
                                    <IoIosInformationCircle /> Information
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={nextItems} className="next">&#10095;</button>
            </div>
            <InforMovie
                movie={selectedMovie}
                show={showModal}
                handleClose={() => setShowModal(false)}
            />
            <TrailerMovie
                movie={selectedMovie}
                show={isShowModalTrailer}
                handleClose={() => setIsShowModalTrailer(false)}
            />
        </>
    );
};

export default ListIncoming;
