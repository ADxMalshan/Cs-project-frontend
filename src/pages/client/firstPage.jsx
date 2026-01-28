import { useEffect, useState } from "react";
import "./css/firstPage.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function FirstPage() {
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState("");
    const navigate = useNavigate();
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
                console.log(res.data.user);
            })
            return;

        }

    }, [loaded])


    return (
        <>
            <div className="firstPage">
                {/* <div className="welcome">
                    <img src="https://vzkmtbdcbuxxtsmnjwcl.supabase.co/storage/v1/object/public/images/47e1a5b1-b44a-43a1-bb7f-639460acdfc6.png" alt="" />
                    <div className="welcomeText">
                        <h1>Welcome to Pet Care</h1>
                        <p>Your one-stop shop for all your pet needs!</p>
                    </div>
                    <div className="bottomWave">
                        <section className="scrollTopIndicator">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="white" d="M0,32L80,58.7C160,85,320,139,480,170.7C640,203,800,213,960,208C1120,203,1280,181,1360,170.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>                        </section>
                    </div>
                    <div className="appointmentButtonContainer">
                        <button className="appointment-button" onClick={()=>{
                            if(!user){
                                navigate("/login");
                            }
                            else{
                                navigate("/appointment");
                            }
                        }}>Book an Appointment</button>
                    </div>
                </div> */}

            </div>
            <div className="serviceWave">
                <div className="box b1">
                    <h2>Our Services</h2>
                    <p>Comprehensive care for your beloved pets</p>
                </div>
                <div className="box b2">
                    <h2>Our Services</h2>
                    <p>Comprehensive care for your beloved pets</p>
                </div>
                <div className="box b3">
                    <h2>Our Services</h2>
                    <p>Comprehensive care for your beloved pets</p>
                </div>
                <div className="box b4">
                    <h2>Our Services</h2>
                    <p>Comprehensive care for your beloved pets</p>
                </div>
                <div className="box b5">
                    <h2>Our Services</h2>
                    <p>Comprehensive care for your beloved pets</p>
                </div>
                <div className="box b6">
                    <h2>Our Services</h2>
                    <p>Comprehensive care for your beloved pets</p>
                </div>

            </div>


        </>

    )

}