import { Link } from "react-router-dom"
import "./productCard.css"
import { useEffect } from "react";

export default function ProductCard(props) {

    useEffect(() => {

        const items = document.querySelectorAll(".product-card");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        }, {
            threshold: 0.2
        });

        items.forEach((item) => {
            observer.observe(item);
        });

    }, []);





    const product = props.product;
    console.log(product);

    return (

        <div className="product-card">

            {product.stock <= 0 && (

                <div className="product-wrapper">

                    <div className="sold-overlay"></div>

                    <img src="soldOut.png" alt="sold out" className="sold-image" />

                    <img
                        className="product-image"
                        src={product.images[0]}
                        alt={product.name}
                    />

                    <div className="product-info">

                        <p className="product-id">
                            {product.productId}
                        </p>

                        <p className="product-name">
                            {product.name}
                        </p>

                        <p className="product-price">
                            {product.price.toFixed(2)}

                            <span className="product-old-price">
                                {product.price < product.labeledPrice &&
                                    product.labeledPrice.toFixed(2)}
                            </span>

                        </p>

                    </div>

                </div>

            )}

            {product.stock > 0 && (

                <div className="product-wrp">
                    <Link
                        to={"/overview/" + product.productId}
                        className="product-link"
                    >

                        <img
                            className="product-image"
                            src={product.images[0]}
                            alt={product.name}
                        />

                        <div className="product-info">

                            <p className="product-id">
                                {product.productId}
                            </p>

                            <p className="product-name">
                                {product.name}
                            </p>

                            <p className="product-price">

                                {product.price.toFixed(2)}

                                <span className="product-old-price">

                                    {product.price < product.labeledPrice &&
                                        product.labeledPrice.toFixed(2)}

                                </span>

                            </p>

                        </div>

                    </Link>

                </div>

            )}

        </div>

    )

}