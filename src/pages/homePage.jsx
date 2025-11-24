import { Route, Routes } from "react-router-dom";
import Header from "./header";

export default function HomePage(){
    return(
        <div className="w-full h-[500px] p-0 m-0 bg-white text-black">
            <Header />
        </div>
    )
}