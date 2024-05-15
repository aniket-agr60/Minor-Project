import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaHandsClapping } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import styles from "./Navbar.module.css"
import axios from "axios"
function Navbar (){
  const location = useLocation();
  const { name } = location.state || { name: "" };
  const { email } = location.state || { email: "" };
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
 const handleallotment = () => {
   localStorage.setItem("email", email);
 };
 const handlelogout = async () => {
   try {
     const response = await axios.post(
       "http://localhost:8000/api/v1/user/logout"
     );
     if (response.data) {
       navigate("/");
     } else {
       alert(data.message);
     }
   } catch (error) {
     console.error("Logout Failed", error);
   }
 };
return (
  <nav className={`${styles.navbar}`}>
    <ul className={styles["nav-links"]}>
      <li>
        <a href="#about">About</a>
      </li>
      <li>
        <a href="#circulars">Circulars</a>
      </li>
      <li>
        <a href="#attendance">Attendance</a>
      </li>
      <li>
        <Link
          onClick={handleallotment}
          to={{
            pathname: "/hostelSelection",
            state: { userEmail: email },
          }}
        >
          Hostel Allotment
        </Link>
      </li>
      <div className={styles["notification"]}>
        <li>
          <IoMdNotifications className="h-6 w-6" />
        </li>
      </div>
      <li>
        {name ? (
          <div className={styles.dropdown}>
            <div onClick={toggleDropdown}>
              <div className={styles["dispname"]}>
                <CgProfile className="h-6 w-6" /> Hi! {name}{" "}
              </div>
            </div>
            {showDropdown && (
              <div className={styles.dropdownContent}>
                <div className={styles.dropdownitems}>Update Password</div>
                <hr />
                <div className={styles.dropdownitems} onClick={handlelogout}>
                  Logout
                  <IoIosLogOut />
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/signup">
            <button className={`${styles["btn"]} ${styles["signup-button"]}`}>
              Login / Sign up
            </button>
          </Link>
        )}
      </li>
    </ul>
  </nav>
);
}

export default Navbar;