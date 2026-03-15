import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import "../client/css/adminProduct.css";

export default function AdminProductsPage() {

    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product")
                .then((response) => {
                    setProducts(response.data);
                    setLoaded(true);
                });
        }
    }, [loaded]);

    async function deleteProduct(id) {

        const token = localStorage.getItem("token");

        if (token == null) {
            toast.error("You are not logged in");
            return;
        }

        try {

            await axios.delete(
                import.meta.env.VITE_BACKEND_URL + "/api/product/" + id,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            setLoaded(false);
            toast.success("Product deleted successfully");

        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting product");
        }
    }

    return (

        <div className="products-container">

            <div className="products-header">
                <h2>Products</h2>
            </div>

            <Link to={"/admin/addProduct"} className="add-product-btn">
                <FaPlus />
            </Link>

            {loaded ? (

                <div className="table-wrapper">

                    <table className="products-table">

                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Labeled Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {products.map((product, index) => (

                                <tr key={index}>

                                    <td>{product.productId}</td>
                                    <td className="product-name">{product.name}</td>
                                    <td>Rs {product.price}</td>
                                    <td>Rs {product.labeledPrice}</td>
                                    <td>
                                        <span className="stock-badge">
                                            {product.stock}
                                        </span>
                                    </td>

                                    <td>

                                        <div className="action-buttons">

                                            <FaRegTrashAlt
                                                className="delete-btn"
                                                onClick={() => deleteProduct(product.productId)}
                                            />

                                            <GrEdit
                                                className="edit-btn"
                                                onClick={() =>
                                                    navigate("/admin/editProduct", {
                                                        state: product
                                                    })
                                                }
                                            />

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            ) : (
                <Loader />
            )}

        </div>
    );
}