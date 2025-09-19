import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kids_banner from "./Components/Assets/banner_kids.png";
import ProductDisplay from "./Components/ProductDisplay/ProductDisplay";
import CheckoutForm from "./Components/Checkout/CheckoutForm";
import AllProduct from "./Components/AllProduct/AllProduct";
import MyAccount from "./Components/MyAccount/MyAccount";
import NewCollections from "./Components/NewCollections/NewCollections";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import WishList from "./Components/WishList/WishList";
import ContactPage from "./Components/ContactPage/ContactPage";
import AboutUs from "./Components/AboutUs/AboutUs";
import Exce from "./Components/AboutUs/Exce";
import HelpCenter from "./Components/HelpCenter/HelpCenter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route
          path="/womens"
          element={<ShopCategory banner={women_banner} category="women" />}
        />
        <Route
          path="/mens"
          element={<ShopCategory banner={men_banner} category="men" />}
        />

        <Route
          path="/kids"
          element={<ShopCategory banner={kids_banner} category="kid" />}
        />
        <Route path="product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/display_product" element={<ProductDisplay />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/new_collection" element={<NewCollections />} />
        <Route path="/all" element={<AllProduct />} />
        <Route path="/wish" element={<WishList />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/exc" element={<Exce />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
