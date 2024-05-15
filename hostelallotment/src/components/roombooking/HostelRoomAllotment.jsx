import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./HostelRoomAllotment.module.css";
import floor1image from "../../../public/B0.jpg";
import floor2image from "../../../public/B1.jpg";
import floor3image from "../../../public/B2.jpg";
import floor4image from "../../../public/B3.jpg";
import floor5image from "../../../public/B4.jpg";
import floor6image from "../../../public/B5.jpg";
import floor7image from "../../../public/B6.jpg";
import Navbar from "../navbar/Navbar";

const RoomSelector = () => {
  const userEmail = localStorage.getItem("email");
  const hostelName = localStorage.getItem("hostelname");
  const [totalRoomsPerFloor, setTotalRoomsPerFloor] = useState(0);
  const [totalFloors, setTotalFloors] = useState(0);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [bookedRooms, setbookedRooms] = useState([]);
  const [floorImages, setFloorImages] = useState([
    floor1image,
    floor2image,
    floor3image,
    floor4image,
    floor5image,
    floor6image,
    floor7image,
  ]);

  const getRoomsForFloor = (floor) => {
    const startRoom = floor * 100 + 1;
    const endRoom = startRoom + totalRoomsPerFloor - 1;
    return Array.from(
      { length: totalRoomsPerFloor },
      (_, index) => startRoom + index
    );
  };

  const fetchRoomCounts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/hostel/${hostelName}/roomCounts`
      );
      const { totalRoomsPerFloor, totalFloors } = response.data;
      setTotalRoomsPerFloor(totalRoomsPerFloor);
      setTotalFloors(totalFloors);
    } catch (error) {
      console.error("Error fetching room counts:", error);
    }
  };
  fetchRoomCounts();

  useEffect(() => {
    async function fetchBookedRooms() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/hostel/${hostelName}/getBookedRooms`
        );
        const bookedRoomsData = response.data;
        setbookedRooms(bookedRoomsData);
      } catch (error) {
        console.error("Error fetching booked rooms:", error);
      }
    }

    fetchBookedRooms();
  }, []);

  const handleFloorChange = (e) => {
    setSelectedFloor(parseInt(e.target.value));
  };

  const handleRoomClick = async (roomNumber) => {
    try {
      if (bookedRooms.includes(roomNumber)) {
        alert("Room is already booked!");
        return;
      }

      const isConfirmed = window.confirm(
        `Are you sure you want to book room Number ${roomNumber}?`
      );
      if (isConfirmed) {
        const response = await axios.post(
          "http://localhost:8000/api/v1/hostel/bookRoom",
          {
            studentId: userEmail,
            hostelName: hostelName,
            roomNumber: roomNumber,
          }
        );
        if (response.data.success) {
          alert("Room booked successfully!");
          window.location.reload();
        } else {
          alert("Failed to book room: " + response.data.message);
        }
      }
    } catch (error) {
      console.error("Booking failed", error);
      alert("Booking failed. Please try again.");
    }
  };
  const roomNumbers = bookedRooms.map((room) => room.roomNumber);

  return (
<>
 {/* <Navbar/> */}
    <div className={styles["room-main"]}>
      <h2>Select a Room</h2>
      <div>
        <label htmlFor="floorSelect">Select Floor : </label>
        <select
          id="floorSelect"
          value={selectedFloor}
          onChange={handleFloorChange}
        >img
          {Array.from({ length: totalFloors }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index == 0 ? "Ground Floor" : `Floor ${index}`}
            </option>
          ))}
        </select>
      </div>
      <div className={styles["room-grid"]}>
        {getRoomsForFloor(selectedFloor).map((roomNumber) => (
          <div
            key={roomNumber}
            className={`${styles["room-block"]} ${
              roomNumbers.includes(roomNumber.toString())
                ? styles["booked"]
                : styles["available"]
            }`}
            onClick={() => handleRoomClick(roomNumber)}
          >
            {roomNumber}
          </div>
        ))}

        <br />
        <br />
        <br />
        <div className={styles["buttons-container"]}>
          <div className={styles["bottom-button"]}>
            <div
              className={`${styles["room-block"]} ${styles["booked"]}`}
            ></div>
            <p> &nbsp;:&nbsp;Booked</p>
          </div>
          <div className={styles["bottom-button"]}>
            <div
              className={`${styles["room-block"]} ${styles["available"]}`}
            ></div>
            <p> &nbsp;:&nbsp;Available</p>
          </div>
        </div >
        <img
          src={floorImages[selectedFloor - 1]}
          alt={`Floor ${selectedFloor}`}
className={styles.floorimg}
        />
      </div>
    </div>
</>
  );
};

export default RoomSelector;
