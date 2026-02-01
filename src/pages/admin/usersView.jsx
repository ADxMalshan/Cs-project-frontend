import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import "../client/css/user.css"
export default function UserView() {
    const [users, setusers] = useState([])
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate()

    useEffect(
        () => {
            if (!loaded) {
                const token = localStorage.getItem("token")
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
                ).then(
                    (response) => {
                        console.log(response.data)
                        setusers(response.data)
                        setLoaded(true)
                    }
                )
            }
        }, [loaded]
    )

    async function deleteUser(email) {
        const token = localStorage.getItem("token")
        if (token == null) {
            toast.error("Please login to delete a user")
            return
        }
        try {
            await toast.promise(
                axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/user/" + email, {
                    headers: {
                        Authorization: "Bearer " + token
                    }

                }),
                {
                    loading: "Deleting user...",
                    success: "User deleted successfully",
                    error: "Error deleting user"
                }

            )

            setLoaded(false)
        } catch (err) {
            console.log(err)
            return

        }
    }

    async function updateUser(email, role) {
        const token = localStorage.getItem("token")
        if (token == null) {
            toast.error("Please login to update a user")
            return
        }

        try {
            await toast.promise(
                axios.put(
                    import.meta.env.VITE_BACKEND_URL + "/api/user/role/" + email,
                    { role: role },
                    {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    }
                ),
                {
                    loading: "Updating user role...",
                    success: "User role updated successfully",
                    error: "Error updating user role"
                }
            );
            setLoaded(false);
        } catch (err) {
            console.log(err);
            // toast.error is handled by toast.promise's error
            return;
        }


    }
    async function disable(email, isDisables) {
        const token = localStorage.getItem("token")
        if (token == null) {
            toast.error("Please login to update a user")
            return
        }

        try {
            await toast.promise(
                axios.put(import.meta.env.VITE_BACKEND_URL + "/api/user/role/" + email, {
                    isDisable: isDisables
                }, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }),
                {
                    loading: "Updating user status...",
                    success: "User status updated successfully",
                    error: "Error updating user status"
                }
            )

            setLoaded(false)
        } catch (err) {
            console.log(err)
            return
        }


    }

    return (
        <div className="main">
            <div className="contentAdmin">
                {loaded && <table className="userTable">
                    <thead>
                        <tr>
                            <th className="item">E-mail</th>
                            <th className="item">Name</th>
                            <th className="item">Phone Number</th>
                            <th className="item">Role</th>
                            <th className="item">Is Email Varified</th>
                            <th className="item">Is Disable</th>
                            <th className="item"> </th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((users, index) => {
                                return (
                                    <tr key={index} className="">
                                        <td className="">{users.email}</td>
                                        <td className="">{users.firstName}</td>
                                        <td className="">{users.phone}</td>
                                        <td className="">
                                            <select value={users.role} onChange={
                                                (e) => {
                                                    updateUser(users.email, e.target.value)
                                                    console.log(e.target.value)
                                                }}>
                                                <option value="admin">Admin</option>
                                                <option value="user">User</option>
                                                <option value="superadmin">Super Admin</option>
                                            </select></td>
                                        <td>{users.isEmailVarified ? "Yes" : "No"}</td>
                                        <td className="p-2">
                                            <select value={users.isDisable ? "yes" : "no"} onChange={
                                                (e) => {
                                                    users.isDisables = e.target.value === "yes" ? true : false
                                                    disable(users.email, users.isDisables)
                                                }
                                            }>
                                                <option value="no">No</option>
                                                <option value="yes">Yes</option>
                                            </select>
                                        </td>
                                        <td className="" >
                                            <div className="">
                                                <FaRegTrashAlt className="deleteBtn" onClick={
                                                    () => {
                                                        deleteUser(users.email)
                                                        setLoaded(false)
                                                    }
                                                } />
                                            </div></td>

                                    </tr>
                                )
                            })

                        }



                    </tbody>


                </table>} {
                    !loaded &&
                    <Loader />
                }

            </div>
        </div>

    )


}