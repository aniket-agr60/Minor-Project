const express = require("express");
const {
  addHostel,
  updateHostel,
  getHostel,
  bookRoom,
  addHostelAndRooms,
  roomCounts,
  getBookedRooms,
  // insertRooms,
} = require("../controllers/hostel");
const { routes } = require("../app");
const router = express.Router();

router.route("/addHostel").post(addHostel);
router.route("/updateHostel").patch(updateHostel);
router.route("/:id").get(getHostel);
router.route("/bookRoom").post(bookRoom);
router.route("/addhostelandrooms").post(addHostelAndRooms);
router.route("/:hostelName/roomCounts").get(roomCounts);
router.route("/:hostelName/getBookedRooms").get(getBookedRooms);
module.exports = router;
