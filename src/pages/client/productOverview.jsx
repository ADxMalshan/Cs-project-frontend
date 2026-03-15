import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import "./css/productOverview.css"
import { addToCart } from "../../utils/cart";



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
  <div className="productPage">
    {status == "loading" && <Loader />}

    {status == "loaded" && (
      <div className="productContainer">

        {/* LEFT IMAGE SECTION */}
        <div className="productImageSection">
          <ImageSlider images={product.images} />
        </div>

        {/* RIGHT DETAILS SECTION */}
        <div className="productDetailsSection">

          <h1 className="productTitle">
            {product.name
              ?.split(" ")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(" ")}
          </h1>

          <h3 className="productAltNames">
            {product.altNames
              ?.map(name =>
                name
                  .split(" ")
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(" ")
              )
              .join(" | ")}
          </h3>

          {/* Price */}
          <div className="productPriceBox">
            {product.labeledPrice > product.price ? (
              <>
                <h2 className="newPrice">LKR {product.price.toFixed(2)}</h2>
                <h3 className="oldPrice">
                  LKR {product.labeledPrice.toFixed(2)}
                </h3>
                <span className="discountBadge">
                  Save {((product.labeledPrice - product.price) / product.labeledPrice * 100).toFixed(0)}%
                </span>
              </>
            ) : (
              <h2 className="newPrice">LKR {product.price}</h2>
            )}
          </div>

          {/* Description */}
          <p className="productDescription">
            {product.description
              ?.split(" ")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(" ")}
          </p>

          {/* Buttons */}
          <div className="productButtons">

            <button
              className="addCartBtn"
              onClick={() => {
                addToCart(product, 1)
                toast.success("Product added to cart")
              }}
            >
              Add to Cart
            </button>

            <button
              className="buyNowBtn"
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
                        quantity: 1,
                        tikIndex: {
                          index: product.productId,
                          isTiked: true
                        }
                      }
                    ]
                  }
                })
              }}
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>
    )}

    {status == "error" && <div>ERROR</div>}
  </div>
);
}
