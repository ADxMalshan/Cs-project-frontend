import { useEffect, useState } from "react"
import "./imageSlide.css"
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
        <div className="gallery-container">
            <div className="gallery-wrapper">
                <img src={images[activeIndex]} className="gallery-main-img" />
                <div className="thumbnail-container">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            className={`thumbnail ${activeIndex === index ? "active" : ""}`}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}