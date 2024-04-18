import React, { useState } from 'react';
import '../../style/listBox.css'; // Import CSS file
import { Button } from 'react-bootstrap';
import { IoIosInformationCircle } from "react-icons/io";
import InforMovie from './inforMovie';

const ListIncoming = ({ items }) => {
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
                <div className="items-box">
                    {items.slice(startIndex, startIndex + 4).map((item, index) => (
                        <div key={index} className="item-box">
                            <div className='item-content'>
                                <img src='https://congthanh.vn/uploads/images/in-poster-phim-anh-dep-.jpg' className='movie-img' />
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
                    <div className="item-box">
                        <div className='item-content'>
                            <img src='https://congthanh.vn/uploads/images/in-poster-phim-anh-dep-.jpg' className='movie-img' />
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

export default ListIncoming;
