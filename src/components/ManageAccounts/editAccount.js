import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { addNewAccount, fetchAllCinema, fetchAllFaculty } from '../../service/userService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { formatDate } from '../../service/formatDate';

const EditAccount = (props) => {
    const { show, handleClose, handleAccountEdit, dataEditAccount } = props
    const [showImage, setShowImage] = useState()
    const [userData, setUserData] = useState(dataEditAccount)
    const [listCinema, setListCinema] = useState([])

    // console.log(dataEditAccount)
    useEffect(() => {
        setUserData({
            ...dataEditAccount,
            cinema: dataEditAccount.cinema ? dataEditAccount.cinema._id : ''
        });
        setShowImage(dataEditAccount.image || '');
    }, [dataEditAccount]);

    const getAllCinemas = async () => {
        let res = await fetchAllCinema()
        if (res) {
            setListCinema(res.data)
        }
    }
    useEffect(() => {
        getAllCinemas()
    }, [])

    useEffect(() => {
        if (dataEditAccount) {
            setUserData(dataEditAccount)
        }
    }, [dataEditAccount])

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
            <Modal.Header closeButton>
                <Modal.Title>Edit Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-add">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" required className="form-control" name='name' value={userData.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" required className="form-control" name='email' value={userData.email} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input type="text" required className="form-control" name='phone' value={userData.phone} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" disabled="true" required name='password' className="form-control" value={userData.password} onChange={handleChange} />
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
                    <br />
                    <select className="form-select" value={userData.role} name='role' onChange={handleChange}>
                        <option>Choose Role</option>
                        <option value={"customer"}>Customer</option>
                        <option value={"admin"}>Admin</option>
                        <option value={"admin cinema"}>Admin Cinema</option>
                        <option value={"staff"}>Staff</option>
                    </select>
                    {userData.role === "admin cinema" && (
                        <select className="form-select" required value={userData.cinema} name='cinema' onChange={handleChange} >
                            <option >Choose Cinema</option>
                            {listCinema && listCinema.map((cinmea) => {
                                return (
                                    <option key={cinmea._id} value={cinmea._id}>{cinmea.name}</option>
                                )
                            })}
                        </select>
                    )}
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
                    handleAccountEdit(userData)
                }}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditAccount

