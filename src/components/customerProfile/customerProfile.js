import React, { useState } from "react";
import '../../style/profile.css';
import { FiEdit3 } from "react-icons/fi";
import EditProfile from "./editProfile";
import ChangePassword from "./changePassword";
import { FaCamera } from "react-icons/fa";

const Profile = () => {

    const [isShowModalEditProfile, setIsShowModalEditProfile] = useState(false)
    const [isShowModalChangePass, setIsShowModalChangePass] = useState(false)

    const handleClose = () => {
        setIsShowModalEditProfile(false)
        setIsShowModalChangePass(false)
    }

    return (
        <>
            <div className="profile-container">
                <div className="profile">
                    <div className="profile-top">
                        <div style={{ position: "absolute", top: "70px", left: "36%" }}>
                            <img src="https://th.bing.com/th/id/R.db79993ebe75e9cb5486f43172ba0961?rik=F%2fxs2MZLmRt9YQ&riu=http%3a%2f%2fwww.cineavatar.it%2fwp-content%2fuploads%2f2015%2f06%2fcinema-ted-2-02.jpg&ehk=l%2blDUXtPJS4HgGezb8NSk1A8279uTJzS7yTvRjXrxOg%3d&risl=&pid=ImgRaw&r=0" />
                            <button className="buttonImage"><FaCamera /></button>
                        </div>
                    </div>
                    <div className="profile-bot">
                        <div className="Info">Customer's information</div>
                        <div className="inforCus">
                            <div className="info-left">
                                <div>Full name</div>
                                <div style={{ marginBottom: "15px", color: "#9cdb95" }}>Nguyen Tien Duc</div>
                                <div>Date of birth</div>
                                <div style={{ marginBottom: "15px", color: "#9cdb95" }}>07/03/2001</div>
                                <div >Phone number</div>
                                <div style={{ marginBottom: "15px", color: "#9cdb95" }}>1234567890</div>
                            </div>
                            <div className="info-right">
                                <div>Email</div>
                                <div style={{ marginBottom: "15px", color: "#9cdb95" }}>ducnt0703@gmail.com</div>
                                <div>Gender</div>
                                <div style={{ marginBottom: "15px", color: "#9cdb95" }}>Male</div>
                            </div>
                            <div style={{ marginLeft: "50px", marginTop: "150px" }}>
                                <button
                                    className="buttonEdit"
                                    onClick={() => setIsShowModalEditProfile(true)}
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
                handleClose={handleClose}
            />
            <ChangePassword
                show={isShowModalChangePass}
                handleClose={handleClose}
            />
        </>
    )
}

export default Profile