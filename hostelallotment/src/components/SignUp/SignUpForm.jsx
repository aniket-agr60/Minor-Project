import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./SignUpForm.module.css";
import OTPVerification from "../Otp/otp";
// import { useHistory } from "react-router-dom";

function SignUpForm() {
  // const history = useHistory();
  const [signUpFormData, setSignUpFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    console.log("Sign Up Form submitted with data:", signUpFormData);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        signUpFormData
      );
      const { email } = signUpFormData;
      const { name } = signUpFormData;
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
      navigate("/otpverification");
    } catch (error) {
      console.error("Error signing up:", error);
      alert(error.response.data.message);
    }
    setSignUpFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Form submitted with data:", loginFormData);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        {
          email: loginFormData.email,
          password: loginFormData.password,
        }
      );
      console.log(response);
      if (response.data) {
        console.log(response.data.user.name);
        localStorage.setItem("email", response.data.user.email);
        navigate("/", {
          state: {
            name: response.data.user.name,
            email: response.data.user.email,
          },
        });
      } else if (response.data.sucess === false) {
      }
    } catch (error) {
      // console.error("Error logging in:", error);
      alert(error.response.data.message);
    }
    setLoginFormData({
      email: "",
      password: "",
    });
  };

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  return (
    <div className={`${styles.signup}`}>
      <div
        className={`${styles.container} ${
          isSignUpActive ? styles["right-panel-active"] : ""
        }`}
        ref={containerRef}
      >
        <div
          className={`${styles["form-container"]} ${styles["sign-up-container"]}`}
        >
          <form onSubmit={handleSignUpSubmit}>
            <h1>Create Account</h1>

            <span>Enter Your Details here</span>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={signUpFormData.name}
              onChange={handleSignUpChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={signUpFormData.email}
              onChange={handleSignUpChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={signUpFormData.password}
              onChange={handleSignUpChange}
            />
            <button className={styles["btn"]} type="submit">
              Sign Up
            </button>
          </form>
          <OTPVerification />
        </div>
        <div
          className={`${styles["form-container"]} ${styles["sign-in-container"]}`}
        >
          <form onSubmit={handleLoginSubmit}>
            <h1>Sign in</h1>
            <br />
            <span>Enter Your Details here</span>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={loginFormData.email}
              onChange={handleLoginChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={loginFormData.password}
              onChange={handleLoginChange}
            />
            <a href="#">Forgot your password?</a>
            <button className={styles["btn"]} type="submit">
              Sign In
            </button>
          </form>
        </div>
        <div className={styles["overlay-container"]}>
          <div className={styles.overlay}>
            <div
              className={`${styles["overlay-panel"]} ${styles["overlay-left"]}`}
            >
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className={`${styles.ghost} ${styles['btn']}`} onClick={handleSignInClick}>
                Sign In
              </button>
            </div>
            <div
              className={`${styles["overlay-panel"]} ${styles["overlay-right"]}`}
            >
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className={`${styles.ghost} ${styles['btn']}`} onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
