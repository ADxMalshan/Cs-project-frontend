// components/LoginModal.jsx
import "./client/css/loginPage.css"
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { GrGoogle } from "react-icons/gr";
import RegisterModal from "./registerPage";

export default function LoginModal({ onClose }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [registerPopup, setRegisterPopup] = useState(false)
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
                    console.log(response.data.token);
                    const user = response.data.user;
                    const newUser = response.data.usercreated;
                    // console.log(response.data.usercreated)
                    if (user.role === "admin" || user.role == "superadmin") {
                        navigate("/");
                    } else {
                        navigate("/");
                    }
                    console.log("Login successful", response.data);
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
                                            welcome back to the CBC! we missed you.
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
                // console.log("Login successful", response.data);
                localStorage.setItem("token", response.data.token);
                onClose()
                console.log(response.data.token);
                // setIsLoggedIn(false)

                const user = response.data.user;
                // console.log(user.profilePicture);
                if (user.role === "admin" || user.role === "superadmin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
                setLoading(false);
                navigate(0);
                // toast.custom(
                //     (t) => (
                //         <div
                //             className={`${t.visible ? 'animate-slide-in-left' : 'animate-slide-out-left'
                //                 } max-w-md w-[360px] bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                //         >

                //             <div className="flex-1 w-0 p-4">
                //                 <div className="flex items-start">
                //                     <div className="flex-shrink-0 pt-0.5">
                //                         <img
                //                             className="h-10 w-10 rounded-full"
                //                             src={user.profilePicture}
                //                             alt="loginBackground3.jpeg"
                //                         />
                //                     </div>
                //                     <div className="ml-3 flex-1">
                //                         <p className="text-sm font-medium text-gray-900 flex">
                //                             <span className="text-[var(--color-accent)] mr-2 text-lg capitalize" >HELLOW  </span> <span className="text-lg capitalize">{response.data.user.firstName}</span>
                //                         </p>
                //                         <p className="mt-1 text-sm text-gray-500">
                //                             welcome back to the app! we missed you.
                //                         </p>
                //                     </div>
                //                 </div>
                //             </div>

                //         </div>
                //     ))


            })
            .catch((error) => {
                console.log("Login failed", error.response.data);
                toast.error(error.response.data.message || "Login failed");
                setLoading(false);
            });
    }


    return (
        <div className="main">
            <div className="container">
                <div className="text-section">
                    <img src="https://vzkmtbdcbuxxtsmnjwcl.supabase.co/storage/v1/object/public/images/Hailuo_image_459003758819971073.jpg" alt="" />
                </div>
                <div className="form-section">
                    <div className="main-inputs">
                        <div className="input-fields">
                            <input
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                className="w-[400px] h-[50px] border mt-3 border-gray-300 rounded-3xl text-center m-[5px] peer placeholder-transparent text-sm focus:outline-none focus:border-[var(--color-accent)] transition "
                                type="email"
                                placeholder="E-mail"
                                id="email"
                            />
                            <label htmlFor="email" className="absolute left-7 top-0 bg-white  text-gray-500 text-sm transition-all  peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-[var(--color-accent)] peer-focus:top-0 peer-focus:text-sm peer-focus:text-[var(--color-accent)] peer-focus:bg-[var(--color-primary)]">
                                E-mail
                            </label>
                        </div>
                        <div className="input-fields">
                            <input
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                className="w-[400px] h-[50px] border mt-3 border-gray-300 rounded-3xl text-center m-[5px] peer placeholder-transparent text-sm focus:outline-none focus:border-[var(--color-accent)] transition  "
                                type="password"
                                id="password"
                                placeholder="Password"
                            />
                            <label htmlFor="Password" className="absolute left-7 top-0 bg-[var(--color-primary)] text-gray-500 text-sm transition-all  peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-[var(--color-accent)] peer-focus:top-0 peer-focus:text-sm peer-focus:text-[var(--color-accent)] peer-focus:bg-[var(--color-primary)]">
                                Password

                            </label>

                        </div>
                    </div>

                    <div className="button-section">

                        <button
                            onClick={handleLogin}
                            className={`${loading ? "cursor-not-allowed " : "cursor-pointer"}' w-[400px] h-[50px] mt-[10px] bg-green-500 text-white rounded-3xl '`}
                        >
                            {loading ? "Loading..." : "Login"}
                        </button>
                        <button
                            onClick={loginWithGoogle}
                            className={`${loading ? "cursor-not-allowed " : "cursor-pointer"}' mt-[20px] w-[400px] h-[50px] bg-green-500 text-white rounded-3xl '`}
                        >
                            <GrGoogle className="inline-block mr-[10px]" /> {loading ? "Loading..." : "Login with Google"}
                        </button>

                        <p className="text-gray-600 text-center mt-4 mr-6">
                            Don't have an account yet? &nbsp;
                            <span className="text-green-500  cursor-pointer hover:text-green-700">
                                <button onClick={() => {
                                    setRegisterPopup(true)
                                }} >Register Now</button>
                            </span>
                        </p>
                    </div>

                </div>
            </div>
            {registerPopup && <RegisterModal onClose={() => setRegisterPopup(false)} />}
        </div>
    );
}
