import React, { useState } from 'react';
import '../../style/listBox.css'; // Import CSS file
import { Button } from 'react-bootstrap';
import { IoIosInformationCircle } from "react-icons/io";
import InforMovie from './inforMovie';
import TrailerMovie from './trailer';

const ListHotMovie = ({ items }) => {

    const [startIndex, setStartIndex] = useState(0);
    const [isShowModalInfo, setIsShowModalInfo] = useState(false)
    const [isShowModalTrailer, setIsShowModalTrailer] = useState(false)

    const handleClose = () => {
        setIsShowModalInfo(false)
        setIsShowModalTrailer(false)
    }

    const nextItems = () => {
        if (startIndex < items.length - 4) {
            setStartIndex(startIndex + 1);
        } else {
            setStartIndex(0); // Quay lại box đầu tiên nếu đã đến cuối
        }
    };

    const prevItems = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        } else {
            setStartIndex(items.length - 4); // Quay lại box cuối cùng nếu đã ở box đầu tiên
        }
    };

    const [showTrailerButton, setShowTrailerButton] = useState(false);

    const handleMouseEnter = () => {
        setShowTrailerButton(true);
    };

    const handleMouseLeave = () => {
        setShowTrailerButton(false);
    };

    const openTrailer = () => {
        // Code để mở trailer, ví dụ: mở một modal chứa video trailer
        alert('Mở trailer'); // Đây chỉ là một thông báo, bạn cần thay thế bằng mã JavaScript thực tế để mở trailer.
    };

    return (
        <>
            <div className="list-box">
                <button onClick={prevItems} className="prev">&#10094;</button>
                <div className="items-box">
                    {items.slice(startIndex, startIndex + 4).map((item, index) => (
                        <div key={index} className="item-box">
                            <div className='item-content'>
                                <img
                                    src='https://arena.fpt.edu.vn/wp-content/uploads/2021/04/5-yeu-to-tao-nen-mot-poster-phim-an-tuong.jpeg' className='movie-img'
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave} 
                                    onClick={() => setIsShowModalTrailer(true)}
                                    />

                                {showTrailerButton && (
                                    <div className='trailer-hover'>
                                        <div>View trailer</div>
                                        {/* <button className="trailer-button" onClick={() => setIsShowModalTrailer(true)}>
                                            Xem trailer
                                        </button> */}
                                    </div>
                                )}
                                {item}
                                <span>ten phim</span>
                                <span>the loai</span>
                            </div>
                            <div className='btn-container'>
                                <button className='buttonBooking'>Book now</button>
                                <Button
                                    className='buttonInfor'
                                    onClick={() => setIsShowModalInfo(true)}
                                ><IoIosInformationCircle /></Button>
                            </div>
                        </div>
                    ))}
                    <div className="item-box">
                        <div className='item-content'>
                            <img src='https://arena.fpt.edu.vn/wp-content/uploads/2021/04/5-yeu-to-tao-nen-mot-poster-phim-an-tuong.jpeg' className='movie-img' />
                            {items[(startIndex + 4) % items.length]} {/* Box 1 sẽ hiển thị sau phần tử cuối cùng */}
                            <span>ten phim</span>
                            <span>the loai</span>
                        </div>
                        <div className='btn-container'>
                            <button className='buttonBooking'>Book now</button>
                            <Button
                                className='buttonInfor'
                                onClick={() => setIsShowModalInfo(true)}
                            ><IoIosInformationCircle /></Button>
                        </div>
                    </div>
                </div>
                <button onClick={nextItems} className="next">&#10095;</button>
            </div>
            <InforMovie
                show={isShowModalInfo}
                handleClose={handleClose}
            />
            <TrailerMovie
                show={isShowModalTrailer}
                handleClose={handleClose}
            />
        </>
    );
};

export default ListHotMovie;
