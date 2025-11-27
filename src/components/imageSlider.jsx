import { useEffect, useState } from "react"

export default function ImageSlider(props) {
    const images = props.images
    const [activeIndex, setActiveIndex] = useState(0)

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
                }, 6000
            )
            return () => clearInterval(interval)
        }, [images.length]

    )


    return (
        <div className="w-full h-full  flex justify-center items-center ">
            <div className=" w-[70%] aspect-square relative">
                <img src={images[activeIndex]} className="w-full h-full object-cover transition-all duration-1000" />
                <div className="h-[100px] w-full backdrop-blur-3xl absolute bottom-0 left-0 flex justify-center items-center">
                    {
                        images.map(
                            (image, index) => {
                                return (
                                    <img key={index} src={image} className={`${activeIndex == index ? "border-2 border-[var(--color-secondary)]" : ""} h-[100px] aspect-square mx-[5px] cursor-pointer`} onClick={
                                        () => {
                                            setActiveIndex(index)
                                        }
                                    } />
                                )
                            }
                        )
                    }
                </div>

            </div>
        </div>
    )
}