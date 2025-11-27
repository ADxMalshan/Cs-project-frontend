import axios from "axios";
import { useEffect, useState } from "react";
import PopupUserDetail from "./popupUserDetail";
import LoginModal from "../pages/loginModel";

export default function LoginButton() {
    const [user, setUser] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [popup, setPopup] = useState(false)
    const [showLogin, setShowLogin] = useState(false)


    useEffect(() => {

        if (!loaded) {
            const token = localStorage.getItem("token");
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/getUserDetails", {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res) => {
                setUser(res.data.user)
                console.log(user)
                setLoaded(true)
            })
            return
        }


    }, [loaded])





    return (

        <div>
            <div className="w-full h-auto ">{
                user == null &&
                <button
                    onClick={() => setShowLogin(true)}
                    className="bg-[var(--color-accent)] w-[70px] h-[40px] text-white rounded-lg hover:cursor-pointer"
                >
                    Login
                </button>
            }
                {
                    user !== null &&
                    <button
                        onMouseEnter={() => { setPopup(true) }}
                        onMouseLeave={() => { setPopup(false) }}
                        className=" w-auto h-[60px]  relative right-[50px] flex justify-center items-center hover:cursor-pointer">


                        <img className="h-10 w-10 rounded-full shadow-2xl mr-4 " src={user.profilePicture} />
                        <div className="w-auto h-auto text-[var(--color-secondary)] text-[18px]">
                            {user.firstName}
                            <div className="text-[10px]">{user.email}</div>
                        </div>


                    </button >

                }
                {
                    popup &&

                    <PopupUserDetail popup={(value) => { setPopup(value) }} />
                }

                {showLogin && <LoginModal onClose={() => { setShowLogin(false) }} />}
            </div>
        </div>


    )

}