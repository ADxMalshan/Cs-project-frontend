// components/LoginModal.jsx
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";

export default function RegisterModal({ onClose }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleRegister() {
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
        };

        axios
            .post(import.meta.env.VITE_BACKEND_URL + "/api/user/", payload)
            .then((response) => {
                console.log("Registration successful", response.data);
                toast.success("Registration successful");
            })
            .catch((error) => {
                console.log("Registration failed", error?.response?.data);
                toast.error(error?.response?.data?.message || "Registration failed");
            })
            .finally(() => {
                setLoading(false);
            });
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50  bg-opasity-50 ">
            <div className="  w-[1000px]  h-[600px] flex felx-col  items-center bg-[url(/loginImage.jpg)]  bg-cover bg-center rounded-2xl ">

                <div className="w-[470px] h-[600px] bg-[var(--color-primary)] shadow-xl rounded-l-2xl flex flex-col justify-center items-center relative">
                    <button className="text-4xl text-red-500 absolute top-0 left-0 hover:cursor-pointer" onClick={onClose} ><IoCloseCircle /></button>
                    <div className=" w-[430px] h-[70px]  relative">
                        <input
                            onChange={handleChange}
                            className="w-[400px] h-[50px] border mt-3 border-gray-300 rounded-3xl text-center m-[5px] peer placeholder-transparent text-sm focus:outline-none focus:border-[var(--color-accent)] transition "
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            placeholder="First Name"

                        />
                        <label htmlFor="email" className="absolute left-7 top-0 bg-white  text-gray-500 text-sm transition-all  peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-[var(--color-accent)] peer-focus:top-0 peer-focus:text-sm peer-focus:text-[var(--color-accent)] peer-focus:bg-[var(--color-primary)]">
                            First Name
                        </label>
                    </div>
                    <div className="w-[430px] h-[70px]  relative">
                        <input
                            onChange={handleChange}
                            name="lastName"
                            className="w-[400px] h-[50px] border mt-3 border-gray-300 rounded-3xl text-center m-[5px] peer placeholder-transparent text-sm focus:outline-none focus:border-[var(--color-accent)] transition "
                            type="text"
                            value={formData.lastName}
                            placeholder="Last Name"
                            id="last_name"
                        />
                        <label htmlFor="email" className="absolute left-7 top-0 bg-white  text-gray-500 text-sm transition-all  peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-[var(--color-accent)] peer-focus:top-0 peer-focus:text-sm peer-focus:text-[var(--color-accent)] peer-focus:bg-[var(--color-primary)]">
                            Last Name
                        </label>
                    </div>
                    <div className=" w-[430px] h-[70px]  relative">
                        <input
                            onChange={handleChange}
                            className="w-[400px] h-[50px] border mt-3 border-gray-300 rounded-3xl text-center m-[5px] peer placeholder-transparent text-sm focus:outline-none focus:border-[var(--color-accent)] transition "
                            type="email"
                            value={formData.email}
                            placeholder="E-mail"
                            name="email"
                            id="email"
                        />
                        <label htmlFor="email" className="absolute left-7 top-0 bg-white  text-gray-500 text-sm transition-all  peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-[var(--color-accent)] peer-focus:top-0 peer-focus:text-sm peer-focus:text-[var(--color-accent)] peer-focus:bg-[var(--color-primary)]">
                            E-mail
                        </label>
                    </div>
                    <div className=" w-[430px] h-[70px]  relative">
                        <input
                            onChange={handleChange}
                            className="w-[400px] h-[50px] border mt-3 border-gray-300 rounded-3xl text-center m-[5px] peer placeholder-transparent text-sm focus:outline-none focus:border-[var(--color-accent)] transition "
                            type="text"
                            value={formData.phone}
                            placeholder="Phone Number"
                            name="phone"
                            id="phone_number"
                        />
                        <label htmlFor="email" className="absolute left-7 top-0 bg-white  text-gray-500 text-sm transition-all  peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-[var(--color-accent)] peer-focus:top-0 peer-focus:text-sm peer-focus:text-[var(--color-accent)] peer-focus:bg-[var(--color-primary)]">
                            Phone Number
                        </label>
                    </div>
                    <div className=" w-[430px] h-[70px]  relative">
                        <input
                            onChange={handleChange}
                            className="w-[400px] h-[50px] border mt-3 border-gray-300 rounded-3xl text-center m-[5px] peer placeholder-transparent text-sm focus:outline-none focus:border-[var(--color-accent)] transition "
                            type="password"
                            value={formData.password}
                            placeholder="Password"
                            name="password"
                            id="password"
                        />
                        <label htmlFor="email" className="absolute left-7 top-0 bg-white  text-gray-500 text-sm transition-all  peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-[var(--color-accent)] peer-focus:top-0 peer-focus:text-sm peer-focus:text-[var(--color-accent)] peer-focus:bg-[var(--color-primary)]">
                            Password
                        </label>
                    </div>
                    <div className=" w-[430px] h-[70px]  relative">
                        <input
                            onChange={handleChange}
                            className="w-[400px] h-[50px]  border mt-3 border-gray-300 rounded-3xl text-center m-[5px] peer placeholder-transparent text-sm focus:outline-none focus:border-[var(--color-accent)] transition "
                            type="password"
                            value={formData.confirmPassword}
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            id="confirm_password"
                        />
                        <label htmlFor="email" className="absolute left-7 top-0 bg-white  text-gray-500 text-sm transition-all  peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-[var(--color-accent)] peer-focus:top-0 peer-focus:text-sm peer-focus:text-[var(--color-accent)] peer-focus:bg-[var(--color-primary)]">
                            Confirm Password
                        </label>
                    </div>
                    <div className="w-[430px] h-[70px]  relative ml-4">
                    <button
                        onClick={() => {
                            handleRegister();
                            onClose()
                        }}
                        className={`${loading ? "cursor-not-allowed " : "cursor-pointer"}' w-[400px] h-[50px] mt-[10px]  bg-green-500 text-white rounded-3xl '`}
                    >
                        {loading ? "Processing..." : "Register"}
                    </button>
                    </div>



                    <p className="text-gray-600 text-center flex  m-[10px]">
                        Already have an account? &nbsp; <span onClick={onClose} className="text-green-500 hover:cursor-pointer hover:text-green-700" >Login</span>
                    </p>
                </div>
                <div className="w-[530px]  h-[600px] text-[var(--color-primary)] flex flex-col items-center justify-center text-2xl ">
                    <h1 className="px-1"> Create Your Crystal Beauty Clear Account 💖</h1>
                    <p className="m-2 text-center text-gray-600 text-lg max-w-xl mx-auto px-2.5 ">
                        Welcome to the Crystal family! ✨ <br />
                        Join us and unlock personalized beauty care, exclusive offers, and a radiant experience that’s made just for you.
                        Let’s celebrate your natural glow—starting today.
                    </p>
                </div>
            </div>
        </div>
    );
}
