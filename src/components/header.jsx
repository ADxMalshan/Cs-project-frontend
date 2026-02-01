import { Link } from "react-router-dom"
import "./header.css"
import { useEffect, useState } from "react"
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";


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
                <FontAwesomeIcon icon={faPaw} /> Paws & Care
            </div>
            <nav>
                <a href="#">Home</a>
                <a href="#">Services</a>
                <a href="#">Testimonials</a>
                <a href="#">About Us</a>
                <a href="#">Contact</a>
                <button className="btn-primary">Get Started</button>
            </nav>
        </header>
    )
}