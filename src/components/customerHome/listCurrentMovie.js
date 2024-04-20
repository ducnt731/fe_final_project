import React, { useEffect, useState } from 'react';
import '../../style/listBox.css'; // Import CSS file
import { Button } from 'react-bootstrap';
import { IoIosInformationCircle } from "react-icons/io";
import InforMovie from './inforMovie';
import { getMovieNowShowing } from '../../service/userService';

const ListCurrentMovies = ({ items }) => {

  const [startIndex, setStartIndex] = useState(0);
  const [isShowModalInfo, setIsShowModalInfo] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [listMovie, setListMovie] = useState([]);

  useEffect(() => {
    getAllMovieNowShowing(); // Gọi hàm này khi component mount
  }, []);

  const getAllMovieNowShowing = async () => {
    try {
      const response = await getMovieNowShowing(); // Sử dụng API để lấy danh sách phim
      if (response && response.data) {
        setListMovie(response.data); // Cập nhật state
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
  const handleClose = () => {
    setIsShowModalInfo(false)
  }

  const handleShowInfo = (movie) => {
    setSelectedMovie(movie); // Cập nhật phim được chọn
    setShowModal(true); // Mở modal thông tin
  };

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

  // Hàm để chuyển các phần tử từ cuối danh sách sang đầu và ngược lại
  const rotateItems = (array, steps) => {
    return [...array.slice(steps), ...array.slice(0, steps)];
  };

  return (
    <>
      <div className="list-box">
        <button onClick={prevItems} className="prev">&#10094;</button>
        <div className="items-box">
          {rotateItems(listMovie, startIndex).slice(0, 4).map((movie, index) => (
            <div key={index} className="item-box">
              <div className='item-content'>
                <div >
                  <img src={movie.poster} className='movie-img' alt={movie.name} />
                </div>
                <div style={{ marginTop: "5px", display: "flex", flexDirection: "column", wordBreak: "break" }}>
                  <span>Movie name: {movie.name}</span>
                  <span>Genres: {movie.category?.name}</span>
                </div>
              </div>
              <div className='btn-container'>
                <button className='button'>Book now</button>
                <Button
                  className='buttonInfor'
                  onClick={() => handleShowInfo(movie)}  // Đảm bảo movie được cập nhật trước khi mở modal
                >
                  <IoIosInformationCircle />
                </Button>
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
    </>
  );
};

export default ListCurrentMovies;
