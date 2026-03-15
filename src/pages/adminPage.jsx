import { Route, Routes, Navigate, NavLink, Link } from "react-router-dom";
import { MdWarehouse } from "react-icons/md";
import { FaSlidersH, FaUsers } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";
import AdminProductsPage from "./admin/products";
import AddProductForm from "./admin/addProductForm";
import EditProductForm from "./admin/editProduct";
import AdminOrdersPage from "./admin/adminOrders";
import UserView from "./admin/usersView";
import AdminAppointments from "./admin/adminAppointment";
import "./client/css/admin.css";
import AdminHeader from "../components/adminHeader";

export default function AdminPage() {
  return (
    <div className="mainContainer">
       <AdminHeader
          // searchValue={query}
          // onSearchChange={setQuery}
          roleText="Admin"
        />
      {/* Sidebar */}
      <div className="sidebarAdmin">
        <div className="adminBrand">
          <span className="brandIcon">🐾</span>

          <div>
            <div className="brandTitle">Paws & Care</div>
            <div className="brandSub">Admin Panel</div>
          </div>
        </div>

       

        <NavLink to="/admin/appointments" className={({ isActive }) => "items " + (isActive ? "active" : "")}>
          <FaFileInvoice className="icon" />
          Appointments
        </NavLink>
        <NavLink to="/admin/users" className={({ isActive }) => "items " + (isActive ? "active" : "")}>
          <FaUsers className="icon" />
          Users
        </NavLink>

        <NavLink to="/admin/products" className={({ isActive }) => "items " + (isActive ? "active" : "")}>
          <MdWarehouse className="icon" />
          Products
        </NavLink>

        <NavLink to="/admin/orders" className={({ isActive }) => "items " + (isActive ? "active" : "")}>
          <FaFileInvoice className="icon" />
          Orders
        </NavLink>
      </div>

      {/* Content */}
      <div className="contentAdmin">
        <Routes>
          {/* Default page when opening /admin */}
          <Route path="/" element={<Navigate to="/admin/users" replace />} />
          <Route path="/appointments" element={<AdminAppointments />} />
          <Route path="/users" element={<UserView />} />
          <Route path="/products" element={<AdminProductsPage />} />
          <Route path="/orders" element={<AdminOrdersPage />} />
          <Route path="/addProduct" element={<AddProductForm />} />
          <Route path="/editProduct" element={<EditProductForm />} />

          {/* If route not found */}
          <Route path="*" element={<div style={{ padding: 20 }}>404 - Page not found</div>} />
        </Routes>
      </div>
    </div>
  );
}
