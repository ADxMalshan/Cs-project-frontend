import { TbTrash } from "react-icons/tb"
import getCart, { addToCart, getTikedItemDiscount, getTikedItemDiscountPercentage, getTikedItemImages, getTikedItemLabeledTotal, getTikedItemTotal, isTiked, removeFromCart, tikedAll } from "../../utils/cart"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaMinus, FaPlus } from "react-icons/fa"

export default function CartPage() {
    const [cartLoaded, setCartLoaded] = useState(false)
    const [cart, setCart] = useState([])
    const [tikItemImages, setTikItemImages] = useState([])
    const [prices, setPrices] = useState()
    const [tikAll, setTikAll] = useState(false)
    const [tikItemLabeledTotal, setTikItemLabeledTotal] = useState()
    const [tikItemDiscount, setTikItemDiscount] = useState()
    const [tikItemPercentage, setTikItemPercentage] = useState()
    const navigate = useNavigate();
    useEffect(() => {
        if (cartLoaded == false) {
            const cart = getCart()
            setPrices(getTikedItemTotal())
            setTikItemLabeledTotal(getTikedItemLabeledTotal())
            setTikItemPercentage(getTikedItemDiscountPercentage())
            setTikItemImages(getTikedItemImages())
            setTikItemDiscount(getTikedItemDiscount())
            setCart(cart)
            setCartLoaded(true)
            if (tikItemImages.length == cart.length) {
                setTikAll(true)
            }
        }
    }, [cartLoaded])
    console.log(cart);
    return (
        <div className="w-full h-full flex flex-col justify-center p-[20px] relative mt-[70px] ">

            <div className="w-[750px] h-[170px] bg-[var(--color-primary)] text-[var(--color-secondary)] rounded-2xl shadow-2xl  mb-3 top-[50px] left-[100px] absolute ">
                <div className=" font-bold text-2xl w-full h-[50px] flex pl-5 pt-3 items-center"> Cart ({cart.length}) </div>
                <button className=" flex w-[200px] mt-5 h-[50px] items-center justify-center" onClick={() => {
                    setTikAll(!tikAll)
                    tikedAll(tikAll)
                    setCartLoaded(false)
                }}>
                    Select All Items &nbsp;
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center hover:border-red-500 hover:cursor-pointer bg-re-600 transition-colors border border-gray-400`}

                    >
                        {!tikAll && <svg
                            className="w-6 h-6 text-white bg-red-600 rounded-full"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                        }
                    </div>
                </button>

            </div>
            <div className="w-[750px] h-auto bg-[var(--color-primary)] text-[var(--color-secondary)] rounded-2xl shadow-2xl top-[230px] left-[100px] absolute p-3">
                {
                    cart.map((item, index) => {
                        return (
                            <div key={index} className="w-[700px] h-[100px] ml-2 my-[5px] flex justify-between items-center relative border-b-1 border-gray-200 ">

                                <div className="flex h-[80px] w-auto  justify-center items-center ">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center hover:border-red-500 hover:cursor-pointer ml-1 mr-2  transition-colors border border-gray-400`}
                                        onClick={
                                            () => {
                                                item.tikIndex.isTiked = !item.tikIndex.isTiked
                                                isTiked(item.tikIndex.index, item.tikIndex.isTiked)
                                                setCartLoaded(false)
                                            }
                                        }
                                    >
                                        {item.tikIndex.isTiked && <svg
                                            className="w-6 h-6 rounded-full text-white bg-red-600"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M5 13l4 4L19 7" />
                                        </svg>
                                        }
                                    </div>
                                    <img src={item.image} className="h-full aspect-square object-cover" />
                                </div>
                                <div className="h-full max-w-[300px] w-[300px] pt-3 overflow-hidden">
                                    <h1 className="text-lg ">{item.name}</h1>
                                    <h2 className="text-sm text-gray-500">LKR: {item.price.toFixed(2)}</h2>
                                </div>
                                <div className=" relative w-[130px] h-full">
                                    <button className=" absolute right-5 top-2 hover:text-red-500 w-[20px] h-[20px] rounded-full text-[var(--color-secondary)] flex justify-center items-center  cursor-pointer"
                                        onClick={() => {
                                            removeFromCart(item.productId)
                                            setCartLoaded(false)
                                        }}>
                                        <TbTrash />
                                    </button>
                                    <div className=" absolute right-2 top-[35px] h-[30px] w-[100px] border  border-gray-400 rounded-2xl flex justify-center items-center">
                                        <div className="h-full w-[100px]  flex justify-evenly  items-center ">
                                            <button className="text-sm w-[10px] h-[10px] text-[var(--color-secondary)] rounded-full flex justify-center items-center cursor-pointer mx-[5px] z-40"
                                                onClick={() => {
                                                    addToCart(item, -1)
                                                    setCartLoaded(false)
                                                }}><FaMinus /></button>
                                            <h1 className="text-sm font-bold">{item.quantity}</h1>
                                            <button className="text-sm w-[10px] h-[10px]  text-[var(--color-secondary)] rounded-full flex justify-center items-center cursor-pointer mx-[5px] z-40"
                                                onClick={() => {
                                                    addToCart(item, 1)
                                                    setCartLoaded(false)
                                                }}><FaPlus /></button>

                                        </div>
                                    </div>
                                    <div className="h-full w-[100px] flex justify-center items-center absolute right-2 top-[30px]">
                                        <h1 className="text-md w-full text-end pr-2">{(item.price * item.quantity).toFixed(2)}</h1>
                                    </div>
                                </div>
                            </div>
                        )

                    })
                }
            </div>

            <div className={`${prices == 0 && "h-[170px] min-h-[170px]"} ${prices != 0 && "h-[500px] min-h-[500px]"}  min-h-[170px] px-3 py-4 flex flex-col gap-y-2 gap-x-1 w-[370px] shadow-2xl rounded-2xl top-[50px] right-[100px] absolute text-[var(--color-secondary)] pl-3 gap-2`}>
                <p className="text-2xl font-bold pl-[110px] pt-3 "> SUMMARY </p>
                <div className="w-[340px] h-auto bg-white flex overflow-x-hidden " >
                    {
                        tikItemImages.map((item, index) => {
                            return (
                                <div key={index} >
                                    <img src={item} className="h-[50px] aspect-square object-cover mx-1 my-1" />

                                </div>
                            )
                        })
                    }

                </div>
                <div className={`${prices == 0 && "h-auto"} mt-[40px]  w-[340px] h-[200px] flex flex-col relative gap-3`}>
                    <span className={`${prices == 0 && "hidden"} relative`}> Item Total : <div className="right-0 top-0 absolute"> <span>LKR</span> {tikItemLabeledTotal}</div></span>
                    <p className={`${prices == 0 && "hidden"} text-red-600`} >  <span >Discount :  </span>
                        <span className="ml-2">
                            (
                            {
                                tikItemPercentage == "NaN" && "0 %"
                            }
                            {
                                tikItemPercentage != "NaN" && tikItemPercentage + " %"
                            })
                        </span>

                        <span className="right-0 absolute">
                            {
                                tikItemDiscount == "NaN" && "0"
                            }
                            {
                                tikItemDiscount != "NaN" && "- LKR " + tikItemDiscount
                            }
                        </span>


                    </p>


                    <p className="w-[340px] font-bold flex justify-between mr-6">Sub Total : <span>LKR {prices}</span> </p>
                </div>
                <div className={`${prices == 0 && "hidden"} h-[100px] relative justify-center flex`}>

                    <button className={`${prices == 0 && "hidden"} cursor-pointer w-[300px] h-[50px] absolute bottom-6  font-bold rounded-3xl bg-red-600 text-white text-xl flex justify-center items-center `}
                        onClick={() => {
                            navigate("/checkout",
                                {
                                    state: {
                                        items: cart
                                    }
                                }
                            )
                        }}
                    >
                        Checkout ({tikItemImages.length})
                    </button>
                </div>





            </div>
            <div className="w-[370px] h-[200px] flex  rounded-2xl absolute top-[600px] right-[100px] shadow-2xl" >
                <div className="w-full h-full relative">
                    <span className="absolute top-7 left-3 text-2xl font-bold">
                        Pay With
                    </span>
                    <div className=" w-full h-[70px] flex items-center justify-center gap-3 absolute bottom-9 ">
                        <img src="visa.webp" alt="VISA" className="w-auto h-[30px]  " />
                        <img src="mastercard.webp" alt="VISA" className="w-auto h-[30px]  object-cover" />
                        <img src="jcb.webp" alt="VISA" className="w-auto h-[30px] object-cover " />
                        <img src="amex.webp" alt="VISA" className="w-auto h-[30px]  object-cover" />
                    </div>
                        <div className="w-full h-[50px] flex items-center justify-center absolute bottom-0 text-sm " >
                            Please proceed to make the above payment .
                        </div>
                </div>
            </div>
        </div>
    )
}