import React from "react";
import styles from "./HostelSelection.module.css"
import { Link, useLocation } from "react-router-dom";

function HostelSelectionPage() {
  return (
    <>
      <h2 className={styles["h2-tag"]}>Select Hostel</h2>
      <div className={styles["selection-main"]}>
        <Link to="/roomBooking">
          <button
            className={styles["button-74"]}
            onClick={() => {
              localStorage.setItem("hostelname", "MBH-A");
            }}
          >
            MBH-A
          </button>
        </Link>
        <Link to="/roomBooking">
          <button
            className={styles["button-74"]}
            onClick={() => {
              localStorage.setItem("hostelname", "MBH-B");
            }}
          >
            MBH-B
          </button>
        </Link>
        <Link to="/roomBooking">
          <button
            className={styles["button-74"]}
            onClick={() => {
              localStorage.setItem("hostelname", "MBH-F");
            }}
          >
            MBH-F
          </button>
        </Link>
      </div>
        <div className={styles.imge}>
</div>
        <div className={styles.imge1}>
</div>
    </>
  );
}

export default HostelSelectionPage;
