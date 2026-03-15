import { Link, useNavigate } from "react-router-dom"
import "./header.css"
import { useEffect, useState } from "react"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FaCartArrowDown } from "react-icons/fa";


export default function Header() {
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState()
    useEffect(() => {
        if (!loaded) {
            const token = localStorage.getItem("token");
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/getUserDetails", {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res) => {
                setLoaded(true);
                setUser(res.data.user);
                // console.log(res.data.user);
            })
            return;

        }

    }, [loaded])
    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning" + ", " + user.firstName;
        if (hour < 18) return "Good Afternoon" + ", " + user.firstName;
        return "Good Evening" + ", " + user.firstName;
    }
    return (

        <header className="navbar">
            <div className="logo">
                <Link to="/" className="logo-link">
                <FontAwesomeIcon icon={faPaw} /> Paws & Care
                </Link>
            </div>
            {user && (user.role === "admin" || user.role === "superadmin") && (
                <Link className="hd-rolePill" to="/admin">
                    <span className="hd-roleCircle">A</span>
                    <span className="hd-roleText">Admin</span>
                </Link>
            )}

            <nav>
                <Link to="/" className="link" onClick={() => window.scrollTo(0, 0)}>Home</Link>
                <Link to="/about" className="link">About Us</Link>
                <Link to="/contact" className="link">Contact</Link>
                <Link to="/cart" className="link"><FaCartArrowDown /></Link>
                {
                    user ? (
                        <Link to="/profile" className="btn-primary">{user.firstName}</Link>
                    ) : (
                         <Link to="/login" className="btn-primary">Get Started</Link>
                    )
                }
                
            </nav>
        </header>
    )
}