import { Link } from "react-router-dom"

export default function ProductCard(props) {

    const product = props.product
    const stock = props.stock

    return (
        <div className="w-[250px] m-4 h-[350px] hover:scale-105 transition-transform duration-200 shadow-2xl animate-welcome">
            {
                stock <= 0 &&
                <div className="w-full h-full items-center justify-center relative pt-4">
                    <div className="absolute top-0 left-0 w-full h-full bg-[var(--color-primary)] opacity-50 z-20"></div>
                    <img src="soldOut.png" alt=" sold out" className="absolute top-6 z-20" />
                    <img className="w-full h-[220px] object-cover" src={product.images[0]} />
                    <div className="h-[110px] w-full flex justify-center  flex-col px-4">
                        <p className="text-gray-400">{product.productId}</p>
                        <p className="text-lg font-bold">{product.name}</p>
                        <p className="text-lg text-[var(--color-accent)]">{product.price.toFixed(2)} <span className="line-through text-gray-400 text-sm">{product.price < product.labeledPrice && product.labeledPrice.toFixed(2)}</span></p>
                    </div>
                </div>
            }
            {
                stock > 0 &&
                <div className="w-full h-full items-center justify-center pt-4 relative ">
                <Link to={"/overview/" + product.productId} className="w-[250px]  h-[350px]  shadow-2xl">
                    <img className="w-full h-[220px] object-cover" src={product.images[0]} />
                    <div className="h-[110px] w-full flex justify-center  flex-col px-4">
                        <p className="text-gray-400">{product.productId}</p>
                        <p className="text-lg font-bold">{product.name}</p>
                        <p className="text-lg text-[var(--color-accent)]">{product.price.toFixed(2)} <span className="line-through text-gray-400 text-sm">{product.price < product.labeledPrice && product.labeledPrice.toFixed(2)}</span></p>
                    </div>
                </Link>
                </div>
            }
        </div>
    )

}