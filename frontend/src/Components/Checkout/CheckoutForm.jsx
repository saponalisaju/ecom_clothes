// components/CheckoutForm.jsx
import { useState } from "react";
import "./Checkout.css";
import api from "../../api";
import Order from "../OrderItem/Order";
import CheckoutNavbar from "../NavbarItems/CheckoutNavbar";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

const CheckoutForm = () => {
  const { getTotalCartAmount, allProduct, cartItems } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    state: "",
    zip: "",
    country: "",
    deliveryDate: "",
    deliveryRoute: "",
    paymentMethod: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "fullName",
      "phone",
      "email",
      "country",
      "city",
      "state",
      "zip",
      "address",
      "deliveryDate",
      "deliveryRoute",
      "paymentMethod",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        console.log(`Missing field: ${field}`);
        return false;
      }
    }

    if (!formData.termsAccepted) {
      console.log("Terms not accepted");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderedItems = allProduct
      .filter((product) => cartItems[String(product._id)] > 0)
      .map((product) => ({
        id: product._id,
        name: product.name,
        quantity: cartItems[String(product._id)],
        price: product.new_price,
        subtotal: product.new_price * cartItems[String(product._id)],
      }));

    const payload = {
      customerData: formData,
      orderedItems,
      total: getTotalCartAmount(),
    };

    if (!validateForm()) {
      console.log("Please fill all required fields and accept the terms.");
      return;
    }
    setLoading(true);

    try {
      const token = localStorage.getItem("auth-token");
      const { data } = await api.post("/order/place_order", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 5000,
      });
      localStorage.setItem("tran_id", data.tran_id);

      if (data?.url) {
        window.location.href = data.url; // Redirect to SSLCommerz GatewayPageURL
      }
    } catch (err) {
      console.error(err.response?.data?.error || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <CheckoutNavbar />
      <div className="main_content">
        {loading && <div>Loading...</div>}
        <form className="border border-1 me-4" action="">
          <h2>Delivery information</h2>
          <div className="">
            <div className="d-flex name_details">
              <div className="d-flex flex-column p-2">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                />
              </div>
              <div className="d-flex flex-column p-2">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
              </div>
            </div>
            <div className="d-flex email_country">
              <div className="d-flex flex-column p-2">
                <label htmlFor="email">Email Address*</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="d-flex flex-column p-2">
                <label htmlFor="country">Country*</label>
                <select
                  id="country"
                  name="country"
                  onChange={handleChange}
                  value={formData.country}
                >
                  <option value="" disabled>
                    Country
                  </option>
                  <option value="BANGLADESH">Bangladesh</option>
                  <option value="PAKISTAN">Pakistan</option>
                  <option value="AFGHANISTAN">Afghanistan</option>
                  <option value="INDIA">India</option>
                  <option value="NEPAL">Nepal</option>
                  <option value="MALAYSIA">Malaysia</option>
                </select>
              </div>
            </div>

            <div className="">
              <div className="d-flex city_address">
                <div className="d-flex flex-column p-2">
                  <label htmlFor="city">Town/City*</label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>
                <div className="d-flex flex-column p-2">
                  <label htmlFor="state">State/Country*</label>
                  <input
                    id="state"
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                  />
                </div>
                <div className="d-flex flex-column p-2">
                  <label htmlFor="zip">ZIP/Post Code*</label>
                  <input
                    id="zip"
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="ZIP Code"
                  />
                </div>
              </div>
              <div className="address_data">
                <div className="d-flex flex-column p-2">
                  <label htmlFor="address">Address*</label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                  />
                </div>
                <h3>Shedule Delivery</h3>
                <div className="d-flex flex-column p-2">
                  <label htmlFor="deliveryDate">Dates*</label>
                  <input
                    id="deliveryDate"
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex flex-column p-2">
                  <label htmlFor="deliveryRoute">Route</label>
                  <input
                    id="deliveryRoute"
                    type="text"
                    name="deliveryRoute"
                    value={formData.deliveryRoute}
                    onChange={handleChange}
                    placeholder="Delivery route"
                  />
                </div>
              </div>

              <div className="radio_form">
                <p>Payment Method</p>
                <div className="d-flex gap-4 pb-4">
                  <div className=" ">
                    <label className="d-flex gap-2" htmlFor="online">
                      <input
                        id="online"
                        className=""
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={formData.paymentMethod === "online"}
                        onChange={handleChange}
                      />
                      Online Payment
                    </label>
                  </div>
                  <div>
                    <label className="d-flex gap-2" htmlFor="cod">
                      <input
                        id="cod"
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === "cod"}
                        onChange={handleChange}
                        disabled={true}
                      />
                      Cash on Delivery
                    </label>
                  </div>
                  <div className="gap-2 d-flex align-items-center">
                    <label className="d-flex gap-2" htmlFor="pos">
                      <input
                        className=""
                        id="pos"
                        type="radio"
                        name="paymentMethod"
                        value="pos"
                        checked={formData.paymentMethod === "pos"}
                        onChange={handleChange}
                        disabled={true}
                      />
                      POS on Delivery
                    </label>
                  </div>
                </div>
                <div className="d-flex gap-2 mb-4">
                  <input
                    id="termsAccepted"
                    className="d-flex gap-2"
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                  />

                  <p className="p-0 m-0">
                    I have read and agree to the Terms and Conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
        <Order
          formData={formData}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </div>
    </section>
  );
};

export default CheckoutForm;
