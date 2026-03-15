import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import "../client/css/editProduct.css";

export default function EditProductForm() {
  const locationData = useLocation();
  const navigate = useNavigate();

  if (locationData.state == null) {
    toast.error("Please select a product to edit");
    window.location.href = "/admin/products";
  }

  const [productId, setProductId] = useState(locationData.state.productId);
  const [name, setName] = useState(locationData.state.name);
  const [altNames, setAltNames] = useState(locationData.state.altNames.join(","));
  const [price, setPrice] = useState(locationData.state.price);
  const [labeledPrice, setLabeledPrice] = useState(locationData.state.labeledPrice);
  const [description, setDescription] = useState(locationData.state.description);
  const [stock, setStock] = useState(locationData.state.stock);
  const [images, setImages] = useState([]);

  async function handleSubmit() {
    const promisesArray = Array.from(images).map((img) => mediaUpload(img));

    try {
      let result = await Promise.all(promisesArray);

      if (images.length === 0) {
        result = locationData.state.images;
      }

      const altNamesInArray = altNames.split(",");
      const product = {
        name,
        altNames: altNamesInArray,
        price,
        labeledPrice,
        description,
        stock,
        images: result,
      };

      const token = localStorage.getItem("token");

      await axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId,
        product,
        { headers: { Authorization: "Bearer " + token } }
      );

      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Product updating failed");
    }
  }

  return (
    <div className="edit-product-container">
      <div className="edit-product-card">
        <h1 className="edit-product-title">Edit Product</h1>

        <input
          disabled
          value={productId}
          className="edit-product-input"
          placeholder="Product ID"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="edit-product-input"
          placeholder="Product Name"
        />
        <input
          value={altNames}
          onChange={(e) => setAltNames(e.target.value)}
          className="edit-product-input"
          placeholder="Alternative Names"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          min={1}
          className="edit-product-input"
          placeholder="Price"
        />
        <input
          value={labeledPrice}
          onChange={(e) => setLabeledPrice(e.target.value)}
          type="number"
          min={1}
          className="edit-product-input"
          placeholder="Labelled Price"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="edit-product-input"
          placeholder="Description"
        />
        <input
          type="file"
          onChange={(e) => setImages(e.target.files)}
          multiple
          className="edit-product-input"
        />
        <input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          type="number"
          min={0}
          className="edit-product-input"
          placeholder="Stock"
        />

        <div className="edit-product-actions">
          <Link to={"/admin/products"} className="btn-cancel">
            Cancel
          </Link>
          <button onClick={handleSubmit} className="btn-edit">
            Edit Product
          </button>
        </div>
      </div>
    </div>
  );
}