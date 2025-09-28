import { createBrowserRouter, Navigate } from "react-router-dom";
import Cart from "./Pages/Cart";
import ProductDisplay from "./Components/ProductDisplay/ProductDisplay";
import CheckoutForm from "./Components/Checkout/CheckoutForm";
import UserLoginSignup from "./Pages/UserLoginSignup";
import NewCollections from "./Components/NewCollections/NewCollections";
import AllProduct from "./Components/AllProduct/AllProduct";
import WishList from "./Components/WishList/WishList";
import MyAccount from "./Components/MyAccount/MyAccount";
import ContactPage from "./Components/ContactPage/ContactPage";
import AboutUs from "./Components/AboutUs/AboutUs";
import PaymentSuccess from "./Components/PaymentStatus/PaymentSuccess";
import Exce from "./Components/AboutUs/Exce";
import HelpCenter from "./Components/HelpCenter/HelpCenter";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kids_banner from "./Components/Assets/banner_kids.png";
import App from "./App";
import PaymentFail from "./Components/PaymentStatus/PaymentFail";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Shop /> },
        {
          path: "womens",
          element: <ShopCategory banner={women_banner} category="women" />,
        },
        {
          path: "mens",
          element: <ShopCategory banner={men_banner} category="men" />,
        },
        {
          path: "kids",
          element: <ShopCategory banner={kids_banner} category="kid" />,
        },
        { path: "cart", element: <Cart /> },
        { path: "display_product", element: <ProductDisplay /> },
        { path: "checkout", element: <CheckoutForm /> },
        { path: "user_login", element: <UserLoginSignup /> },
        { path: "new_collection", element: <NewCollections /> },
        { path: "all", element: <AllProduct /> },
        { path: "wish", element: <WishList /> },
        { path: "account", element: <MyAccount /> },
        { path: "contact", element: <ContactPage /> },
        { path: "login", element: <UserLoginSignup /> },
        { path: "about", element: <AboutUs /> },
        {
          path: "/payment/success/:tran_id",
          element: <PaymentSuccess />,
        },
        {
          path: "/payment/fail/:tran_id",
          element: <PaymentFail />,
        },
        { path: "exc", element: <Exce /> },
        { path: "help", element: <HelpCenter /> },
        { path: "*", element: <Navigate to="/" /> },
        // { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
