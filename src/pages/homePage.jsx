import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductsPage from "./client/productsPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkout";
import StarRating from "./test3";
import OrdersPage from "./client/ordersPage";
export default function HomePage() {
    return (
        <div className="w-full h-screen relative ">
            <Header />
            <div className="w-full h-[calc(100vh-70px)] min-h-[calc(100vh-70px)] ">
                <Routes path="/*">
                    <Route path="/" element={<ProductsPage />} />
                    <Route path="/review" element={<StarRating />} />
                    <Route path="/overview/:id" element={<ProductOverview />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/*" element={<h1>404 Not found</h1>} />
                </Routes>
            </div>

        </div>
    )
}