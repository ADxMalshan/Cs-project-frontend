import { FiSearch, FiChevronDown } from "react-icons/fi";
import { FaPaw, FaUserCircle } from "react-icons/fa";
import "../pages/client/css/adminHeader.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AdminHeader({
    searchValue,
    onSearchChange,
    roleText = "Admin",
}) {
    const [loaded, setLoaded] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const Navigate = useNavigate();

    useEffect(() => {
        if (!loaded) {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Please login");
                Navigate("/login");
                return;
            }
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/user/getUserDetails", {
                    headers: { Authorization: "Bearer " + token },
                })
                .then((res) => {
                    console.log(res.data.user);
                    if (res.data.user.role !== 'admin' && res.data.user.role !== 'superadmin') {
                        toast.error("Unauthorized");
                        Navigate("/");
                        return;
                    }
                    setUserDetails(res.data.user);
                    setLoaded(true);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Failed to load user details");
                });
        }


    }, [loaded])
    console.log(userDetails);
    return (
        <header className="hd-wrap">
            {/* Left: brand */}
            <div className="hd-left">
                <Link to="/" className="hd-logoLink">
                    <div className="hd-logo">
                        <FaPaw />
                    </div>
                    <div className="hd-brandText">Paws &amp; Care</div>
                </Link>

            </div>

            {/* Middle: search */}
            <div className="hd-search">
                <FiSearch className="hd-searchIcon" />
                <input
                    value={searchValue}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    placeholder="Search appointments..."
                />
            </div>

            {/* Right: role + avatar */}
            <div className="hd-right">
                <Link className="hd-rolePill" to="/admin/appointments">
                    <span className="hd-roleCircle">A</span>
                    <span className="hd-roleText">{roleText}</span>
                    {/* <FiChevronDown className="hd-down" /> */}
                </Link>
                <div className="hd-avatar">
                    {/* <FaUserCircle /> */}
                    <Link to="/profile" className="hd-avatarLink">
                        <img className="hd-avatarImg" src={userDetails?.profilePicture}></img>
                        <span className="hd-avatarName">{userDetails?.firstName.toUpperCase()}</span>
                    </Link>

                    {/* <FiChevronDown className="hd-down small" /> */}
                </div>
            </div>
        </header>
    );
}
