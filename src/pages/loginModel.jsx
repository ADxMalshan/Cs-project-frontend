// components/LoginModal.jsx
import "./client/css/loginPage.css"
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";

export default function LoginModal({ onClose }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();


    // Google login configuration
    const loginWithGoogle = useGoogleLogin({
        onSuccess: (res) => {
            setLoading(true);
            axios
                .post(import.meta.env.VITE_BACKEND_URL + "/api/user/google", {
                    accessToken: res.access_token,
                })
                .then((response) => {
                    localStorage.setItem("token", response.data.token);
                    const user = response.data.user;
                    const newUser = response.data.usercreated;
                    if (user.role === "admin" || user.role == "superadmin") {
                        navigate("/admin");
                    } else {
                        navigate("/");
                    }
                    toast.custom((t) => (
                        <div
                            className={`toast-container ${t.visible ? "slide-in-left" : "slide-out-left"
                                }`}
                        >
                            <div className="toast-content">
                                <div className="toast-body">
                                    <img
                                        className="toast-avatar"
                                        src={user.profilePicture}
                                        alt="profile"
                                    />

                                    <div className="toast-text">
                                        <p className="toast-title">
                                            <span className="toast-accent">HELLOW</span>
                                            <span className="toast-name">
                                                {response.data.user.firstName}
                                            </span>
                                        </p>

                                        <p className={`toast-subtitle ${newUser ? "hidden" : ""}`}>
                                            welcome back to the PAW PET Clinic! we missed you.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="toast-action">
                                <button
                                    onClick={() => toast.dismiss(t.id)}
                                    className="toast-close-btn"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    ));


                    setLoading(false);
                });
        },
    });

    function handleLogin() {
        setLoading(true);
        axios
            .post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
                email: email,
                password: password,
            })
            .then((response) => {
                localStorage.setItem("token", response.data.token)
                // setIsLoggedIn(false)

                const user = response.data.user;
                if (user.role === "admin" || user.role === "superadmin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
                setLoading(false);
                toast.custom(
                    (t) => (
                        <div
                            className={`toast-container ${t.visible ? "slide-in-left" : "slide-out-left"
                                }`}
                        >
                            <div className="toast-content">
                                <div className="toast-body">
                                    <img
                                        className="toast-avatar"
                                        src={user.profilePicture}
                                        alt="profile"
                                    />

                                    <div className="toast-text">
                                        <p className="toast-title">
                                            <span className="toast-accent">HELLOW</span>
                                            <span className="toast-name">
                                                {response.data.user.firstName}
                                            </span>
                                        </p>

                                        <p>
                                            welcome back to the PAW PET Clinic ! we missed you.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="toast-action">
                                <button
                                    onClick={() => toast.dismiss(t.id)}
                                    className="toast-close-btn"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    ))


            })
            .catch((error) => {
                console.log("Login failed", error);
                toast.error(error.response.data.message || "Login failed");
                setLoading(false);
            });
    }


    return (
        <div className="main">
            <div className="login-wrapper">

                {/* LEFT IMAGE */}
                <div className="image-section">
                    <img
                        src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e"
                        alt="pet"
                    />
                </div>

                {/* RIGHT FORM */}
                <div className="form-section">

                    <h2 className="login-title">Login to Paws & Care</h2>
                    <p className="login-subtitle">
                        Welcome back! Please login to your account.
                    </p>

                    <div className="main-inputs">

                        <div className="input-fields">
                            <input
                                type="email"
                                id="email"
                                placeholder=""
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="email">E-mail</label>
                        </div>

                        <div className="input-fields">
                            <input
                                type="password"
                                id="password"
                                placeholder=""
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                    </div>

                    <p className="forgot">Forgot Password?</p>

                    <div className="button-section">

                        <button onClick={handleLogin}>
                            {loading ? "Loading..." : "Login"}
                        </button>

                        <button onClick={loginWithGoogle}>
                            <GrGoogle className="google-icon" />
                            {loading ? "Loading..." : "Login with Google"}
                        </button>

                        <p className="register-text">
                            Don't have an account yet?
                            <span onClick={() => navigate("/register")}>
                                Register Now
                            </span>
                        </p>

                    </div>

                </div>
            </div>
        </div>
    );
}
