const otpGenerator = require("otp-generator");
const OTP = require("../models/otp");
const User = require("../models/user");

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if user is already present
    // const checkUserPresent = await User.findOne({ email });
    // // If user found with provided email
    // if (checkUserPresent) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "User is already registered",
    //   });
    // }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.verifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;
console.log(req.body);

  try {
    // Find the latest OTP for the given email
    const latestOTP = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    // Check if OTP matches
    if (!latestOTP || latestOTP.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // If OTP is correct, you can delete the OTP from the database or mark it as verified

    // For example, you can delete the OTP:
    await OTP.deleteOne({ email });

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    return next(new ErrorHandler("Failed to verify OTP", 500));
  }
};