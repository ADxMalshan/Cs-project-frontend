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

export default function AdminPage(){    
    return (
        <div className="w-full h-screen bg-gray-200 flex p-2">
            <div className="h-full w-[300px] ">
                <Link to="/admin/users" className="p-2 flex items-center hover:bg-[#0002] hover:text-white hover:border-black hover:rounded-xl"><FaUsers className="mr-2"/> Users</Link>
                <Link to="/admin/products" className="p-2 flex items-center hover:bg-[#0002] hover:text-white hover:border-black hover:rounded-xl"><MdWarehouse className="mr-2" />Products</Link>
                <Link to="/admin/orders" className="p-2 flex items-center hover:bg-[#0002] hover:text-white hover:border-black hover:rounded-xl"><FaFileInvoice className="mr-2"/>Orders</Link>
                <Link to="/admin/slideAdd" className="p-2 flex items-center hover:bg-[#0002] hover:text-white hover:border-black hover:rounded-xl"> <FaSlidersH className="mr-2" /> Add Slide</Link>

            </div>
            <div className="h-full bg-white w-[calc(100vw-300px)] rounded-lg">
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