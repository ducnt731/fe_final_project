import React, { useEffect, useState } from 'react';
import '../../style/listBox.css'; // Import CSS file
import { Button } from 'react-bootstrap';
import { IoIosInformationCircle } from "react-icons/io";
import InforMovie from './inforMovie';
import { getMovieNowShowing } from '../../service/userService';

const ListCurrentMovies = ({ items }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [isShowModalInfo, setIsShowModalInfo] = useState(false);
  const [listMovie, setListMovie] = useState([]);

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

  const handleClose = () => {
    setIsShowModalInfo(false);
  };

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

  return (
    <>
      <div className="list-box">
        <button onClick={prevItems} className="prev">&#10094;</button>
        <div className="items-box">
          {listMovie.length >= 5 &&
            rotateItems(listMovie, startIndex).slice(0, 5).map((movie, index) => (
              <div key={index} className="item-box">
                <div className='item-content'>
                  <div>
                    <img src={movie.poster} className='movie-img' alt={movie.name} />
                  </div>
                  <span>Movie name: {movie.name}</span>
                  <span>Genres: {movie.category?.name}</span>
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

export default ListCurrentMovies;

