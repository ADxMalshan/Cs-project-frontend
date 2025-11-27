import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [modalIsDisplaying, setModalIsDisplaying] = useState(false);
	const [displayingOrder, setDisplayingOrder] = useState(null);

	useEffect(() => {
		if (!loaded) {
			const token = localStorage.getItem("token")
			axios.get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
				headers: {
					Authorization: "Bearer " + token,
				},
			}).then((response) => {
				setOrders(response.data)
				setLoaded(true)
				console.log(response.data)
			})
		}

	}, [loaded])

	async function deleteOrder(orderId) {
		const token = localStorage.getItem("token")
		try {
			await toast.promise(
				axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderId, {
					headers: {
						Authorization: "Bearer " + token,
					}
				}), {

				loading: "Deleting order...",
				success: "order deleted successfully	",
				error: "Error deleting order"
			}
			)
			setLoaded(false)
		}
		catch (err) {
			console.log(err)
		}
	}




	async function changeOrderStatus(orderId, status) {
		const token = localStorage.getItem("token");
		try {
			await toast.promise(

				axios.put(import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderId, {
					status: status
				}, {
					headers: {
						Authorization: "Bearer " + token,
					}
				}), {

				loading: "Changing order status ...",
				success: "Order status changed successfully",
				error: "Error changing order status"
			}
			)
			setLoaded(false)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="w-full h-full overflow-y-scroll">
			{loaded ? (
				<div className="w-full h-full">
					<table className="w-full">
						<thead>
							<tr>
								<th>Order ID</th>
								<th>Customer Email</th>
								<th>Status</th>
								<th>Total</th>
								<th>Date</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => {
								return (
									<tr
										key={order.orderId}
										className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-100 "
									>
										<td className="p-2">{order.orderId}</td>
										<td className="p-2">{order.email}</td>


										<td className="p-2">
											<select value={order.status} onChange={
												(e) => {
													changeOrderStatus(order.orderId, e.target.value);
													console.log(e.target.value);
												}
											}>
												<option value={"Pending"}>Pending</option>
												<option value={"Delivered"}>Delivered</option>
												<option value={"Cancelled"}>Cancelled</option>
												<option value={"Processing"}>Processing</option>
											</select>
										</td>
										<td className="p-2">{order.total.toFixed(2)}</td>
										<td className="p-2">
											{new Date(order.date).toDateString()}
										</td>
										<td className="p-2">
											<button
												className="bg-gray-700 text-white p-2 rounded-lg cursor-pointer hover:text-white hover:bg-gray-800"
												onClick={() => {
													setModalIsDisplaying(true);
													setDisplayingOrder(order);
												}}
											>
												Details
											</button>
										</td>
										<td className="p-2">
											<button onClick={() => {
												deleteOrder(order.orderId)
											}} className="w-[30px] h-[30px]  flex justify-center items-center cursor-pointer text-2xl hover:text-red-600"><FaRegTrashAlt /></button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					{modalIsDisplaying && (
						<div className="fixed bg-[#00000070] w-full h-full top-0 left-0 flex justify-center items-center">
							<div className="w-[550px] max-w-[550px] h-[550px] max-h-[550px] bg-white relative">
								<div className="w-full h-[150px] ">
									<h1 className="text-sm font-bold  p-2">
										Order ID: {displayingOrder.orderId}
									</h1>
									<h1 className="text-sm font-bold  p-2">
										E-Mail: {displayingOrder.email}
									</h1>
									<h1 className="text-sm font-bold  p-2">
										Name: {displayingOrder.name}
									</h1>
									<h1 className="text-sm font-bold  p-2">
										Address: {displayingOrder.address}
									</h1>
									<h1 className="text-sm font-bold  p-2">
										Order Date: {new Date(displayingOrder.date).toDateString()}
									</h1>
									<h1 className="text-sm font-bold  p-2">
										Order Status: {displayingOrder.status}
									</h1>
									<h1 className="text-sm font-bold  p-2">
										Order Total: {displayingOrder.total.toFixed(2)}
									</h1>
								</div>
								<div className="w-full h-[450px] max-h-[400px] overflow-y-scroll">

									{displayingOrder.billItems.map((item, index) => {
										return (

											<div
												key={index}
												className="w-full h-[100px] bg-white shadow-2xl my-[5px] flex justify-between items-center relative"
											>
												{console.log(item)}
												<img
													src={item.image}
													className="h-full aspect-square"
												/>
												<div className="h-full max-w-[300px] w-[300px] overflow-hidden">
													<h1 className="text-xl font-bold">
														{item.productName}
													</h1>
													<h2 className="text-lg text-gray-500">
														LKR: {item.price.toFixed(2)}
													</h2>
													<h2 className="text-lg text-gray-500">
														Quantity: {item.quantity}
													</h2>
												</div>
											</div>
										);
									})}
								</div>
								<button
									className="w-[40px] absolute right-[-20px] top-[-20px] h-[40px] rounded-full  bg-white shadow shadow-black flex justify-center items-center"
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
