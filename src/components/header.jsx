import { BsCart4 } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import LoginButton from "./loginButton";

export default function Header() {
    const navigate = useNavigate()
    return ( 
        <header className="h-[70px] w-full flex justify-center items-center bg-[var(--color-primary)]  relative top-0 z-50 shadow-lg ">
            <img src="https://vzkmtbdcbuxxtsmnjwcl.supabase.co/storage/v1/object/public/images//logo.png" alt="Crystal Beauty clear" className="aspect-square object-fill h-full left-[80px] absolute hover:cursor-pointer " onClick={()=>{navigate("/")}}  />
            <div className="w-[500px] h-full flex items-center justify-evenly text-[var(--color-accent)] text-xl">

                {/* <Link to="/" className="hover:underline ">Home</Link> */}
              
                                <div to="/login" className="absolute  right-[150px]" ><LoginButton/></div> 

                <Link to="/cart" className="absolute right-[30px] text-3xl hover:text-[var(--color-secondary)] "><BsCart4 /></Link>
            </div>
        </header>
    )
}