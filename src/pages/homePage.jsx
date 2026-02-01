import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductOverview from "./client/productOverview";
import StarRating from "./test3";
import FirstPage from "./client/firstPage";
import AppointmentHistory from "./client/appointmentHistory";
import AppointmentUpdatePage from "./client/appoitmentUpdate";
export default function HomePage() {

    return (
        <div className="w-full h-screen relative ">
            <Header />
            <div className="w-full h-[calc(100vh-70px)] min-h-[calc(100vh-70px)] ">
                <Routes path="/*">
                    <Route path="/" element={<FirstPage />} />
                    <Route path="/review" element={<StarRating />} />
                    <Route path="/history" element={<AppointmentHistory />} />
                    <Route path="/update" element={<AppointmentUpdatePage />} />
                    <Route path="/overview/:id" element={<ProductOverview />} />
                    <Route path="/*" element={<h1>404 Not found</h1>} />
                </Routes>
            </div>

        </div>
    )
}