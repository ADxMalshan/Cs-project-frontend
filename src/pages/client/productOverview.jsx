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
	const [status, setStatus] = useState("loading");
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
  const discount = product ? (product.labeledPrice - product.price)/product.labeledPrice * 100 : 0;
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

console.log(discount)

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
                    from: "productOverview",
                    items: [
                      {
                        productId: product.productId,
                        name: product.name,
                        altNames: product.altNames,
                        price: product.price,
                        labeledPrice: product.labeledPrice,
                        discount: product.labeledPrice - product.price,
                        discountPercentage: discount,
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
