import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { getTikedItemDiscount, getTikedItemDiscountPercentage, getTikedItemLabeledTotal, getTikedItemTotal } from "../../utils/cart";

export default function CheckoutPage() {
	const location = useLocation();
	const [cart, setCart] = useState(location.state.items);
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [isCorrectName, setIsCorrectName] = useState("empty");
	const [isCorrectPhone, setIsCorrectPhone] = useState("empty");
	const [isCorrectAddress, setIsCorrectAddress] = useState("empty");
	const [phone, setPhone] = useState("");
	const navigate = useNavigate();
	function placeOrder() {

		const orderData = {
			name: name,
			address: address,
			phoneNumber: phone,
			billItems: []
		}
		for (let i = 0; i < cart.length; i++) {
			if(cart[i].tikIndex.isTiked) {
				// console.log(cart[i]);
				orderData.billItems[i] = {
					productId: cart[i].productId,
					quantity: cart[i].quantity,
	
				}
			}
		}
		const token = localStorage.getItem("token");
		console.log(orderData);
		axios.post(import.meta.env.VITE_BACKEND_URL + "/api/order", orderData, {
			headers: {
				Authorization: "Bearer " + token,
			},
		}).then(() => {
			toast.success("Order placed successfully");
			navigate("/");
		}).catch((error) => {
			console.log(error.response.data.message);
			toast.error(error.response.data.message || "Error placing order");
		})
	}
	return (
		<div className="w-full h-full flex justify-center p-[40px] mt-[70px] ">
			<div className="w-[50%] flex flex-col items-center mr-[10px] ">
				<div className="w-full h-[200px] flex flex-col justify-between items-center mb-[10px] shadow-2xl p-[10px] pb-[30px] rounded-2xl bg-white">
					<h1 className="text-2xl font-bold">Order Summary</h1>
					<div className="w-full  flex justify-between">
					<h1 className=" text-xl  text-end ml-1  "> Item Total</h1>
					<h1 className=" text-xl  text-end pr-2 "> LKR : {getTikedItemLabeledTotal()}</h1>
				</div>
				<div className="w-full flex justify-between pl-1 ">
					<h1 className=" text-red-500 text-xl  text-end pr-2 ">Discount</h1>
					<h1 className=" text-red-500 text-xl text-end pr-2">LKR : {getTikedItemDiscount()} ({getTikedItemDiscountPercentage()} %)
					</h1>
				</div>
				<div className="w-full  flex justify-between pl-1 ">
					<h1 className="text-xl  text-end pr-2">Net total</h1>
					<h1 className="text-xl font-bold text-end pr-2 ">LKR : {getTikedItemTotal()}
					</h1>
				</div>


				</div>
				{cart.filter(item => item.tikIndex.isTiked).map((item, index) => {
					return (
						<div
							key={index}
							className="w-full h-[100px] bg-white shadow-2xl my-[5px] flex justify-between items-center relative"
						>

							<img
								src={item.image}
								className="h-full aspect-square object-cover"
							/>
							<div className="h-full max-w-[300px] w-[300px] overflow-hidden">
								<h1 className="text-xl font-bold">{item.name}</h1>
								<h2 className="text-lg text-gray-500">
									LKR: {item.price.toFixed(2)}
								</h2>
								<h2 className="text-lg text-gray-500">Quantity :{item.quantity} </h2>
							</div>
							<div className="h-full w-[100px] flex justify-center items-center">

							</div>
							<div className="h-full w-[100px] flex justify-center items-center">
								<h1 className="text-xl w-full text-end pr-2">
									{(item.price * item.quantity).toFixed(2)}
								</h1>
							</div>
						</div>
					);
				})}
				

			</div>

			<div className="w-[50%] ml-[10px] rounded-2xl p-[10px] h-[400px] bg-white shadow-2xl flex flex-col  justify-center ">

				<div className="w-full  flex justify-center relative items-center">
					
					<input
						className="w-[400px] h-[50px] uppercase border mt-3 border-gray-300 rounded-3xl text-center m-[5px] peer placeholder-transparent text-sm focus:outline-none focus:border-[var(--color-secondary)] transition "
						value={name}
						placeholder="Full Name"
						onChange={(e) =>{
							if(e.target.value.length > 0){
								setIsCorrectName("true")
							}else{
								setIsCorrectName("empty")
							}
							setName(e.target.value)}}
					/>
					<label htmlFor="name" className="absolute bg-white left-[170px] bottom-[47px]  text-gray-500 text-sm transition-all  peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-[var(--color-secondary)] peer-focus:bg-[var(--color-primary)]">
						Full Name
					</label>
				</div>

				<div className="w-full flex items-center justify-center relative">
					<input
						className={`${isCorrectPhone == "true" ? "border-green-500 w-[400px] h-[50px] " : isCorrectPhone == "false" ? "border-red-500 text-red-500 w-[400px] h-[50px]" : "border-gray-300 w-[400px] h-[50px]"} border mt-3 rounded-3xl text-center m-[5px] peer placeholder-transparent text-sm focus:outline-none focus:border-[var(--color-secondary)] transition`}
						value={phone}
						placeholder="Phone"
						maxLength={10}
						minLength={10}
						type="tel"
						inputMode="numeric"
						pattern="[0-9]{10}"
						onChange={(e) => {
							if(e.target.value.length === 10 ){
								setIsCorrectPhone("true")
							}else if(e.target.value.length < 10 || e.target.value.length > 10 ){
								setIsCorrectPhone("false")
							}else{
								setIsCorrectPhone("empty")
							}
							setPhone(e.target.value)
						}
						}
					/>
					<label htmlFor="phone" className="absolute bg-white left-[170px] bottom-[47px]  text-gray-500 text-sm transition-all  peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-[var(--color-secondary)] peer-focus:bg-[var(--color-primary)]">
						Phone
					</label>
				</div>
				<div className="w-full  flex justify-center relative">
					<input
						className="w-[400px] h-[50px] uppercase border mt-3 border-gray-300 rounded-3xl text-center m-[5px] peer placeholder-transparent text-sm focus:outline-none focus:border-[var(--color-secondary)] transition "
						value={address}
						placeholder="Address 1"
						onChange={(e) => {
							if(e.target.value.length > 0){
								setIsCorrectAddress("true")
							}else{
								setIsCorrectAddress("empty")
							}
							setAddress(e.target.value)}}
					/>
					<label htmlFor="name" className="absolute bg-white left-[170px] bottom-[47px]  text-gray-500 text-sm transition-all  peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-[var(--color-secondary)] peer-focus:bg-[var(--color-primary)]">
						Address 1
					</label>
				</div>

				<div className="w-full  flex justify-center mt-4">
					{
						isCorrectPhone == "false" ? <h1 className="text-red-500 mr-4">Please enter a valid phone number</h1> : <></>
					}
					<button
						className={`${isCorrectName == "false" || isCorrectName == "empty" || isCorrectPhone == "false"|| isCorrectPhone == "empty" || isCorrectAddress == "false"|| isCorrectAddress == "empty" ? "w-[170px] text-xl  text-center shadow pr-2 bg-gray-400 text-white h-[40px] rounded-lg pointer-events-none" : "w-[170px] text-xl  text-center shadow pr-2 bg-white border-1 border-green-500 text-green-500 hover:bg-green-500 hover:text-white  h-[40px] rounded-lg cursor-pointer"}`}
						onClick={placeOrder}
					>
						Place Order
					</button>
				</div>
			</div>

		</div>
	);
}
