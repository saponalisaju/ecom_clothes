import "./Navbar.css";
import navlogo from "../../assets/hanger_admin_logo.png";
import profile_logo from "../../assets/profile_logo.jpeg";

import api from "../../api";

const Navbar = () => {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) return;

      const response = await api.post(
        "/admin/logout",
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("auth-token");
      console.log("Logout successful:", response.data.message);
      window.location.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="navbar">
      <img src={navlogo} alt="" className="navlogo" />
      <span className="d-flex">
        <button
          className="btn mt-1 border border-1 me-3"
          onClick={handleLogout}
        >
          Log Out
        </button>
        <img src={profile_logo} className="nav-profile" alt="" />
      </span>
    </div>
  );
};

export default Navbar;
