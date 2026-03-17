import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/loader";
import "../client/css/userProfile.css";
import { FaPaw, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function UserProfile() {
    const [loaded, setLoaded] = useState(false);

    const [user, setUser] = useState(null);        // { fullName, email, phone, address, role, profilePic }
    const [history, setHistory] = useState([]);    // [ { id, service, date, time, status } ]

    const token = useMemo(() => localStorage.getItem("token"), []);

    useEffect(() => {
        if (!loaded) {
            const fetchData = async () => {
                if (!token) {
                    toast.error("Please login");
                    return;
                }

                const base = import.meta.env.VITE_BACKEND_URL;
                const headers = { Authorization: "Bearer " + token };
                axios.get(base + "/api/user/getUserDetails", { headers })
                    .then((res) => {
                        setUser(res.data.user);
                    })
                    .catch((err) => {
                        console.error(err);
                        toast.error("Failed to load profile data");
                    });
                axios.get(base + "/api/appointment", { headers })
                    .then((res) => {
                        setHistory(res.data);
                        setLoaded(true);
                    })
                    .catch((err) => {
                        console.error(err);
                        toast.error("Failed to load pets data");
                    });
            }
            fetchData();
        }
    }, [loaded, token]);


    function formatDateWithWeekday(dateStr) {
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }
    function formatTime(timeStr) {
        return new Date(timeStr).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    function statusClass(status) {
        const s = String(status).toLowerCase();
        if (s === "cancelled") return "cancelled";
        if (s === "completed") return "completed";
        if (s === "upcoming") return "upcoming";
        return "";
    }
    console.log(history)
    return (
        <div className="pf-page">
            {/* Top bar (simple) */}
            <div className="pf-topbar">
                <div className="pf-brand">
                    <Link to="/" className="pf-brandLink">
                        <div className="pf-brandIcon">
                            <FaPaw />
                        </div>
                        <div className="pf-brandText">Paws &amp; Care</div>
                    </Link>
                </div>

                <div className="pf-topRight">
                    <div className="pf-roleChip">{user?.role || "Pet Owner"}</div>
                    <div className="pf-avatarMini">
                        {user?.profilePicture ? (
                            <img src={user.profilePicture} alt="profile" />
                        ) : (
                            <FaUserCircle />
                        )}
                    </div>
                    <div className="pf-logout">
                        <Link to="/" onClick={() => {
                            localStorage.removeItem("token")
                            toast.success("Logged out successfully");
                            }}>
                            Logout
                        </Link>
                    </div>
                </div>
            </div>

            {!loaded ? (
                <Loader />
            ) : (
                <>
                    {/* Big profile header card */}
                    <section className="pf-hero">
                        <div className="pf-heroInner">
                            <div className="pf-profile">
                                <div className="pf-avatar">
                                    {user?.profilePicture ? (
                                        <img src={user.profilePicture} alt="profile" />
                                    ) : (
                                        <FaUserCircle />
                                    )}
                                </div>

                                <h1 className="pf-name">{user?.firstName || "User"}</h1>
                                <div className="pf-badge">{user?.role?.toUpperCase() || "Pet Owner"}</div>
                            </div>
                        </div>
                    </section>

                   
                    
                    {/* Two column area */}
                    <section className="pf-grid">
                        {/* Personal info */}
                        <div className="pf-card">
                            <div className="pf-cardHead">
                                <h2>Personal Information</h2>
                            </div>

                            <div className="pf-info">
                                <div className="pf-row">
                                    <div className="pf-key">Full Name</div>
                                    <div className="pf-val">{user?.firstName + " " + user?.lastName || "—"}</div>
                                </div>

                                <div className="pf-row">
                                    <div className="pf-key">Email</div>
                                    <div className="pf-val">{user?.email || "—"}</div>
                                </div>

                                <div className="pf-row">
                                    <div className="pf-key">Phone</div>
                                    <div className="pf-val">{user?.phone || "—"}</div>
                                </div>

                                <div className="pf-row">
                                    <div className="pf-key">Address</div>
                                    <div className="pf-val">{user?.address || "—"}</div>
                                </div>
                            </div>
                        </div>

                        {/* Pets */}
                        <div className="pf-card">
                            <div className="pf-cardHead">
                                <h2>My Pets</h2>
                            </div>

                            <div className="pf-pets">
                                {history
                                    .filter(
                                        (pet, index, self) =>
                                            index === self.findIndex(p => p.name === pet.name)
                                    )
                                    .map((pet) => (
                                        <div className="pf-pet" key={pet.appointmentId}>
                                            <div className="pf-petImg">
                                                {pet.imageUrl ? (
                                                    <img src={pet.imageUrl} alt={pet.name} />
                                                ) : (
                                                    <div className="pf-petPlaceholder">🐾</div>
                                                )}
                                            </div>

                                            <div className="pf-petBody">
                                                <div className="pf-petName">{pet.name.toUpperCase()}</div>
                                                <div className="pf-petMeta">
                                                    {pet.petDetails?.[0]?.petType || "Pet"}
                                                </div>
                                                <div className="pf-petMeta">
                                                    {pet.petDetails?.[0]?.petAge ?? "—"} years
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                            </div>
                        </div>
                    </section>

                    {/* Appointment history */}
                    <section className="pf-card pf-history">
                        <div className="pf-cardHead">
                            <h2>Appointment History</h2>
                        </div>

                        <div className="pf-tableWrap">
                            <table className="pf-table">
                                <thead>
                                    <tr>
                                        <th>Service</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {history.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="pf-empty">No history yet</td>
                                        </tr>
                                    ) : (
                                        history.map((a) => (
                                            <tr key={a.appointmentId}>
                                                <td className="pf-service">
                                                    {a.petDetails?.[0]?.petBreed
                                                        ? a.petDetails[0].petBreed[0].toUpperCase() +
                                                        a.petDetails[0].petBreed.slice(1).toLowerCase()
                                                        : ""}
                                                </td>
                                                <td>{formatDateWithWeekday(a.appointmentDate)}</td>
                                                <td>
                                                    <span className={"pf-status " + statusClass(a.status)}>
                                                        {a.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
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
