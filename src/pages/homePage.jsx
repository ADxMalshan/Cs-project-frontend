import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductOverview from "./client/productOverview";
import FirstPage from "./client/firstPage";
import AppointmentHistory from "./client/appointmentHistory";
import AppointmentUpdatePage from "./client/appoitmentUpdate";
import ProductCard from "../components/product-card";
import NotFound from "./client/notFoundPage";
import CheckoutPage from "./client/checkout";
import CartPage from "./client/cart";
import About from "./client/aboutMe";
import ContactUs from "./client/contactUs";
export default function HomePage() {

    return (
        <div >
            <Header />
            <div>
                <Routes path="/*">
                    <Route path="/" element={<FirstPage />} />
                    <Route path="/products" element={<ProductCard />} />
                    <Route path="/products/:id" element={<ProductOverview />} />
]                    <Route path="/history" element={<AppointmentHistory />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/update" element={<AppointmentUpdatePage />} />
                    <Route path="/overview/:id" element={<ProductOverview />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </div>

        </div>
    )
}