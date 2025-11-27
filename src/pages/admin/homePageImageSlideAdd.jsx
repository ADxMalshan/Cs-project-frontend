import axios from "axios";
import { use, useEffect, useState } from "react"
import toast from "react-hot-toast";
import mediaUpload from "../../utils/mediaUpload";
import { FaPlus } from "react-icons/fa";
import { MdCloudDone } from "react-icons/md";

export default function HomePageImageSlideAdd() {
    const [images, setImages] = useState([])
    const [dbImages, setDbImages] = useState([])
    const [popup, setPopup] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/slider/").then(
            (res) => {
                const url = res.data
                setDbImages(url)
                setLoaded(true)
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
    }, [loaded])




    async function upload() {
        const promisesArray = [];
        for (let i = 0; i < images.length; i++) {
            const promise = mediaUpload(images[i]);
            promisesArray[i] = promise;
        }
        try {
            let result = await Promise.all(promisesArray)

            result.map(
                async (url) => {
                    const dbImage = {
                        imageUrl: url
                    }
                    const token = localStorage.getItem("token");
                    await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/slider/", dbImage, {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    })
                    toast.success("slide image added successfully ")
                    setLoaded(false)
                }
            )



        } catch (err) {
            console.log(err);
            toast.error("Product updating failed");
        }

    }

    async function deleteImage(id) {
        console.log(id)
        try {
            const token = localStorage.getItem("token");
            await axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/slider/" + id,{
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            // setDbImages(dbImages.filter((image) => image.id !== id));
            toast.success("Image deleted successfully");
        } catch (err) {
            console.log(err);
            toast.error("Error deleting image");
        }
    }

    return (
        <div className="w-full overflow-x-hidden overflow-y-scroll h-full bg-accen flex flex-col relative " >

            <div className=" gap-2 flex justify-center  top-9 left-4 absolute w-[calc(100vw-350px)] h-auto">
                <table className="w-full">
                    <thead>
                        <tr>

                            <th className="p-2">ID</th>
                            <th className="p-2">Image</th>
                            <th className="p-2">E-mail</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dbImages.map((image, index) => (
                                <tr key={index} className="border-b-2 border-gray-300 text-center cursor-pointer hover:bg-gray-100">
                                    <td className="p-2">{image.sldId}</td>
                                    <td className="p-2">
                                        <img
                                            src={image.imageUrl}
                                            className="w-[100px] h-[100px] object-cover mx-auto"
                                        />
                                    </td>
                                    <td className="p-2">{image.email || "Email"}</td>
                                    <td className="p-2">
                                        <div className="flex justify-center">
                                            <button
                                                className="w-[100px] h-[40px] bg-red-500 text-white hover:bg-red-600 hover:cursor-pointer rounded"
                                                onClick={

                                                    () => {
                                                        deleteImage(image.sldId)
                                                        setLoaded(false)
                                                    }

                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>


            </div>

            <div className="w-[500px] h-[100px] flex justify-end fixed bottom-4 right-5 ">
                <div className={`${popup ? "w-full h-full transition-all duration-1000 ease-in-out transform" : "w-[100px] h-[50px] transition-all duration-1000 ease-in-out transform"}  h-full relative`}>
                    <div className={`${popup ? "block transition-all duration-1000 ease-in-out transform " : "invisible transition-all duration-1000 ease-in-out transform "} rounded-2xl shadow-2xl bg-[var(--color-success)] absolute - w-[420px] h-[100px]  left-0 top-0 flex  justify-evenly `}>
                        <input type="file" className="w-[260px] bg-[var(--color-primary)] h-[50px] bottom-6  left-5 text-[var(--color-secondary)]  absolute rounded-xl shadow-2xl flex flex-col justify-center items-center p-4 z-50 transition-all duration-1000 ease-in-out transform"
                            placeholder="+"
                            multiple
                            onChange={(e) => {
                                setImages(e.target.files);
                            }} />



                        <button onClick={() => {
                            upload()
                            setLoaded(false)
                            setPopup(false)
                        }} className="w-[50px] h-[50px] absolute left-[280px] m-1 bottom-5 text-3xl flex justify-center items-center  ">
                            <MdCloudDone className="text-green-400 hover:cursor-pointer hover:text-green-500" />
                        </button>
                    </div>


                    <div className={`${!popup ? "transition-all duration-500 ease-in-out transform block text-green-500 bg-white shadow-2xl border-2 border-green-500 hover:bg-green-500 hover:text-[var(--color-primary)]" : "transition-all duration-500 ease-in-out transform rotate-45 text-red-600 bg-[var(--color-primary)] shadow-2xl hover:bg-red-600 hover:text-[var(--color-primary)] border-2 border-red-600"}  absolute bg-white p-[12px] text-3xl rounded-full cursor-pointer right-5 bottom-5 `}
                        onClick={() => setPopup(!popup)}
                    >
                        <span><FaPlus /> </span>
                    </div>
                </div>
            </div>

        </div>
    )
}