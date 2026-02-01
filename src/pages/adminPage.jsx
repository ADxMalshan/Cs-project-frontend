import { Link, Route, Routes } from "react-router-dom";
import { MdWarehouse } from "react-icons/md";
import { FaSlidersH, FaUsers } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";
import AdminProductsPage from "./admin/products";
import AddProductForm from "./admin/addProductForm";
import EditProductForm from "./admin/editProduct";
import AdminOrdersPage from "./admin/adminOrders";
import UserView from "./admin/usersView";
import HomePageImageSlideAdd from "./admin/homePageImageSlideAdd";
import "./client/css/admin.css"

export default function AdminPage(){    
    return (
        <div className="mainContainer">
            {/* <div className=" sidebarAdmin">
                <Link to="/admin/users" className="items"><FaUsers className="icon"/> Users</Link>
                <Link to="/admin/products" className="items"><MdWarehouse className="icon" />Products</Link>
                <Link to="/admin/orders" className="items"><FaFileInvoice className="icon"/>Orders</Link>
                <Link to="/admin/slideAdd" className="items"> <FaSlidersH className="icon" /> Add Slide</Link>

            </div> */}
            <div className="contentAdmin">
                <Routes path="/*">
                    <Route path="/users" element={<UserView/>}/>
                    <Route path="/products" element={<AdminProductsPage/>}/>
                    <Route path="/orders" element={<AdminOrdersPage/>}/>
                    <Route path="/addProduct" element={<AddProductForm/>}/>
                    <Route path="/editProduct" element={<EditProductForm/>}/>
                    <Route path="/slideAdd" element={<HomePageImageSlideAdd/>}/>

                </Routes>
            </div>
            
            
        </div>
    );
}