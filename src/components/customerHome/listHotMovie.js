import React, { useState } from 'react';
import '../../style/listBox.css'; // Import CSS file
import { Button } from 'react-bootstrap';
import { IoIosInformationCircle } from "react-icons/io";
import InforMovie from './inforMovie';

const ListHotMovie = ({ items }) => {

    const [startIndex, setStartIndex] = useState(0);
    const [isShowModalInfo, setIsShowModalInfo] = useState(false)

    const handleClose = () => {
        setIsShowModalInfo(false)
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

    return (
        <>
            <div className="list-box">
                <button onClick={prevItems} className="prev">&#10094;</button>
                <div className="items">
                    {items.slice(startIndex, startIndex + 4).map((item, index) => (
                        <div key={index} className="item">
                            <div className='item-content'>
                                <img src='https://arena.fpt.edu.vn/wp-content/uploads/2021/04/5-yeu-to-tao-nen-mot-poster-phim-an-tuong.jpeg' className='movie-img' />
                                {item}
                                <span>ten phim</span>
                                <span>the loai</span>
                            </div>
                            <div className='btn-container'>
                                <button className='button'>Book now</button>
                                <Button
                                    className='buttonInfor'
                                    onClick={() => setIsShowModalInfo(true)}
                                ><IoIosInformationCircle /></Button>
                            </div>
                        </div>
                    ))}
                    <div className="item">
                        <div className='item-content'>
                            <img src='https://arena.fpt.edu.vn/wp-content/uploads/2021/04/5-yeu-to-tao-nen-mot-poster-phim-an-tuong.jpeg' className='movie-img' />
                            {items[(startIndex + 4) % items.length]} {/* Box 1 sẽ hiển thị sau phần tử cuối cùng */}
                            <span>ten phim</span>
                            <span>the loai</span>
                        </div>
                        <div className='btn-container'>
                            <button className='button'>Book now</button>
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
        </>
    );
};

export default ListHotMovie;
