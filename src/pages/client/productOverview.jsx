import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import getCart, { addToCart } from "../../utils/cart";
import ReactStars from "react-rating-stars-component";
import { TbTrash } from "react-icons/tb";




export default function ProductOverview() {
	const params = useParams();
	if (params.id == null) {
		window.location.href = "/products";
	}

	const [product, setProduct] = useState(null);
	const boxARef = useRef(null);
	const [showBoxB, setShowBoxB] = useState(false);
	const [status, setStatus] = useState("loading"); // loaded, error
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [viewComments, setViewComments] = useState(false);
	useEffect(() => {
		if (status == "loading") {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/product/" + params.id, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
				})
				.then((res) => {
					setProduct(res.data.product);
					setUser(res.data.user);
					setStatus("loaded");
				})
				.catch(() => {
					toast.error("Product is not available!");
					setStatus("error");
				});
		}
	}, [status]);
	// Intersection Observer to reveal the div when 50% visible
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				// If Box A is NOT visible, show Box B
				setShowBoxB(!entry.isIntersecting);
			},
			{ threshold: 0 } // trigger as soon as box A leaves viewport
		);

		if (boxARef.current) {
			observer.observe(boxARef.current);
		}

		return () => {
			if (boxARef.current) {
				observer.unobserve(boxARef.current);
			}
		};
	}, [viewComments]);

	const thirdExample = {
		size: 15,
		count: 5,
		isHalf: true,
		value: product ? Math.round(product.rating * 2) / 2 : 0,
		color: "black",
		activeColor: "yellow",
		emptyIcon: <i className="far fa-star" />,
		halfIcon: <i className="fa fa-star-half-alt" />,
		filledIcon: <i className="fa fa-star" />,
		onChange: (newValue) => {
			console.log(`Example 3: new value is ${newValue}`);
		},
	};
	function handleDeleteComment(commentId) {
		const token = localStorage.getItem("token");
		const data = {
			commentId: commentId,
			productId: product.productId
		}
		axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/reviewsAndComments",
			{
				data: data,
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		).then(() => {
			toast.success("Comment deleted successfully");
			navigate(0);
		}).catch((error) => {
			console.log(error);
			toast.error("Error deleting comment");
		});
	}


	console.log(product);


	return (
		<div className="w-full h-full">
			{status == "loading" && <Loader />}
			{status == "loaded" && (
				<div className="w-full h-full relative flex">
					<div className="w-[50%] h-full">
						<ImageSlider images={product.images} />
					</div>

					{/* new added part */}
					<div className="min-h-[100vh] p-10 space-y-10">
						{/* Box B */}
						{showBoxB && (
							<div className="fixed top-[200px] left-[40px] w-[650px] h-[200px] bg-white text-[var(--color-secondary)] flex items-center justify-center rounded-2xl p-[20px]  shadow-2xl transition-all duration-500 ease-in-out ">
								<div className="w-[30%] h-full flex flex-col justify-center items-center p-2">
									<img className="w-full h-full object-cover" src={product.images[0]} />
								</div>
								<div className="w-[70%] h-full flex flex-col justify-center items-center pb-[10px]">
									<h1 className="text-3xl  font-bold text-center mb-[20px] ">{product.name
										?.split(" ")
										.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
										.join(" ")}</h1>
									<div className="text-gray-500">{product.labeledPrice > product.price ? (
										<div className="flex justify-center items-center">
											<h2 className="text-xl mr-[20px] font-bold animate-colourChange">LKR: {product.price.toFixed(2)}</h2>
											<h2 className="text-sm line-through text-gray-500">
												LKR: {product.labeledPrice.toFixed(2)}
											</h2>
											<span className="text-md ml-[5px] text-[var(--color-secondary)]">| Save {((product.labeledPrice - product.price) / product.labeledPrice * 100).toFixed(0)}%</span>
										</div>
									) : (
										<h2 className="text-xl mr-[20px]">{product.price}</h2>
									)}</div>
									<div className="w-[130px] h-auto flex justify-center items-center bg-amber-30">
										<ReactStars {...thirdExample} />
									</div>
									<div className="w-full flex justify-center  mb-[10px] mt-[20px]">
										<button className="bg-[var(--color-accent)] border cursor-pointer border-[var(--color-accent)] text-white w-[150px] h-[50px] rounded-lg hover:bg-white hover:text-[var(--color-accent)] transition-all duration-300 ease-in-out" onClick={
											() => {
												addToCart(product, 1)
												toast.success("Product added to cart")
												console.log(getCart())
											}
										}>
											Add to Cart
										</button>

										<button
											onClick={() => {
												navigate("/checkout", {
													state: {
														items: [
															{
																productId: product.productId,
																name: product.name,
																altNames: product.altNames,
																price: product.price,
																labeledPrice: product.labeledPrice,
																image: product.images[0],
																quantity: 1
															}
														]
													}
												})
											}}
											className="bg-[var(--color-accent)] border cursor-pointer border-[var(--color-accent)] text-white w-[150px] h-[50px] rounded-lg hover:bg-white hover:text-[var(--color-accent)] transition-all duration-300 ease-in-out ml-[20px]">
											Buy Now
										</button>
									</div>


								</div>
							</div>

						)}
					</div>


					<div className="w-[50%] h-full  p-[40px]  flex flex-col items-left  ">
						<div ref={boxARef} id="product-info" className="w-full h-auto flex-col flex justify-between items-center mb-[20px] mt-[70px] shadow-2xl rounded-2xl bg-white p-[20px]">
							<h1 className="text-3xl  font-bold text-center mb-[20px] ">{product.name
								?.split(" ")
								.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
								.join(" ")}</h1>
							<h2 className="text-xl mr-[20px] mb-[20px]  text-right">
								<span className="text-2xl  text-gray-500 ">{product.altNames
									?.map(name =>
										name
											.split(" ")
											.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
											.join(" ")
									)
									.join(" | ")}</span>
							</h2>

							<div className="w-full flex justify-center mb-[10px]">

								{product.labeledPrice > product.price ? (
									<div className="flex justify-center items-center">
										<h2 className="text-3xl mr-[20px] text-red-500 ">LKR: {product.price.toFixed(2)}</h2>
										<h2 className="text-xl line-through text-gray-500">
											LKR: {product.labeledPrice.toFixed(2)}
										</h2>
										<span className="text-md text-[var(--color-secondary)]">| Save {((product.labeledPrice - product.price) / product.labeledPrice * 100).toFixed(0)}%</span>
									</div>
								) : (
									<h2 className="text-2xl mr-[20px]">{product.price}</h2>
								)}
							</div>
							<div className="w-[500px] h-[30px] bg-accen flex justify-end mb-[20px] ">

								<div className="w-[130px] h-auto flex justify-center items-center bg-amber-30">
									<ReactStars {...thirdExample} />
								</div>
								<div className="w-[40px] h-full flex justify-left items-center ml-0 ">
									<h2 className="text-md text-[var(--color-secondary)] font-bold ml-0"> {product.rating.toFixed(1)}</h2>
								</div>
								<div className="w-[100px] h-full flex justify-left items-center bg-amber-5">
									<h2 className="text-md text-[var(--color-secondary)]">| {product.comments.length} Reviews</h2>
								</div>
								<div className="w-[150px] h-full flex justify-left items-center bg-amber-6 mr-[0px] bg-amber-20">
									<h2 className="text-md text-[var(--color-secondary)]">| {product.soldCount} Sold</h2>
								</div>
							</div>
							<p className="text-xl text-left text-gray-500 mr-[20px] mb-[60px]">
								{product.description
									?.split(" ")
									.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
									.join(" ")}
							</p>


							<div className="w-full flex justify-center  mb-[40px]">
								<button className="bg-[var(--color-accent)] border cursor-pointer border-[var(--color-accent)] text-white w-[200px] h-[50px] rounded-lg hover:bg-white hover:text-[var(--color-accent)] transition-all duration-300 ease-in-out" onClick={
									() => {
										addToCart(product, 1)
										toast.success("Product added to cart")
										console.log(getCart())
									}
								}>
									Add to Cart
								</button>

								<button
									onClick={() => {
										navigate("/checkout", {
											state: {
												items: [
													{
														productId: product.productId,
														name: product.name,
														altNames: product.altNames,
														price: product.price,
														labeledPrice: product.labeledPrice,
														image: product.images[0],
														quantity: 1
													}
												]
											}
										})
									}}
									className="bg-[var(--color-accent)] border cursor-pointer border-[var(--color-accent)] text-white w-[200px] h-[50px] rounded-lg hover:bg-white hover:text-[var(--color-accent)] transition-all duration-300 ease-in-out ml-[20px]">
									Buy Now
								</button>
							</div>
						</div>
					</div>
					{
						status == "loaded" && product.comments.length > 0 ?
							<div className="w-[50%] h-auto absolute mb-[20px] right-0 top-[650px] flex flex-col justify-center items-center">
								<div className="w-[70%] h-auto flex justify-center shadow-2xl rounded-2xl items-center mb-[20px] border cursor-pointer" onClick={() => setViewComments(!viewComments)}><span>{viewComments ? "Hide comments" : "Show comments"}</span></div>
								{
									product.comments.map((comment, index) => {
										return (
											<div className={` ${viewComments ? "block" : "hidden"} w-[70%] h-auto flex flex-col justify-center p-[20px] items-center mb-[20px] bg-[var(--color-primary)] relative shadow-2xl rounded-2xl`} key={index}>
												<div className="w-[100%] h-auto flex flex-col justify-center items-center rounded-2xl  ">
													<div className="w-full h-[50px]  flex justify-start items-center gap-5">
														<img className="w-[25px] h-[25px] rounded-full" src={comment.profilePicture} alt="logo.png" />
														<h2 className="text-gray-500 text-sm font-bold  ">
															{comment.email ? comment.email : "Anonymous"} - {new Date(comment.createdAt).toLocaleDateString("en-US", {
																year: "numeric",
																month: "long",
																day: "numeric",
																weekday: "long",
															})}
														</h2>
														<div>{<span className="text-gray-400 text-xs">{comment.rating} Stars</span>}</div>
														<div>{user == comment.email && <span className="text-gray-400 text-lg flex gap-x-2"> <TbTrash className="hover:text-red-500 cursor-pointer" onClick={() => { handleDeleteComment(comment.commentId) }} /></span>}</div>
													</div>
													<p className="bg-[var(--color-primary)] text-lg p-[20px] text-[var(--color-secondary)]  top-[50px] ">
														{comment.comment}
													</p>
												</div>
											</div>
										)
									})
								}
							</div>
							:
							<div className="w-[50%] h-auto absolute mb-[20px] right-0 top-[700px] flex flex-col justify-center items-center">No comments yet</div>


					}
				</div>
			)}
			{status == "error" && <div>ERROR</div>}
		</div>
	);
}
