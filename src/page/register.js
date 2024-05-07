import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { registerApi } from "../service/userService"
import "../style/registerForm.css"
import Spinner from 'react-bootstrap/Spinner';

const RegisterForm = () => {

    const [data, setData] = useState({ role: 'customer', gender: 'female' })
    const [isShowPass, setIsShowPass] = useState(false)
    const [loadingAPI, setLoadingAPI] = useState(false)
    const navigate = useNavigate()
console.log(">>>>", data);
    const handleChange = (e) => {
        // Kiểm tra xem giá trị nhập vào có phải là số không
        // if (/^\d*$/.test(e.target.value)) {
        //   // Nếu là số, cập nhật state
        //     setData({ ...data, [e.target.name]: e.target.value })
        // }
        setData({ ...data, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        let token = localStorage.getItem("token")
        if (token) {
            navigate("/login")
        }
    }, [])

    const handleRegister = async (e) => {
        e.preventDefault()
        // console.log(data)
        let check = false
        Object.keys(data).map((key) => {
            console.log(data[key])
            if (!data[key] || data[key] === '') {
                check = true
            }
        })
        if (!check) {
            try {
                setLoadingAPI(true)
                let res = await registerApi(data)
                console.log(">>>ch",res)
                if ( res.status===400) {
                    toast.error(res.data.error)
                }else{
                    toast.success("Register success!")
                    navigate("/login")
                }
            } catch (error) {
                console.log(">>>check", error);
            }
        } else {
            toast.error("You need to enter all field!")
        }
        setLoadingAPI(false)
    }

    return (
        <div className="wrapper">
            <div className="login-form">
                <form onSubmit={handleRegister}>
                    <h1>Sign up</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full name" required
                            value={data && data.name}
                            onChange={handleChange}
                        />

                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone" required
                            value={data && data.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email" required
                            value={data && data.email}
                            onChange={handleChange}
                        />

                    </div>
                    <div className="input-box">
                        <input
                            type={isShowPass === true ? "text" : "password"}
                            name="password"
                            placeholder="Password" required
                            value={data && data.password}
                            onChange={handleChange}
                        />
                        <i className={isShowPass === true ? "fa-solid fa-eye icon" : "fa-solid fa-eye-slash icon"}
                            onClick={() => setIsShowPass(!isShowPass)}
                        ></i>
                    </div>
                    <div className="input-box">
                        <input
                            type="date"
                            name="dateOfBirth"
                            placeholder="Date Of Birth" required
                            value={data && data.dateOfBirth}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-box">
                        <select name="gender" value={data && data.gender} className="form-select-gender" onChange={handleChange} placeholder="Gender">
                            <option value={"female"}>Female</option>
                            <option value={"male"}>Male</option>
                            <option value={"other"}>Other</option>
                        </select>
                    </div>
                        <button
                            type="submit"
                            className="buttonLogin"
                        >Register {loadingAPI && <Spinner animation="border" variant="info" size="sm"/>}</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm