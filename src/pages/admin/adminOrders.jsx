import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import "../client/css/adminOrders.css";

export default function AdminOrdersPage() {

    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [modalIsDisplaying, setModalIsDisplaying] = useState(false);
    const [displayingOrder, setDisplayingOrder] = useState(null);

    useEffect(() => {

        if (!loaded) {

            const token = localStorage.getItem("token");

            axios.get(
                import.meta.env.VITE_BACKEND_URL + "/api/order",
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            ).then((response) => {

                setOrders(response.data);
                setLoaded(true);

            });

        }

    }, [loaded]);


    async function deleteOrder(orderId) {

        const token = localStorage.getItem("token");

        try {

            await toast.promise(

                axios.delete(
                    import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderId,
                    {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    }
                ),

                {
                    loading: "Deleting order...",
                    success: "Order deleted successfully",
                    error: "Error deleting order"
                }

            );

            setLoaded(false);

        } catch (err) {
            console.log(err);
        }

    }


    async function changeOrderStatus(orderId, status) {

        const token = localStorage.getItem("token");

        try {

            await toast.promise(

                axios.put(
                    import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderId,
                    { status: status },
                    {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    }
                ),

                {
                    loading: "Changing order status...",
                    success: "Order status updated",
                    error: "Error updating order"
                }

            );

            setLoaded(false);

        } catch (err) {
            console.log(err);
        }

    }


    return (

        <div className="orders-container">

            {loaded ? (

                <div className="orders-wrapper">

                    <table className="orders-table">

                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Date</th>
                                <th>Details</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>

                            {orders.map((order) => (

                                <tr key={order.orderId}>

                                    <td>{order.orderId}</td>

                                    <td>{order.email}</td>

                                    <td>

                                        <select
                                            className="status-select"
                                            value={order.status}
                                            onChange={(e) => {
                                                changeOrderStatus(
                                                    order.orderId,
                                                    e.target.value
                                                );
                                            }}
                                        >

                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>

                                        </select>

                                    </td>

                                    <td>Rs {order.total.toFixed(2)}</td>

                                    <td>
                                        {new Date(order.date).toDateString()}
                                    </td>

                                    <td>

                                        <button
                                            className="details-btn"
                                            onClick={() => {

                                                setModalIsDisplaying(true);
                                                setDisplayingOrder(order);

                                            }}
                                        >
                                            Details
                                        </button>

                                    </td>

                                    <td>

                                        <button
                                            className="delete-btn"
                                            onClick={() => {
                                                deleteOrder(order.orderId);
                                            }}
                                        >
                                            <FaRegTrashAlt />
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    {modalIsDisplaying && (

                        <div className="modal-overlay">

                            <div className="order-modal">

                                <div className="order-info">

                                    <h3>Order ID: {displayingOrder.orderId}</h3>
                                    <p>Email: {displayingOrder.email}</p>
                                    <p>Name: {displayingOrder.name}</p>
                                    <p>Address: {displayingOrder.address}</p>
                                    <p>Date: {new Date(displayingOrder.date).toDateString()}</p>
                                    <p>Status: {displayingOrder.status}</p>
                                    <p>Total: Rs {displayingOrder.total.toFixed(2)}</p>

                                </div>

                                <div className="items-list">

                                    {displayingOrder.billItems.map((item, index) => (

                                        <div key={index} className="order-item">

                                            <img
                                                src={item.image}
                                                alt=""
                                            />

                                            <div>

                                                <h4>{item.productName}</h4>

                                                <p>Price: Rs {item.price.toFixed(2)}</p>

                                                <p>Qty: {item.quantity}</p>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                                <button
                                    className="close-btn"
                                    onClick={() => {
                                        setModalIsDisplaying(false);
                                    }}
                                >
                                    <IoCloseSharp />
                                </button>

                            </div>

                        </div>

                    )}

                </div>

            ) : (

                <Loader />

            )}

        </div>

    );

}