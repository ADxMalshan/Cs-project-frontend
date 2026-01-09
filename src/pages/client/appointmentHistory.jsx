import axios from "axios";
import { use, useEffect, useState } from "react"
import "./css/appointmentHistory.css"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AppointmentHistory() {
    const [loaded, setLoaded] = useState(false)
    const [popup, setPopup] = useState(false)
    const [appointmentId, setAppointmentId] = useState("")
    const [appointment, setAppointment] = useState([])
    const navigate = useNavigate();
    useEffect(
        () => {
            if (!loaded) {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found");
                    toast.error("You are not logged in");
                    setLoaded(true);
                    return;
                }
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/appointment", {
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                }).then(
                    (res) => {
                        setAppointment(res.data)
                        setLoaded(true)
                        console.log(res.data)
                    }
                ).catch((error) => {
                    console.error("Error fetching orders:", error);
                })
            }
        }, [loaded]
    )
    function handleCancelAppointment(appointmentId) {
        const token = localStorage.getItem("token");
        axios.delete(import.meta.env.VITE_BACKEND_URL + `/api/appointment/${appointmentId}`, {
            headers: {
                Authorization: "Bearer " + token,
            }
        }).then(
            () => {
                toast.success("Appointment cancelled successfully");
                setLoaded(false);
            }
        ).catch((error) => {
            console.error("Error cancelling appointment:", error);
            toast.error("Error cancelling appointment");
        })
    }




    return (
        <div className="appointment-history-page-container">
            {popup && <div className="popup-overlay">
                <div className="popup-content">
                    <h2>Are you sure you want to cancel this appointment ?</h2>
                    <div className="popup-buttons">
                        <button onClick={() => { handleCancelAppointment(appointmentId); setPopup(false); }}>Submit</button>
                        <button onClick={() => { setPopup(false); }}>Close</button>
                    </div>

                </div>
            </div>}
            <div className="title">
                <h1>My Appointments </h1>
            </div>
            <div className="appointment-history-content-container">
                {appointment.map((appointments, index) => (
                    <div key={index} className="appointment-items">
                        <img src={appointments.imageUrl} alt="img" />
                        <div className="appointment-details">
                            <span>Appointment ID : {appointments.appointmentId}</span>
                            <span>Owner Name: {appointments.name.toUpperCase()}</span>
                            <span> Owner Email: {appointments.email}</span>
                            <span>Pet Type: {appointments.petDetails[0].petType.toUpperCase()}</span>
                            <span> Service: {appointments.petDetails[0].petBreed.toUpperCase()}</span>
                            <span> Pet Age: {appointments.petDetails[0].petAge}</span>
                            <span>Date: {appointments.date.split("T")[0]}</span>
                        </div>
                        <button onClick={() => { setPopup(true); setAppointmentId(appointments.appointmentId) }} className="cancel-button">Cancel Appointment</button>
                        <button onClick={() => { navigate("/update",{state:{appointments}}) }} className="reschedule-button">Reschedule Appointment</button>


                    </div>
                ))}

            </div>


        </div>
    )
}
