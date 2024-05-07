import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { formatDate } from "../../service/formatDate"
import { fetchAllCinema, fetchAllCinemaNotPagination } from '../../service/userService';

const AddAccount = (props) => {

    const { show, handleClose, handleAddNewAccount } = props
    const [showImage, setShowImage] = useState()
    const [selectedFile, setSelectedFile] = useState(null);
    const [listCinema, setListCinema] = useState([])
    const [userData, setUserData] = useState({
        name: "",
        password: "",
        email: "",
        phone: "",
        role: "",
        cinema: "",
        dateOfBirth: "",
        gender: "",
        image: null
    })

    // const getAllFaculty = async () => {
    //     let res = await fetchAllFaculty()
    //     if (res) {
    //         setListFaculty(res.data)

    //     }
    // }
    // useEffect(() => {
    //     getAllFaculty()
    // }, [])
    const getAllCinemas = async () => {
        let res = await fetchAllCinemaNotPagination()
        if (res) {
            setListCinema(res.data)
        }
    }
    useEffect(() => {
        getAllCinemas()
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }
    const handleImage = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.target.files[0])
        reader.onload = function () {
            setShowImage(reader.result)
            setUserData({ ...userData, image: file.target.files[0] })
        };
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Account</Modal.Title>
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
                        <input type="password" required name='password' className="form-control" value={userData.password} onChange={handleChange} />
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
                    {userData.role === "admin cinema" || userData.role === "staff" && (
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
                    handleAddNewAccount(userData)
                }}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddAccount