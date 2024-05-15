const express = require("express");
const router = express.Router();
const { sendOTP, verifyOTP } = require("../controllers/otpController");
router.route("/sendOtp").post(sendOTP);
router.route("/verifyOtp").post(verifyOTP);

router.route("/test").get(async (req, res) => {
  // const newsubject = await subject.create({
  //   dsapages: [],
  //   languagepages: [],
  //   csfundamentalspages: [],
  //   projectpages: [],
  // });
  res.status(200).json({
    success: true,
    message:
      "Welcome to the API, this is test route, Server running successfully !!",
  });
});
module.exports = router;
