import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkout";
import StarRating from "./test3";
import FirstPage from "./client/firstPage";
import ScrollSwapBox from "./test3";
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
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/orders" element={<ScrollSwapBox />} />
                    <Route path="/*" element={<h1>404 Not found</h1>} />
                </Routes>
            </div>

        </div>
    )
}