import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import { useEffect, useRef, useState } from "react";

const AddFood = (props) => {

    const { show, handleClose, handleAddNewFood, foodData, setFoodData } = props
    const [showImage, setShowImage] = useState()
    const [listCinema, setListCinema] = useState([])

    useEffect(() => {
        if (!foodData.image) {
            setShowImage(null)
        }
    }, [foodData])
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFoodData({ ...foodData, [name]: value })
    }

    const handleImage = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.target.files[0])
        reader.onload = function () {
            setShowImage(reader.result)
            setFoodData({ ...foodData, image: file.target.files[0] })
        };
    }

    return (

        <Modal show={show} onHide={handleClose}>

            <Modal.Header closeButton>
                <Modal.Title>New Food Combo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-add">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
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
                        <input required className="form-control d-none" type="file" id="formFile" name='image' onChange={handleImage} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={async () => {
                    handleAddNewFood(foodData)

                }}>
                    Save
                </Button>
            </Modal.Footer>

        </Modal>


    )
}

export default AddFood