import React, { useState } from "react";
import "./CSS/UserLoginSignup.css";
import api from "../api";
import Spinner from "react-bootstrap/Spinner";
import Navbar from "../Components/NavbarItems/ShopNavbar";

const UserLoginSignup = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // add the API for login
  const login = async () => {
    setError("");
    setLoading(true);

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
      const response = await api.post("/users/login", formData, {
        headers: { "Content-Type": "application/json" },
        timeout: 5000,
      });

      if (state === "Login" && !agreed) {
        setError("You must agree to the terms before signing up.");
        setLoading(false);
        return;
      }

      if (response.data.success && response.data.token) {
        localStorage.setItem("auth-token", response.data.token);
        console.log("Login successful");
        window.location.replace("/");
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
  const signup = async () => {
    const signupFormData = { name, email, password };
    if (!name || !email || !password) {
      setError("All Fields are required");
      setLoading(false);
      return;
    }
    try {
      const response = await api.post(`/users/signup`, signupFormData, {
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

      if (response.data.success && response.data.token) {
        localStorage.setItem("auth-token", response.data.token);
        console.log("Registration successful");
        window.location.replace("/login");
      } else {
        setError(response.data.message, "Registration failed");
      }
    } catch (error) {
      console.error("Unexpected error", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginsignup">
      <Navbar />
      <div className="loginsignup-container">
        <h1>{state}</h1>
        {loading && (
          <div className="text-center mt-2">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        {error && <p className="alert alert-danger"> {error} </p>}
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your Name"
              required
            />
          ) : (
            <></>
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
            state === "Login" ? login() : signup();
          }}
        >
          Continue
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

export default UserLoginSignup;

// import React, { useState } from "react";
// import "./CSS/LoginSignup.css";
// import api from "../api";
// // import Spinner from "react-bootstrap/Spinner";

// const LoginSignup = () => {
//   const [state, setState] = useState("Login");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [agreed, setAgreed] = useState(false);

//   // add the API for login
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     const formData =
//       state === "Login" ? { email, password } : { name, email, password };

//     const endPoint = state === "Login" ? "/users/login" : "/users/signup";

//     try {
//       const response = await api.post(endPoint, formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       console.log(`${state} successful`, response.data);
//       if (response.data.success && response.data.token) {
//         localStorage.setItem("auth-token", response.data.token);
//         window.location.replace("/");
//       } else {
//         console.log(`${state} failed`);
//         setError(response.data.error || `${state} failed`);
//       }
//     } catch (error) {
//       console.error("Unexpected error", error.message);
//       setError(
//         "Login failed. Please check credentials or try again later",
//         error.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="loginsignup">
//       <div className="loginsignup-container">
//         {/* {loading && (
//           <div className="text-center mt-2">
//             <Spinner animation="border" variant="primary" />
//           </div>
//         )} */}
//         {error && <p className="error-message">{error}</p>}

//         <h1>{state}</h1>
//         <form method="POST" onSubmit={handleSubmit}>
//           <div className="loginsignup-fields">
//             {state === "Sign Up" && (
//               <input
//                 name="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 type="text"
//                 placeholder="Your Name"
//               />
//             )}
//             <input
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               placeholder="Email Address"
//             />
//             <input
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               placeholder="Password"
//             />
//           </div>
//           <button disabled={loading}>
//             {loading ? "Please wait..." : "Continue"}
//           </button>
//         </form>

//         {state === "Sign Up" ? (
//           <p className="loginsignup-login">
//             Already have an account?{" "}
//             <span
//               onClick={() => {
//                 setState("Login");
//               }}
//             >
//               Login here
//             </span>
//           </p>
//         ) : (
//           <p className="loginsignup-login">
//             Create an account?{" "}
//             <span
//               onClick={() => {
//                 setState("Sign Up");
//               }}
//             >
//               Click here
//             </span>
//           </p>
//         )}
//         <div className="loginsignup-agree">
//           <input
//             type="checkbox"
//             name=""
//             id=""
//             checked={agreed}
//             onChange={() => setAgreed(!agreed)}
//           />
//           <p>By continuing, i agree to the terms of use & privacy policy.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginSignup;
