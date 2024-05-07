import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { fetchAllCategory } from '../../service/userService';
import { useEffect, useState } from 'react';
import { formatDate } from '../../service/formatDate';

const EditMovie = (props) => {
    const { show, handleClose, handleMovieEdit, dataEditMovie } = props;
    const [showPoster, setShowPoster] = useState();
    const [movieData, setMovieData] = useState({
        name: "",
        director: "",
        performer: "",
        category: "",
        premiere: "",
        time: "",
        language: "",
        trailerUrl: "",
        status: "",
        poster: null,
    });
    const [listCategory, setListCategory] = useState([]);

    // Fetch categories when the component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetchAllCategory();
                if (response && response.data) {
                    setListCategory(response.data);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // Update local state when dataEditMovie changes
    useEffect(() => {
        if (dataEditMovie) {
            setMovieData({
                ...dataEditMovie,
                category: dataEditMovie.category ? dataEditMovie.category._id : ''
            });
            setShowPoster(dataEditMovie.poster || '');
        }
    }, [dataEditMovie]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData({ ...movieData, [name]: value });
    };

    const handlePoster = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.target.files[0]);
        reader.onload = () => {
            setShowPoster(reader.result);
            setMovieData({ ...movieData, poster: file.target.files[0] });
        };
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Movie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-add">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" required className="form-control" name='name' value={movieData.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Director</label>
                        <input type="text" required className="form-control" name='director' value={movieData.director} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Performer</label>
                        <input type="text" required className="form-control" name='performer' value={movieData.performer} onChange={handleChange} />
                    </div>
                    <select className="form-select" required value={movieData.category} name='category' onChange={handleChange} >
                        <option >Choose Category</option>
                        {listCategory && listCategory.map((category) => {
                            return (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            )
                        })}
                    </select>
                    <div className="mb-3">
                        <label className="form-label">Premiere</label>
                        <input type="date" required name='premiere' className="form-control" value={movieData.premiere && formatDate(new Date(movieData.premiere))} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Language</label>
                        <input type="text" required name='language' className="form-control" value={movieData.language} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Time</label>
                        <input type="text" required name='time' className="form-control" value={movieData.time} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">trailerUrl</label>
                        <input type="text" required name='trailerUrl' className="form-control" value={movieData.trailerUrl} onChange={handleChange} />
                    </div>
                    <select className="form-select" value={movieData.status} name='status' onChange={handleChange}>
                        <option value={"Now Showing"}>Now Showing</option>
                        <option value={"Upcoming"}>Upcoming</option>
                    </select>
                    <br />
                    <div className="mb-3">
                        <h1 className="form-label">Poster</h1>
                        <label htmlFor="formFile" style={{ width: "100px", height: "100px", borderRadius: "10px", overflow: "hidden", objectFit: 'cover', objectPosition: "center" }} className='d-flex align-items-center justify-content-center border'>
                            {showPoster ? <img src={showPoster} alt='' /> : "+"}
                        </label>
                        <input className="form-control d-none" type="file" id="formFile" name='poster' onChange={handlePoster} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {
                    handleMovieEdit(movieData)
                }}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditMovie;
