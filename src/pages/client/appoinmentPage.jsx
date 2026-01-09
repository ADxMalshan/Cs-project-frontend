import { useState } from "react";
import "./css/appointmentPage.css"
import axios from "axios";
import toast from "react-hot-toast";
export default function AppointmentPage() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [service, setService] = useState("");
    const [details, setDetails] = useState("");
    const [date, setDate] = useState("");
    const [petType, setPetType] = useState("");
    const [petBreed, setPetBreed] = useState("");
    const [petAge, setPetAge] = useState("");

    function handleSubmit() {
       const token = localStorage.getItem("token");
         const appointmentData = {
            name: name,
            phone: phone,
            petDetails: {
                petType: petType,
                petBreed: service,
                petAge: petAge
            },
            service: service,
            details: details,
            appointmentDate: date
        };

        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/appointment", appointmentData, {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
        .then(response => {
            console.log("Appointment booked successfully:", response.data);
            toast.success("Appointment booked successfully");
            setName("");
            setPhone("");
            setService("");
            setDetails("");
            setDate("");
            setPetType("");
            setPetBreed("");
            setPetAge("");
        })
        .catch(error => {
            console.error("Error booking appointment:", error);
            toast.error("Error booking appointment");
        });
    }


    return (
        // main container
        <div className="appointment-page-container">
            {/* form division */}
            <div className="appointment-form-container">
                <div className="appointment-form-division">
                    <h2>Pet Care Appointment Booking</h2>
                    <div className="appointment-form-inputs-division">
                        <div className="input-group">
                            <label htmlFor="name">Book an Appointment</label>
                            <input type="text" value={name} placeholder="Your Name" onChange={(e) => {setName(e.target.value);}} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" placeholder="Your Phone Number (Ex: 0771234567)" inputMode="numeric" onChange={(e) => {setPhone(e.target.value.replace(/[^0-9]/g, ''));}} maxLength="10" minLength="10" value={phone} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="age">Pet Age</label>
                            <input type="text" placeholder="Your Pet Age" inputMode="numeric" onChange={(e) => {setPetAge(e.target.value.replace(/[^0-9]/g, ''));}} maxLength="2" minLength="2" value={petAge} required />
                        </div>
                        <div className="input-group">
                              <label htmlFor="date">Pet Type</label>
                            <select value={petType} id="petType" onChange={(e) => {setPetType(e.target.value);}} required >
                                <option disabled value="" hidden>Select Pet Type</option>
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="date">Types of Services</label>
                            <select value={service} id="service" onChange={(e) => {setService(e.target.value);}} required >
                                <option disabled value="" hidden>Select a service</option>
                                <option value="grooming">Grooming & Hygiene</option>
                                <option value="vaccination">Vaccination</option>
                                <option value="health">Health & Wellness</option>
                                <option value="training">Training & Behavior</option>
                                <option value="special">Special Services</option>
                                <option value="checkup">Check-up</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor=""> Details</label>
                            <textarea onChange={(e) => { setDetails(e.target.value) }} value={details} cols="30" rows="4" placeholder="Additional details..." ></textarea>
                        </div>
                        <div className="input-group">
                            <label htmlFor="date">Preferred Date</label>
                            <input type="date" id="date" value={date} onChange={(e) => { setDate(e.target.value) }} required />
                        </div>
                        <div className="appointment-form-button-division">
                            <button onClick={handleSubmit} disabled={!name.trim() || !phone.trim() || !service.trim() || !details.trim() || !date.trim()} className="appointment-submit-button">Submit</button>
                            <button className="appointment-cancel-button">Cancel</button>
                        </div>
                    </div>


                </div>
                <div className="appointment-form-image-division">
                    {/* <img src="https://vzkmtbdcbuxxtsmnjwcl.supabase.co/storage/v1/object/public/images/sitting-dog_1.5x-1.gif" alt="ff" /> */}
                    <img src="https://vzkmtbdcbuxxtsmnjwcl.supabase.co/storage/v1/object/public/images/bb.png" alt="" />
                </div>
            </div>

        </div>

    )
}