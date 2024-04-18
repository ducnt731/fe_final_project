import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { fetchAllCategory } from '../../service/userService';
import { useEffect, useState } from 'react';
import { formatDate } from '../../service/formatDate';

const EditMovie = (props) => {
    const { show, handleClose, handleMovieEdit, dataEditMovie } = props;
    const [showPoster, setShowPoster] = useState();
    const [movieData, setMovieData] = useState(dataEditMovie);
    const [listCategory, setListCategory] = useState([]);

    useEffect(() => {
        setMovieData(dataEditMovie);
        setShowPoster(dataEditMovie.poster || '');
    }, [dataEditMovie]);

    const getAllCategory = async () => {
        let res = await fetchAllCategory();
        if (res) {
            setListCategory(res.data);
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData({ ...movieData, [name]: value });
    };

    const handlePoster = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.target.files[0]);
        reader.onload = function () {
            setShowPoster(reader.result);
            // Kiểm tra xem người dùng đã chọn một tệp hình ảnh mới hay không
            if (file.target.files.length > 0) {
                // Nếu có, cập nhật ảnh mới
                setMovieData({ ...movieData, poster: file.target.files[0] });
            } else {
                // Nếu không, giữ nguyên ảnh cũ
                setMovieData({ ...movieData });
            }
        };
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Account</Modal.Title>
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
                        {/* <option >Choose Category</option> */}
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
                        <label className="form-label">Time</label>
                        <input type="text" required name='time' className="form-control" value={movieData.time} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">trailerUrl</label>
                        <input type="text" required name='trailerUrl' className="form-control" value={movieData.trailerUrl} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        <input type="text" required name='status' className="form-control" value={movieData.status} onChange={handleChange} />
                    </div>
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
