import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import upload_area from "../../assets/upload_area.svg";
import api from "../../api";
import "./UpdateProduct.css";
import Spinner from "react-bootstrap/esm/Spinner";

const ALLOWED_FILE_TYPES = ["image/jpg", "image/jpeg", "image/png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; //5 mb

const UpdateProduct = () => {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [file, setFile] = useState(null);
  const [fileErrors, setFileErrors] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const validateFile = (file) => {
    const fileType = file.type.toLowerCase();
    if (!ALLOWED_FILE_TYPES.includes(fileType)) {
      return `Invalid file type. Only JPEG, JPG, and PNG are allowed.`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds the limit of 5MB.`;
    }
    return null;
  };

  const changeHandler = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      const selectedFile = files[0];
      const validationError = validateFile(selectedFile);
      if (validationError) {
        setFileErrors(validationError);
        return;
      }
      setFileErrors("");
      setFile(selectedFile);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    if (location.state) {
      setId(location.state._id);
      setFormData(location.state);
      console.log("dat", location.state);
    } else {
      navigate("/list_product");
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formDataWithFile = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      formDataWithFile.append(key, value);
    }
    if (file) {
      formDataWithFile.append("image", file);
    }

    try {
      const response = await api.put(
        `/product/update_product/${id}`,
        formDataWithFile,
        { headers: { "Content-Type": "multipart/form-data" }, id }
      );
      if (response?.status === 200) {
        navigate("/application", { replace: true });
      } else {
        setError("Failed to update application.");
      }
    } catch (error) {
      setError("Error updating product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="spinner-overlay">
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: "10rem", height: "10rem" }}
          />
        </div>
      )}
      <form
        className="update_product"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="item_field1">
          <p>Product title</p>
          <input
            value={formData.name}
            onChange={changeHandler}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add_product-price">
          <div className="item_field1">
            <p>Price</p>
            <input
              value={formData.old_price}
              onChange={changeHandler}
              type="text"
              name="old_price"
              placeholder="Type here"
            />
          </div>
          <div className="item_field1">
            <p>Offer Price</p>
            <input
              value={formData.new_price}
              onChange={changeHandler}
              type="text"
              name="new_price"
              placeholder="Type here"
            />
          </div>
        </div>
        <div className="item_field1">
          <p>Product Category</p>
          <select
            value={formData.category}
            onChange={changeHandler}
            name="category"
            className="add-product-selector"
          >
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className="item_field1">
          <label htmlFor="file-input">
            <img
              src={
                file
                  ? URL.createObjectURL(formData.image)
                  : formData.image || upload_area
              }
              className="thumbnail-img"
              alt="upload_image"
            />
          </label>
          <input
            onChange={changeHandler}
            type="file"
            name="image"
            id="file-input"
            hidden
          />
          {fileErrors.image && <p className="error">{fileErrors.image}</p>}
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="update_product_btn">
          {loading ? "updating..." : "Update"}
        </button>
      </form>
    </>
  );
};

export default UpdateProduct;
