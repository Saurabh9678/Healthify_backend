const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Doctor = require("../models/doctorModel");
const sendToken = require("../utils/jwtToken");

// Register a Doctor
exports.registerDoctor = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const doctor = await Doctor.create({
    name,
    email,
    password,
  });

  sendToken(doctor, 201, res);
});

// Login Doctor
exports.loginDoctor = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password"), 400);
  }

  const doctor = await Doctor.findOne({ email }).select("+password");

  if (!doctor) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await doctor.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(doctor, 200, res);
});

// Logout Doctor
exports.logoutDoctor = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
    error: "",
  });
});
