import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { forgotPasswordApi } from "../service/userService";

const ForgotPassword = () => {

    const [data, setData] = useState()
    const [loadingAPI, setLoadingAPI] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        let token = localStorage.getItem("token")
        if (token) {
            navigate("/")
        }
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()
        let check = false
        Object.keys(data).map((key) => {
            console.log(data[key])
            if (!data[key] || data[key] == '') {
                check = true
            }
        })
        if (!check) {
            try {
                setLoadingAPI(true)
                let res = await forgotPasswordApi(data)
                if (res) {
                    toast.success("Please check your email!")
                }
            } catch (error) {
            }
        } else {
            toast.error("You need to enter all field!")
        }
        // if (res && res.token) {
        //     localStorage.setItem("token", res.token)
        //     navigate("/")
        // } else {
        //     if (res && res.status === 400) {
        //         toast.error(res.data.error)
        //     }
        // }
        setLoadingAPI(false)
    }
    return (
        <div className="wrapper">
            <div className="login-form">
                <form onSubmit={handleLogin}>
                    <h1>Forgot Password</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email" required
                            value={data && data.email}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                    >{loadingAPI && <i class="fa-solid fa-sync fa-spin"></i>} Send now</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword