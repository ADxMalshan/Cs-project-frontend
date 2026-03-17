import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/loader";
import "../client/css/adminAppointment.css";
import { FiSearch } from "react-icons/fi";

export default function AdminAppointments() {
    const [loaded, setLoaded] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [query, setQuery] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (!loaded) {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Please login");
                navigate("/login");
                return;
            }

            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/appointment", {
                    headers: { Authorization: "Bearer " + token },
                })
                .then((res) => {
                    // expected: array of appointments
                    // { id, pet, owner, service, date, time, status }
                    setAppointments(Array.isArray(res.data) ? res.data : []);
                    setLoaded(true);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Failed to load appointments");
                });
        }
    }, [loaded, navigate]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return appointments;
        return appointments.filter((a) => {
            const text = `${a.id} ${a.pet} ${a.owner} ${a.service} ${a.date} ${a.time} ${a.status}`.toLowerCase();
            return text.includes(q);
        });
    }, [appointments, query]);

    async function updateStatus(id, status) {
        const token = localStorage.getItem("token");
        if (!token) return toast.error("Please login");

        try {
            await toast.promise(
                axios.put(
                    import.meta.env.VITE_BACKEND_URL + "/api/appointment/" + id,
                    { status },
                    { headers: { Authorization: "Bearer " + token } }
                ),
                {
                    loading: "Updating...",
                    success: "Updated",
                    error: "Error updating",
                }
            );
            setLoaded(false);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="ap-page">
            {/* Top header row */}
            <div className="ap-headRow">
                <h1 className="ap-title">Appointments</h1>

                <div className="ap-search">
                    <FiSearch className="ap-searchIcon" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search appointments..."
                    />
                </div>
            </div>

            {!loaded ? (
                <Loader />
            ) : (
                <>
                    {/* Stats cards (like image top row) */}
                    <section className="ap-cards">
                        <div className="ap-card">
                            <div className="ap-cardNum">{appointments.length}</div>
                            <div className="ap-cardLabel">Total Appointments</div>
                        </div>

                        <div className="ap-card warm">
                            <div className="ap-cardNum">
                                {appointments.filter((a) => String(a.status).toLowerCase() === "pending").length}
                            </div>
                            <div className="ap-cardLabel">Pending Requests</div>
                        </div>

                        <div className="ap-card cool">
                            <div className="ap-cardNum">
                                {appointments.filter((a) => String(a.status).toLowerCase() === "approved").length}
                            </div>
                            <div className="ap-cardLabel">Approved</div>
                        </div>

                        <div className="ap-card deep">
                            <div className="ap-cardNum">
                                {appointments.filter((a) => String(a.status).toLowerCase() === "complete").length}
                            </div>
                            <div className="ap-cardLabel">Complete Services</div>
                        </div>
                    </section>

                    {/* Table panel */}
                    <section className="ap-panel">
                        

                        <div className="ap-tableWrap">
                            <table className="ap-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Pet</th>
                                        <th>Owner</th>
                                        <th>Service</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                        <th className="ap-actionsCol">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filtered.length === 0 ? (
                                        <tr>
                                            <td className="ap-empty" colSpan="8">
                                                No appointments found
                                            </td>
                                        </tr>
                                    ) : (
                                        filtered.map((a) => {
                                            const s = String(a.status).toLowerCase();

                                            return (
                                                <tr key={a.appointmentId}>
                                                    <td>#{a.appointmentId}</td>
                                                    <td>{a.petDetails[0].petType.toUpperCase()}</td>
                                                    <td>{a.name.toUpperCase()}</td>
                                                    <td>{a.petDetails[0].petBreed.toUpperCase()}</td>
                                                    <td>   {new Date(a.appointmentDate).toLocaleDateString("en-GB", {
                                                        weekday: "long",
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric"
                                                    })}</td>
                                                    <td>{new Date(a.date).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    })}</td>

                                                    <td>
                                                        <span
                                                            className={
                                                                "ap-badge " +
                                                                (s === "approved" ? "approved" : s === "complete" ? "complete" : "pending")
                                                            }
                                                        >
                                                            {a.status}
                                                        </span>
                                                    </td>

                                                    <td className="ap-actions">
                                                        {s === "pending" && (
                                                            <button className="ap-btn approve" onClick={() => updateStatus(a.appointmentId, "Approved")}>
                                                                Approve
                                                            </button>
                                                        )}

                                                        {s !== "complete" && (
                                                            <button className="ap-btn complete" onClick={() => updateStatus(a.appointmentId, "Complete")}>
                                                                Complete
                                                            </button>
                                                        )}

                                                        <button className="ap-btn cancel" onClick={() => updateStatus(a.appointmentId, "Cancelled")}>
                                                            Cancel
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}
