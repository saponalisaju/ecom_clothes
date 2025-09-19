import { useEffect } from "react";
import { useState } from "react";
import { useLlocation } from "react-router-dom";
import api from "../../api";
import { set } from "mongoose";

const UpdateProduct = () => {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: null,
    category: "women",
    new_price: "",
    old_price: "",
  });

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

  const onChangeHandler = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      const selectedFile = files[0];
      const validationError = validateFile(selectedFile);
      if (validationError) {
        setFileError(validationError);
        return;
      }
      setFileError("");
      setFile(selectedFile);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const location = useLlocation();

  useEffect(() => {
    if (location.state) {
      setId(location.state._id);
      setFormData(location.state);
    } else {
      navigate("/list_product");
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formDataWithFile = new FormData();
    for (const [key, value] of Object.entries(productDetails)) {
      formDataWithFile.append(key, value);
    }
    if (file) {
      formDataWithFile.append("image", file);
    }

    try {
      const res = await api.put(
        `/product/update_product/${id}`,
        formDataWithFile,
        { headers: { "Content-Type": "multipart/form-data" }, id }
      );
    } catch (error) {
      setError("Error updating product. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType="multpart/form-data"></form>
    </>
  );
};
