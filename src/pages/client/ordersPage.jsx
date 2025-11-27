import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import Loader from "../../components/loader";
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export default function OrdersPage() {
    const [loaded, setLoaded] = useState(false)
    const [orders, setOrders] = useState([])
    const [isPopupRating, setIsPopupRating] = useState(false);
    const [comment, setComment] = useState("");
    const [productId, setProductId] = useState("");
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();
    useEffect(
        () => {
            if (!loaded) {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found");
                    toast.error("You are not logged in");
                    setLoaded(true);
                    return;
                }
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                }).then(
                    (res) => {
                        setOrders(res.data)
                        setLoaded(true)
                        // console.log(res.data)
                    }
                ).catch((error) => {
                    console.error("Error fetching orders:", error);
                })
            }
        }, []
    )
    function handleRatingChange() {
        const token = localStorage.getItem("token");
                const feedbackData = {
                    productId: productId,
                    comment: comment,
                    rating: rating,
                }
                console.log(feedbackData);
                axios.post(import.meta.env.VITE_BACKEND_URL + "/api/reviewsAndComments", feedbackData,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        }
                    }

                ).then((response) => {
                    console.log("Feedback submitted successfully:", response.data);
                }).catch((error) => {
                    console.error("Error submitting feedback:", error);
                })
    }

    const thirdExample = {
        size: 15,
        edit: true,
        count: 5,
        isHalf: true,
        color: "black",
        activeColor: "yellow",
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon: <i className="fa fa-star" />,
        onChange: (newValue) => {
            console.log(`Example 3: new value is ${newValue}`);
            setRating(newValue);
        },
    };




    return (
        <div className="w-full h-full mt-[30px] relative">
            {
                console.log(orders)
            }
            {
                !loaded &&
                <div className="w-full h-full flex justify-center items-center">
                    {<Loader />}
                </div>
            }
            {
                orders.length === 0 &&
                <div className="w-full h-full flex justify-center items-center">
                    <p className="text-gray-500 text-lg">No orders found</p>
                </div>
            }
            {
                orders.length > 0 &&
                <div className="w-full h-full relative flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold  absolute top-0 left-0 w-[500px] h-[100px] ml-[30px] flex justify-center items-center rounded-2xl shadow=-2xl">My Orders</h1>
                    <div className="mt-[20px] absolute top-[130px] gap-4 left-[130px] w-[1200px] h-[full] bg-whit shadow-2xl rounded-2xl p-4 ">


                        {orders.map((order, index) => (

                            <div key={index} className=" w-full h-auto flex justify-center flex-col border-gray-200 p-4 mb-4 shadow-lg relative">
                                {/* <img src={order.billItems[index].image} className="w-[80px] h-[80px] object-cover absolute top-0 left-0"/> */}
                                <h2 className="text-xl font-bold mb-2 uppercase">Order ID: {order.orderId}</h2>
                                <p className="mb-2">Order Date: {new Date(order.date).toLocaleDateString()}</p>
                                <p className="mb-2">Total Amount: LKR {order.total}</p>
                                <p className="mb-2">Status: {order.status}</p>
                                <div className="w-full h-[50px] flex items-center border-t-2 border-b-2 mt-4 mb-5 relative">
                                    {/* <h2 className="text-xl font-bold mb-2 mt-4 absolute top-0 left-[10px]">Items:</h2> */}
                                    <p className="absolute top-2 left-[200px] font-bold">Product Name</p>
                                    <p className="absolute top-2 left-[400px] font-bold">Quantity</p>
                                    <p className="absolute top-2 left-[600px] font-bold">Price</p>
                                    <p className="absolute top-2 left-[800px] font-bold">Total</p>

                                </div>

                                {
                                    order.billItems.map((items, idx) => {
                                        return (
                                            <div className="w-full h-[100px] flex items-center relative" key={idx}>
                                                <Link to={"/overview/" + items.productId}><img key={idx} src={items.image} className="w-[50px] h-[50px] object-cover absolute top-0 left-[100px]" /></Link>
                                                <p className="absolute top-0 left-[200px] max-w-[150px] truncate uppercase">{items.productName}</p>
                                                <p className="absolute top-0 left-[400px]">{items.quantity}</p>
                                                <p className="absolute top-0 left-[600px]">LKR {items.price}</p>
                                                <p className="absolute top-0 left-[800px]">LKR {items.price * items.quantity}</p>
                                                <button onClick={() => {
                                                    setProductId(items.productId)
                                                    setIsPopupRating(true)
                                                }} className="absolute top-0 left-[900px] bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white px-4 py-2 rounded">Rating</button>
                                            </div>

                                        )
                                    })
                                }


                                {/* <h2 className="text-xl font-bold mb-2 absolute top-0 left-[200px]">Order ID: {order.orderId} </h2> */}
                            </div>
                        ))}


                    </div>
                </div>
            }
            <div className={`w-full h-full bg-black/20  fixed top-0 left-0 flex items-center justify-center ${isPopupRating ? '' : 'hidden'}`}>
                <div className="w-[400px] h-[300px] bg-white rounded-2xl shadow-2xl p-4 relative">
                    <button onClick={() => setIsPopupRating(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">&times;</button>
                    <h2 className="text-xl font-bold mb-2">Rate Your Experience</h2>
                    <div className="flex items-center  w-full ">
                        <ReactStars {...thirdExample} />
                    </div>
                    <textarea className="border border-gray-300 rounded p-2 mt-4 w-full" rows="4" placeholder="Leave your feedback..." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    <button onClick={()=>{
                        handleRatingChange()
                        setIsPopupRating(false)
                        toast.success("Thank you for your feedback!")
                        navigate(0);
                    }} className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
                </div>
            </div>

        </div>
    )
}