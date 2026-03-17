// components/LoginModal.jsx
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./client/css/register.css"


export default function RegisterModal() {
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
        if (name === "phone") {
            const cleanedValue = value.replace(/\D/g, "").slice(0, 10);
            setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
        if(name==="firstName" || name==="lastName") {
            const cleanedValue = value.replace(/[^a-zA-Z\s]/g, "");
            setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
        }
        if(name==="email") {
            const cleanedValue = value.replace(/[^a-zA-Z0-9@._-]/g, "");
            setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
        }

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
                toast.success("Registration successful");
                navigate("/login");
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
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="register-form">
                    <div className="modal-header">
                        <input
                            onChange={handleChange}
                            className=" "
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            placeholder="First Name"
                            required

                        />
            
                    </div>
                    <div className="modal-header">
                        <input
                            onChange={handleChange}
                            name="lastName"
                            className=""
                            type="text"
                            value={formData.lastName}
                            placeholder="Last Name"
                            id="last_name"
                            required
                        />
                       
                    </div>
                    <div className="modal-header">
                        <input
                            onChange={handleChange}
                            className=""
                            type="email"
                            value={formData.email}
                            placeholder="E-mail"
                            name="email"
                            id="email"
                            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                            required
                        />
                        
                    </div>
                    <div className="modal-header">
                        <input
                            onChange={handleChange}
                            className=" "
                            type="text"
                            value={formData.phone}
                            placeholder="Phone Number"
                            name="phone"
                            id="phone_number"
                            maxLength={"10"}
                            minLength={"10"}
                            required
                        />
                        
                    </div>
                    <div className="modal-header">
                        <input
                            onChange={handleChange}
                            className=""
                            type="password"
                            value={formData.password}
                            placeholder="Password"
                            name="password"
                            id="password"
                            required
                        />
                        
                    </div>
                    <div className="modal-header">
                        <input
                            onChange={handleChange}
                            className=" "
                            type="password"
                            value={formData.confirmPassword}
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            id="confirm_password"
                            required
                        />
                        
                    </div>
                    <div className="">
                        <button
                            onClick={() => {
                                handleRegister();
                            }}
                            className={`${loading ? " " : ""}' '`}
                        >
                            {loading ? "Processing..." : "Register"}
                        </button>
                    </div>
                    <p className="">
                        Already have an account? &nbsp; <span className="" >Login</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
