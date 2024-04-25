import React, { useState } from "react";
import { toast } from "react-toastify";
import "../style/loginForm.css";
import { loginApi } from "../service/userService";
import { Link, useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { FcGoogle } from "react-icons/fc";
import { jwtDecode } from 'jwt-decode'


const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPass, setIsShowPass] = useState(false);
    const [loadingAPI, setLoadingAPI] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email, password);
        if (!email || !password) {
            toast.error("You need to enter the email and password");
            return;
        }
        setLoadingAPI(true);
        let res = await loginApi(email, password);
        console.log(res.data);
        try {
            const data = res.data;
            if (data) {
                localStorage.setItem("email", data.user.email);
                localStorage.setItem("name", data.user.name);
                localStorage.setItem("role", data.user.role);
                localStorage.setItem("user_id", data.user._id);
                localStorage.setItem("accessToken", data.accessToken);
                if (data.user.role === "admin") {
                    navigate("/admin");
                    toast.success("Login successful!!!");
                } else if (data.user.role === "customer") {
                    navigate("/home");
                    toast.success("Login successful!!!");
                } else if (data.user.role === "admin cinema") {
                    navigate("/admin-cinema");
                    toast.success("Login successful!!!");
                } else {
                    toast.error("You must be a role admin/marketing to render this site");
                }
            }
        } catch (error) {
            toast.error(res.data.message);
        }
        setLoadingAPI(false);
    };
    const loginWithGoogle = (e) => {
        e.preventDefault(); // Prevent the form submission

        // Listen for the Google login response in the window
        const googleLoginWindow = window.open(
            'https://dc-cinema.onrender.com/auth/google',
            '_blank'
        );

        // Poll the popup window to check for successful login
        const pollTimer = window.setInterval(function () {
            try {
                if (googleLoginWindow.closed) {
                    toast.error("Google login was closed!");
                    window.clearInterval(pollTimer);
                    return;
                }

                if (googleLoginWindow.location.host === window.location.host) {
                    // We are back on our site, so the login process is complete.
                    const url = new URL(googleLoginWindow.location);
                    const token = url.searchParams.get('token');

                    console.log("object", token)
                    if (token) {
                        // Here you would verify the token and get the user's data
                        const payload = jwtDecode(token); // Assuming jwt-decode library is used
                        // console.log("payload", payload)
                        // Store user info and token in localStorage
                        localStorage.setItem("googleId", payload.googleId);
                        localStorage.setItem("email", payload.email);
                        localStorage.setItem("name", payload.name);
                        localStorage.setItem("role", payload.role);
                        localStorage.setItem("user_id", payload.userId);
                        localStorage.setItem("accessToken", token);
                        if (payload.role === "customer") {
                            navigate("/home");
                        } else if (payload.role === "admin") {
                            navigate("/admin");
                        }
                        toast.success("Login successful!!!");
                    } else {
                        toast.error("Failed to get authentication token!");
                    }

                    window.clearInterval(pollTimer);
                    googleLoginWindow.close();
                }
            } catch (error) {
                // Errors are ignored since the error means the login window has not redirected back yet.
            }
        }, 100);
    };
    return (
        <div className="wrapper">
            <div className="login-form">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <i className="fa-solid fa-user icon"></i>
                    </div>
                    <div className="input-box">
                        <input
                            type={isShowPass === true ? "text" : "password"}
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <i
                            className={
                                isShowPass === true
                                    ? "fa-solid fa-eye icon"
                                    : "fa-solid fa-eye-slash icon"
                            }
                            onClick={() => setIsShowPass(!isShowPass)}
                        ></i>
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <a href="/forgot-password">Forgot password</a>
                    </div>
                    <button className="buttonLogin" type="submit" disabled={email && password ? false : true}>
                        Login {loadingAPI && <Spinner animation="border" variant="info" size="sm" />}
                    </button>
                    <button className="btn-google" type="submit" onClick={loginWithGoogle}>
                        Login with Google <FcGoogle />
                    </button>
                    <div className="register-link">
                        <p>Don't have an account? <a href="/register">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;
