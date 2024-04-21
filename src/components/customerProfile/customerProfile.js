import React, { useEffect, useState } from "react";
import '../../style/profile.css';
import { FiEdit3 } from "react-icons/fi";
import EditProfile from "./editProfile";
import ChangePassword from "./changePassword";
import { FaCamera } from "react-icons/fa";
import { editProfile, fetchDetailUser } from "../../service/userService";
import { toast } from "react-toastify";

const Profile = () => {
    const [isShowModalEditProfile, setIsShowModalEditProfile] = useState(false)
    const [isShowModalChangePass, setIsShowModalChangePass] = useState(false)
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);
    const [dataEdit, setDataEdit] = useState({})
    const [userDetails, setUserDetails] = useState(null);


    useEffect(() => {
        const loadUserDetails = async () => {
            try {
                const response = await fetchDetailUser();
                console.log(response)
                if (response && response.data) {
                    setUserDetails(response.data); // Cập nhật state với dữ liệu người dùng nhận được
                }
            } catch (error) {
                console.error('Failed to fetch user details:', error);
            }
        };

        loadUserDetails(); // Gọi hàm để load thông tin người dùng
    }, [isProfileUpdated]);

    const handleClose = () => {
        setIsShowModalEditProfile(false)
        setIsShowModalChangePass(false)
    }
    const handleEdit = (accountEdit) => {
        setDataEdit(accountEdit)
        setIsShowModalEditProfile(true)
    }
    const handleEditFromModal = async (dataEdit) => {
        try {
            // Tạo một FormData từ dữ liệu chỉnh sửa
            const formData = new FormData();
            formData.append('id', dataEdit._id);
            formData.append('name', dataEdit.name);
            formData.append('email', dataEdit.email);
            formData.append('phone', dataEdit.phone);
            formData.append('dateOfBirth', dataEdit.dateOfBirth);
            formData.append('gender', dataEdit.gender);

            // if (dataEdit.image) {
            //     formData.append('image', dataEdit.image);
            // }
            if (dataEdit.image && dataEdit.image instanceof File) {
                formData.append('image', dataEdit.image);
            }
            // Gọi hàm editAccount với FormData đã tạo
            const response = await editProfile(formData);
            if (response) {
                setIsProfileUpdated(!isProfileUpdated);
                setIsShowModalEditProfile(false);
                toast.success("Edit success!");
            }
        } catch (error) {
            toast.error("Edit error");
        }
    }
    return (
        <>
            <div className="profile-container">
                <div className="profile">
                    <div className="profile-top">
                        <div style={{ position: "absolute", top: "70px", left: "36%" }}>
                            <img src={userDetails?.image || 'default-avatar.png'} alt="Profile" />
                        </div>
                    </div>
                    "kdjhákd"
                    <div className="profile-bot">
                        <div className="Info">Customer's information</div>
                        <div className="inforCus">
                            <div className="info-left">
                                <div>Full name</div>
                                <div style={{ marginBottom: "15px", color: "#9cdb95" }}>{userDetails?.name}</div>
                                <div>Date of birth</div>
                                <div style={{ marginBottom: "15px", color: "#9cdb95" }}>{new Date(userDetails?.dateOfBirth).toLocaleDateString()}</div>
                                <div>Phone number</div>
                                <div style={{ marginBottom: "15px", color: "#9cdb95" }}>{userDetails?.phone}</div>
                            </div>
                            <div className="info-right">
                                <div>Email</div>
                                <div style={{ marginBottom: "15px", color: "#9cdb95" }}>{userDetails?.email}</div>
                                <div>Gender</div>
                                <div style={{ marginBottom: "15px", color: "#9cdb95" }}>{userDetails?.gender}</div>
                            </div>
                            <div style={{ marginLeft: "50px", marginTop: "150px" }}>
                                <button
                                    className="buttonEdit"
                                    onClick={() => handleEdit(userDetails)}
                                >Edit profile <FiEdit3 /></button>
                                <button
                                    className="buttonChange"
                                    onClick={() => setIsShowModalChangePass(true)}
                                >Change password <FiEdit3 /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EditProfile
                show={isShowModalEditProfile}
                dataEditProfile={dataEdit}
                handlEditProfile={handleEditFromModal}
                handleClose={handleClose}
            />
            <ChangePassword
                show={isShowModalChangePass}
                handleClose={handleClose}
            />
        </>
    );
}

export default Profile;
