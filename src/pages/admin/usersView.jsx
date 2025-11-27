import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

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
                isDisable:isDisables
            },{
                headers:{
                    Authorization:"Bearer " + token
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
        <div className="w-full h-full rounded-lg overflow-y-scroll">
            
            <div className="w-full ">
                {loaded && <table className="w-full   ">

                    <thead>
                        <tr>
                            <th className="p-2 ml">E-mail</th>
                            <th className="p-2 ml">Name</th>
                            <th className="p-2 ml">Phone Number</th>
                            <th className="p-2 ml">Role</th>
                            <th>Is Email Varified</th>
                            <th className="p-2 ml">Is Disable</th>
                            <th className="p-2 ml"> </th>



                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((users, index) => {
                                return (
                                    <tr key={index} className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-100 ">
                                        <td className="p-2">{users.email}</td>
                                        <td className="p-2">{users.firstName}</td>
                                        <td className="p-2">{users.phone}</td>
                                        <td className="p-2">
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
                                            <select value={users.isDisable ? "yes":"no" } onChange={
                                                (e)=>{
                                                    users.isDisables = e.target.value === "yes" ? true : false
                                                    disable(users.email, users.isDisables)
                                                }
                                            }>
                                                <option value="no">No</option>
                                                <option value="yes">Yes</option>
                                            </select>
                                        </td>
                                        <td className="p-2 text-[25px]" >
                                            <div className="flex w-full h-full justify-center gap-[20px]">
                                                <FaRegTrashAlt className="text-[25px] hover:text-red-600" onClick={
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