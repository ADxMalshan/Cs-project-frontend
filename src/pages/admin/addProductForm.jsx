import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import "../client/css/addproduct.css";

export default function AddProductForm() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [price, setPrice] = useState("");
  const [labeledPrice, setLabeledPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit() {
    const promisesArray = Array.from(images).map((img) => mediaUpload(img));

    try {
      const result = await Promise.all(promisesArray);

      const altNamesInArray = altNames.split(",");
      const product = {
        productId: productId,
        name,
        altNames: altNamesInArray,
        price,
        labeledPrice,
        description,
        stock,
        images: result,
      };

      const token = localStorage.getItem("token");

      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/product",
        product,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Product adding failed");
    }
  }

  return (
    <div className="add-product-container">
      <div className="add-product-card">
        <h1 className="add-product-title">Add Product</h1>

        <input
          value={productId}
          onChange={(e) =>
            setProductId(
              e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")
            )
          }
          className="add-product-input"
          placeholder="Product ID"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="add-product-input"
          placeholder="Product Name"
        />
        <input
          value={altNames}
          onChange={(e) => setAltNames(e.target.value)}
          className="add-product-input"
          placeholder="Alternative Names"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          min={1}
          className="add-product-input"
          placeholder="Price"
        />
        <input
          value={labeledPrice}
          onChange={(e) => setLabeledPrice(e.target.value)}
          type="number"
          min={1}
          className="add-product-input"
          placeholder="Labelled Price"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="add-product-input"
          placeholder="Description"
        />
        <input
          type="file"
          onChange={(e) => setImages(e.target.files)}
          multiple
          className="add-product-input"
        />
        <input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          type="number"
          min={0}
          className="add-product-input"
          placeholder="Stock"
        />

        <div className="add-product-actions">
          <Link to={"/admin/products"} className="btn-cancel">
            Cancel
          </Link>
          <button onClick={handleSubmit} className="btn-add">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}