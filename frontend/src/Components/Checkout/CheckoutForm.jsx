// components/CheckoutForm.jsx
import { useContext, useState } from "react";
import "./Checkout.css";
import { ShopContext } from "../../Context/ShopContext";
import api from "../../api";
import Order from "../OrderItem/Order";
import CheckoutNavbar from "../NavbarItems/CheckoutNavbar";

const CheckoutForm = () => {
  const { clearCart } = useContext(ShopContext);

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
    termsAccepted: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/order/checkout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`, // or use context
        },
      });

      console.log("dat", data);

      alert(data.message);
      clearCart();
    } catch (err) {
      console.error(err.response?.data?.error || "Checkout failed");
    }
  };

  return (
    <section className="section">
      <CheckoutNavbar />
      <div className="main_content">
        <form action="" onSubmit={handleSubmit}>
          <p>Delivery information</p>
          <div className="">
            <div className="d-flex name_details">
              <div className="d-flex flex-column p-2">
                <label htmlFor="">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex flex-column p-2">
                <label htmlFor="">Phone Number *</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="d-flex email_country">
              <div className="d-flex flex-column p-2">
                <label htmlFor="">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex flex-column p-2">
                <label htmlFor="">Country</label>
                <select name="" id="">
                  <option value="BANGLADESH">Bangladesh</option>
                  <option value="PAKISTAN">Pakistan</option>
                  <option value="AFGHANISTAN">Afghanistan</option>
                  <option value="INDIA">India</option>
                  <option value="NEPAL">Nepal</option>
                  <option value="MALAYSYA">Malaysya</option>
                </select>
              </div>
            </div>

            <div className="">
              <div className="d-flex city_address">
                <div className="d-flex flex-column p-2">
                  <label htmlFor="">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex flex-column p-2">
                  <label htmlFor="">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex flex-column p-2">
                  <label htmlFor="">ZIP Code</label>
                  <input
                    type="text"
                    value={formData.zip}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="address_data">
                <div className="d-flex flex-column p-2">
                  <label htmlFor="">Address *</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <h3>Sheduele Delivery</h3>
                <div className="d-flex flex-column p-2">
                  <label htmlFor="">Dates</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex flex-column p-2">
                  <label htmlFor="">Route</label>
                  <input
                    type="text"
                    value={formData.route}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="radio_form">
                <p htmlFor="">Payment Method</p>
                <div className=" ">
                  <label htmlFor="online">
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
                  <label htmlFor="cod">
                    <input
                      id="cod"
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                    />
                    Cash on Delivery
                  </label>
                </div>
                <div className="gap-2 d-flex align-items-center">
                  <label className="" htmlFor="pos">
                    <input
                      className=""
                      id="pos"
                      type="radio"
                      name="paymentMethod"
                      value="pos"
                      checked={formData.paymentMethod === "pos"}
                      onChange={handleChange}
                    />
                    POS on Delivery
                  </label>
                </div>
                <div className="d-flex">
                  <input
                    type="checkbox"
                    name=""
                    id=""
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
        <Order />
      </div>
    </section>
  );
};

export default CheckoutForm;
