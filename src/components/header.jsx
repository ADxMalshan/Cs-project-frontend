import { Link } from "react-router-dom"
import "./header.css"
import { useEffect, useState } from "react"
import axios from "axios";

export default function Header() {
    const [loaded, setLoaded] = useState(false);
    const [user,setUser]=useState()
    useEffect(()=>{
        if(!loaded){
            const token=localStorage.getItem("token");
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/user/getUserDetails",{
                headers:{
                    Authorization: "Bearer "+token
                }
            }).then((res)=>{
                setLoaded(true);
                setUser(res.data.user);
                console.log(res.data.user);
            })
            return;

        }

    },[loaded])
    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning"+", "+user.firstName;
        if (hour < 18) return "Good Afternoon"+", "+user.firstName;
        return "Good Evening"+", "+user.firstName;
    }
    return (
        <div className="header">
            {user==null?null:<h2>{greeting()}</h2>}
            <h1>Pet Care</h1>
            <div className="links">
                <Link to={"*"} className="link" >Contact Us</Link>
                { user && <button className="link" onClick={()=>{
                    localStorage.removeItem("token");
                    window.location.reload();

                }}>Logout</button>}
                {!user && <Link to={"/login"} className="link" >Login</Link>}
                {/* { user && <Link to={"/register"} className="link" >Register</Link>} */}
            </div>

        </div>
    )
}