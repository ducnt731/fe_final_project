import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { formatDate } from '../../service/formatDate';

const EditProfile = (props) => {

    const { show, handleClose, dataEditProfile, handlEditProfile } = props
    const [userData, setUserData] = useState(dataEditProfile)
    const [showImage, setShowImage] = useState()

    useEffect(() => {
        setUserData(dataEditProfile);
        setShowImage(dataEditProfile.image || '');
    }, [dataEditProfile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    const handleImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.target.files[0]);
        reader.onload = function () {
            setShowImage(reader.result);
            // Kiểm tra xem người dùng đã chọn một tệp hình ảnh mới hay không
            if (file.target.files.length > 0) {
                // Nếu có, cập nhật ảnh mới
                setUserData({ ...userData, image: file.target.files[0] });
            } else {
                // Nếu không, giữ nguyên ảnh cũ
                setUserData({ ...userData });
            }
        };
        console.log("check image nè", userData.image);
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <div style={{ backgroundColor: "slategrey" }}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add'>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" required className="form-control" name='name' value={userData.name} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="email" required className="form-control" name='email' value={userData.email} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input type="text" required className="form-control" name='phone' value={userData.phone} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Date of birth</label>
                            <input type="date" required name='dateOfBirth' className="form-control" value={userData.dateOfBirth && formatDate(new Date(userData.dateOfBirth))} onChange={handleChange} />
                        </div>
                        <select className="form-select" required value={userData.gender} name='gender' onChange={handleChange} >
                            <option >Choose gender</option>
                            <option value={"female"}>Female</option>
                            <option value={"male"}>Male</option>
                            <option value={"other"}>Other</option>
                        </select>
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
                        handlEditProfile(userData)
                    }}>
                        Save
                    </Button>
                </Modal.Footer>
            </div>

        </Modal>
    )
}

export default EditProfile