import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import axios from "axios";

const Login = () => {
  useEffect(() => {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    registerBtn.addEventListener("click", () => {
      container.classList.add("active");
    });

    loginBtn.addEventListener("click", () => {
      container.classList.remove("active");
    });

    return () => {
      registerBtn.removeEventListener("click", () => {});
      loginBtn.removeEventListener("click", () => {});
    };
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    // console.log(`${process.env.REACT_APP_BACKEND_BASE_URL}/login`);
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/login`, {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
        window.location.reload();
        setIsLoading(false);
        alert("Login successful!");
      })
      .catch((error) => {
        console.error("There was an error logging in!", error);
        setIsLoading(false);
        alert("Please check your credentials and try again!!");
      });
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/register`, {
        name: signUpName,
        email: signUpEmail,
        password: signUpPassword,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
        window.location.reload();
        alert("Account created successfully!");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was an error creating the account!", error);
        setIsLoading(false);
        alert("There was an error creating the account!! Please try again!");
      });
  };

  return (
    <div className="login-page-container">
      <div className="container" id="container">
        <div className="form-container sign-up">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-microsoft"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-light fa-mobile-screen"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input
              type="text"
              value={signUpName}
              onChange={(e) => {
                setSignUpName(e.target.value);
                console.log(signUpName);
              }}
              placeholder="Name"
              required
            />
            <input
              type="email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">{isLoading?"Loading...":"Sign Up"}</button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form onSubmit={handleSignIn}>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-microsoft"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email password</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <a href="#">Forget Your Password?</a>
            <button type="submit">{isLoading?"Loading...":"Sign In"}</button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden-auth" id="login">
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button className="hidden-auth" id="register">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
