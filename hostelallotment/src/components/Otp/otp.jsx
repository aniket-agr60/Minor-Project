import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./otp.module.css";

function OTPVerification() {
  const [otp, setOTP] = useState("");
  const [confirmedOTP, setConfirmedOTP] = useState("");
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setConfirmedOTP(otp);
    console.log(email + confirmedOTP + otp);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/otp/verifyOtp",
        { email, otp }
      );
      setOTP("");

      if (response.data) {
        navigate("/", { state: { name: name, email: email } });
      } else {
        // OTP verification failed
        alert(data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
      console.error("Error Otp verification:", error);
    }
  };

  return (
    <div className={styles.maindiv}>
      <h2 className={styles.otph}>OTP Verification</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.otpdiv}>
          <label htmlFor="otp">Enter OTP:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={handleChange}
            required
            className={styles["inputotp"]}
          />
        </div>
        <button className={styles["otp-button"]} type="submit">
          Verify OTP
        </button>
      </form>
    </div>
  );
}

export default OTPVerification;
