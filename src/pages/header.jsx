import { BsCart4 } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"

export default function Header() {
    const navigate = useNavigate()
    return ( 
        <header className="h-[70px] w-full flex justify-center items-center bg-red-500  shadow-lg ">
            <div className="w-full h-full flex items-center justify-evenly text-white text-xl">              
                <Link to="/cart" className="absolute right-[30px] text-3xl "><BsCart4 /></Link>
            </div>
        </header>
    )
}