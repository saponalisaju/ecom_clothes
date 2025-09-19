import "./Navbar.css";
import navlogo from "../../assets/hanger_admin_logo.png";
// import navprofile from "../../assets/nav-profile.svg";
import profile_logo from "../../assets/profile_logo.jpeg";
import { useEffect } from "react";
import { useCallback } from "react";
// import { useEffect } from "react";

const Navbar = () => {
  const handleLogout = useCallback(() => {
    try {
      const token = localStorage.getItem("auth-token");
      const removeCookie = (name) => {
        document.cookie = `${name}=; Max-Age=-99999999; path=/; SameSite=None; Secure`;
      };

      if (!token) {
        return;
      }

      // Clear client-side storage
      localStorage.removeItem("auth-token");
      ["refreshToken"].forEach(removeCookie);
      console.log("Logout successfully");
      window.location.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Already logged out or session expired.");
    }
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const refreshToken = getCookie("refreshToken");
      if (!refreshToken) {
        console.log("Cookie expired. Logging out...");
        localStorage.removeItem("auth-token");
      }
    }, 1000 * 60); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="navbar">
      <img src={navlogo} alt="" className="navlogo" />
      <button onClick={handleLogout}>Log Out</button>
      <span className="d-flex">
        <img src={profile_logo} className="nav-profile" alt="" />
      </span>
    </div>
  );
};

export default Navbar;
