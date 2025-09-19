import { useState } from "react";
import "./LoginSignup.css";
import api from "../../api";
import { useEffect } from "react";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

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

  // add the API for login
  const adminLogin = async () => {
    setError("");
    setLoading(true);

    const setCookie = (name, value, days) => {
      const expires = new Date(Date.now() + days * 864e5).toUTCString(); //864e5
      document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=None; Secure`;
    };

    const formData = {
      email,
      password,
    };
    if (!email || !password) {
      setError("Email and password field are required");
      setLoading(false);
      return;
    }
    try {
      const response = await api.post("/admin/admin_login", formData, {
        headers: { "Content-Type": "application/json" },
        timeout: 5000,
      });

      if (state === "Login" && !agreed) {
        setError("You must agree to the terms before signing up.");
        setLoading(false);
        return;
      }

      if (response.data.success && response.data.token) {
        setCookie("refreshToken", response.data.refreshToken, 7);
        localStorage.setItem("auth-token", response.data.token);
        console.log("Login successful");
        window.location.replace("/add_product");
      } else {
        setError("Login failed. Try again later.");
      }
    } catch (error) {
      console.error("Unexpected error", error);
      setError("Login failed. Please check credentials or try again later");
    } finally {
      setLoading(false);
    }
  };

  // add the API for signup
  const adminRegister = async () => {
    const signupFormData = { name, phone, email, password };
    if (!name || !phone || !email || !password) {
      setError("All Fields are required");
      setLoading(false);
      return;
    }
    try {
      await api.post(`/admin/admin_register`, signupFormData, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 5000,
      });

      if (state === "Sign Up" && !agreed) {
        setError("You must agree to the terms before signing up.");
        setLoading(false);
        return;
      }

      window.location.replace("/profile");
    } catch (error) {
      console.error("Unexpected error", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        {loading && <div className="text-center mt-2">Loading...</div>}
        {error && <p className="alert alert-danger"> {error} </p>}
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <>
              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Your Name"
                required
              />
              <input
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                placeholder="Your phone number"
                required
              />
            </>
          )}
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
            required
          />
          <input
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? adminLogin() : adminRegister();
          }}
        >
          {state === "Login" ? "Login" : "Sign In"}
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click here
            </span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input
            type="checkbox"
            name=""
            id=""
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
          />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
