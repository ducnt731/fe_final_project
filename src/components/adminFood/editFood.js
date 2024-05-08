import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

const EditFood = (props) => {

    const { show, handleClose, handleEditFood, dataEditFood } = props
    const [showImage, setShowImage] = useState()
    const [foodData, setFoodData] = useState(dataEditFood)

    useEffect(() => {
        setFoodData({...dataEditFood})
        setShowImage(dataEditFood.image || '')
    }, [dataEditFood])

    useEffect(() => {
        if (dataEditFood) {
            setFoodData(dataEditFood)
        }
    }, [dataEditFood])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFoodData({ ...foodData, [name]: value });
    };

    const handleImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.target.files[0]);
        reader.onload = function () {
            setShowImage(reader.result);
            // Kiểm tra xem người dùng đã chọn một tệp hình ảnh mới hay không
            if (file.target.files.length > 0) {
                // Nếu có, cập nhật ảnh mới
                setFoodData({ ...foodData, image: file.target.files[0] });
            } else {
                // Nếu không, giữ nguyên ảnh cũ
                setFoodData({ ...foodData });
            }
        };
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Food Combo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="body-add">
                    <div className="mb-3">
                        <label className="form-label">Combo's name</label>
                        <input type="text" required className="form-control" name='name' value={foodData.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input type="text" required className="form-control" name='price' value={foodData.price} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <h1 className="form-label">Image</h1>
                        <label htmlFor="formFile" style={{ width: "100px", height: "100px", borderRadius: "10px", overflow: "hidden", objectFit: 'cover', objectPosition: "center" }} className='d-flex align-items-center justify-content-center border'>
                            {showImage ? <img src={showImage} alt='' /> : "+"}
                        </label>
                        <input className="form-control d-none" type="file" id="formFile" name='image' onChange={handleImage} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {
                    handleEditFood(foodData)
                }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditFood