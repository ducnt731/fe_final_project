import React, { useEffect, useState } from 'react';
import '../../style/listBox.css'; // Import CSS file
import { Button } from 'react-bootstrap';
import { IoIosInformationCircle } from "react-icons/io";
import InforMovie from './inforMovie';
import { getMovieNowShowing } from '../../service/userService';
import { useNavigate} from 'react-router-dom';
import TrailerMovie from './trailer';
import { HiPlay } from 'react-icons/hi2';

const ListCurrentMovies = ({ items }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [isShowModalTrailer, setIsShowModalTrailer] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [listMovie, setListMovie] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getAllMovieNowShowing();
  }, []);

  const getAllMovieNowShowing = async () => {
    try {
      const response = await getMovieNowShowing();
      if (response && response.data) {
        setListMovie(response.data);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // const handleClose = () => {
  //   setIsShowModalInfo(false);
  // };

  const handleShowInfo = (movie) => {
    setSelectedMovie(movie); // Cập nhật phim được chọn
    setShowModal(true); // Mở modal thông tin

  };

  const handleShowTrailer = (movie) => {
    setSelectedMovie(movie);
    setIsShowModalTrailer(true)
  }

  const nextItems = () => {
    if (startIndex < items.length - 5) {
      setStartIndex(startIndex + 1);
    } else {
      setStartIndex(0);
    }
  };

  const prevItems = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    } else {
      setStartIndex(items.length - 5);
    }
  };

  const rotateItems = (array, steps) => {
    return [...array.slice(steps), ...array.slice(0, steps)];
  };

  const handleBookNow = (movie) => {
    navigate(`/booking/${movie._id}`);
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
          {listMovie.length >= 5 &&
            rotateItems(listMovie, startIndex).slice(0, 5).map((movie, index) => (
              <div key={index} className="item-box" >
                <div className='item-content'>
                  <div
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    onClick={() => handleShowTrailer(movie)}
                  >
                    <img src={movie.poster} className='movie-img' alt={movie.name} />
                    {showTrailerButton[index] && (
                      <div className='trailer-hover'>
                        <div>View trailer</div>
                        <br />
                        <HiPlay style={{fontSize: "50px"}}/>
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: "10px", display: "flex", flexDirection: "column" }}>
                    <div className='movieName'>Movie name: {movie.name}</div>
                    <div>Genres: {movie.category?.name}</div>
                  </div>
                </div>
                <div className='btn-container'>
                  <button className='buttonBooking'
                    onClick={() => handleBookNow(movie)}
                  >Book now</button>
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
      <TrailerMovie
        movie={selectedMovie}
        show={isShowModalTrailer}
        handleClose={() => setIsShowModalTrailer(false)}
      />
    </>
  );
};

export default ListCurrentMovies;

