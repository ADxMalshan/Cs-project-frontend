import { Link } from "react-router-dom";
import OrdersPage from "../pages/client/ordersPage";

export default function PopupUserDetail({popup}) {
   

    return (
        <div className={`w-[130px] h-auto bg-[var(--color-primary)] text-[var(--color-secondary)] absolute top-[65px] right-[50px] rounded-xl shadow-2xl flex flex-col justify-center items-center p-4 z-50 transition-all duration-1000 ease-in-out transform ${popup ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none" }`}
        onMouseEnter={() => {
            popup(true)
        }}
        onMouseLeave={() => {
            popup(false)
        }} >
             <div className="flex justify-center  absolute top-[0px] left-[50%] translate-x-[-50%]">
                <div className="w-3 h-3  bg-white rotate-45 transform translate-y-[-6px] " />
            </div>
            <div className="relative group m-0.5 flex justify-center hover:text-[var(--color-accent)]  hover:cursor-pointer transition-colors duration-300" onClick={() => {

            }}>Review
            <span
             className="absolute left-0 -bottom-0.5 h-[2px] w-full origin-right scale-x-0 bg-[var(--color-accent)] transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left group-hover:transition-transform"
                    ></span>
            </div>

            <div className="relative group  m-0.5 flex justify-center hover:text-[var(--color-accent)] hover:cursor-pointer" onClick={() => {

            }}>Profile
            <span
             className="absolute left-0 -bottom-0.5 h-[2px] w-full origin-right scale-x-0 bg-[var(--color-accent)] transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left group-hover:transition-transform"
                    ></span>
            </div>
            <Link to="/orders" className="relative group m-0.5 flex justify-center hover:text-[var(--color-accent)] hover:cursor-pointer" onClick={() => {
                <OrdersPage/>
            }}>My Orders
            <span
             className="absolute left-0 -bottom-0.5 h-[2px] w-full origin-right scale-x-0 bg-[var(--color-accent)] transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left group-hover:transition-transform"
                    ></span>
            </Link >
            <button className="relative group m-0.5 flex justify-center hover:text-[var(--color-accent)] hover:cursor-pointer" onClick={() => {
                localStorage.removeItem("token");
                window.location.reload("/")
            }}>Log Out
            <span
             className="absolute left-0 -bottom-0.5 h-[2px] w-full origin-right scale-x-0 bg-[var(--color-accent)] transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left group-hover:transition-transform"
                    ></span>
            </button>
        </div>
    )
}