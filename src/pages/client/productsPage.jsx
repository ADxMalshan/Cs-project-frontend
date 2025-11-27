import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"
import ProductCard from "../../components/product-card"
import HomePageImageSlider from "../homePageImageSlider"

export default function ProductsPage() {
    const [productList, setProductList] = useState([])
    const [productsLoaded, setProductsLoaded] = useState(false)
    useEffect(
        () => {
            if (!productsLoaded) {
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product").then(
                    (res) => {
                        setProductList(res.data)
                        setProductsLoaded(true)
                    }
                )
            }

        }, [productsLoaded]
    )
    function shuffle(array) {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }
    const shuffled = shuffle(productList);


    return (
        <div className="h-full w-full mt-[70px] relative">
            <div className="w-full h-[500px] ">
             <HomePageImageSlider/>
            </div>

            {
                productsLoaded ?
                    <div className="w-full h-full flex flex-wrap justify-center ">
                        {
                            shuffled.map(
                                (product) => {
                                    return (
                                        <ProductCard key={product.productId} product={product} stock={product.stock} />
                                    )

                                }
                            )
                        }
                    </div>
                    :
                    <Loader />
            }
        </div>
    )
}