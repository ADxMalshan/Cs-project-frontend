import axios from "axios"
import { useEffect, useState } from "react"

export default function HomePageImageSlider() {

    const [activeIndex, setActiveIndex] = useState(0)
    const [images, setActiveImages] = useState([])
    useEffect(
       () => {
            const interval = setInterval(
                () => {
                    setActiveIndex(
                        (prevIndex) => {
                            const nextIndex = (prevIndex + 1) % images.length
                            return nextIndex
                        }
                    )
                }, 3000
            )
           axios.get(import.meta.env.VITE_BACKEND_URL + "/api/slider/").then(
                (res) => {
                    const url = res.data
                    setActiveImages(url)
                }
            ).catch(
                (err) => {
                    console.log(err)
                })


            return () => clearInterval(interval)
        }, [images.length]
    )
 
    const resource = images[activeIndex]?.imageUrl
    return (

        <div className="w-full h-full">
            <div className=" w-full h-full aspect-square relative ">
                <img src={resource} className={`w-full h-full object-cover transition-all duration-1000 `}/>
                <div className="h-[100px] w-full  absolute bottom-0 left-0 flex justify-center items-end">
                    {
                        images.map(
                            (image, index) => {
                                return (
                                    <div className={`${activeIndex == index ? "border-1 w-[18px] h-[18px] border-[var(--color-secondary)]" : ""}  h-[15px] w-[15px] rounded-full  bg-gray-100 mx-[5px] cursor-pointer my-3 `} key={index}
                                        onClick={
                                            () => {
                                                setActiveIndex(index)
                                            }
                                        }
                                    ></div>
                                )
                            }
                        )
                    }
                </div>

            </div>
        </div>
    )


}