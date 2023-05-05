const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Hospital = require("../models/hospitalModel");
const sendToken = require("../utils/jwtToken");
const User = require("../models/userModel");

// Hospsital Controller
// Register a hospital
exports.registerHospital = catchAsyncError(async (req, res, next) => {
  const { name, email, password, gst_in, longitude, latitude } = req.body;

  const hospital = await Hospital.create({
    name,
    email,
    password,
    gst_in,
    longitude,
    latitude,
  });

  sendToken(hospital, 201, res);
});

// Login Hospital
exports.loginHospital = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const hospital = await Hospital.findOne({ email }).select("+password");

  if (!hospital) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await hospital.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(hospital, 200, res);
});

// Logout Hospital
exports.logoutHospital = catchAsyncError(async (req, res, next) => {
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

//GET hospital details ---> Profile
exports.getHospitalDetail = catchAsyncError(async (req, res, next) => {
  const hospital = await Hospital.findById(req.params.h_id);
  if (!hospital) {
    return next(new ErrorHandler("No hospital found", 400));
  }

  res.status(200).json({
    success: true,
    hospital: {
      id: hospital._id,
      name: hospital.name,
      email: hospital.email,
      gst_in: hospital.gst_in,
      contact_number: hospital.contact_number,
      address: hospital.address,
      departments: hospital.departments,
    },
    message: "Success",
    eroor: "",
  });
});

// Update Hospital Profile
exports.updateHostpitalDetail = catchAsyncError(async (req, res, next) => {
  const hospital = await Hospital.findByIdAndUpdate(req.params.h_id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    hospital,
    message: "Updated",
    error: "",
  });
});

// Get new appointments
exports.getAllNewAppointments = catchAsyncError(async (req, res, next) => {
  const hospital = await Hospital.findById(req.params.h_id).populate(
    "new_appoinments.apt_id",
    "_id user_id appointment_date"
  );

  const appointments = await Promise.all(
    hospital.new_appoinments.map(async (apt) => {
      const user = await User.findById(apt.apt_id.user_id);
      return {
        _id: apt.apt_id._id,
        user_id: apt.apt_id.user_id,
        user: {
          name: user.name,
          email: user.email,
          dob: user.dob,
          blood_group: user.blood_group,
          gender: user.gender,
          phone_number: user.phone_number,
          address: user.address,
        },
        appointment_date: apt.apt_id.appointment_date,
      };
    })
  );

  res.status(200).json({
    success: true,
    appointments: appointments,
    message: "Success",
    error: "",
  });
});

// FOR USER CONTROLLERS
// Get hospital details
exports.getHospitalDetailForUser = catchAsyncError(async (req, res, next) => {
  const hospital = await Hospital.findById(req.params.h_id);
  if (!hospital) {
    return next(new ErrorHandler("No hospital found", 400));
  }

  res.status(200).json({
    success: true,
    hospital: {
      id: hospital._id,
      name: hospital.name,
      email: hospital.email,
      contact_number: hospital.contact_number,
      address: hospital.address,
      departments: hospital.departments,
    },
    message: "Success",
    eroor: "",
  });
});

// Search for Hospital Details
exports.searchedHospital = catchAsyncError(async (req, res, next) => {
  // Get the latitude and longitude from the request body
  const { latitude, longitude } = req.body;

  // Calculate the difference between the latitude and longitude coordinates for 20km  square area
  const distanceDiff = 0.20143519329187;

  // Calculate the left, right, top, and bottom coordinates of the square area for the search
  const leftCord = longitude - distanceDiff,
    rightCord = longitude + distanceDiff,
    topCord = latitude + distanceDiff,
    bottomCord = latitude - distanceDiff;

  // Query the hospital collection for hospitals within the specified latitude and longitude range
  const hospitals = await Hospital.find(
    {
      $and: [
        {
          $and: [
            { longitude: { $gt: leftCord } },
            { longitude: { $lt: rightCord } },
          ],
        },
        {
          $and: [
            { latitude: { $gt: bottomCord } },
            { latitude: { $lt: topCord } },
          ],
        },
      ],
    },
    {
      _id: 1,
      name: 1,
      address: 1,
    }
  );

  // Return the list of hospitals as JSON response
  res.status(200).json({
    success: true,
    hospitals,
    message: "Success",
    error: "",
  });
});

// FOR POSTMAN TEST CONTROLLERS
// Get Single hospital details
exports.getHospitalDetailPostman = catchAsyncError(async (req, res, next) => {
  const hospital = await Hospital.findById(req.params.h_id);
  if (!hospital) {
    return next(new ErrorHandler("No hospital found", 404));
  }

  res.status(200).json({
    success: true,
    hospital: hospital,
    message: "Success",
    error: "",
  });
});

//Get all hospital details
exports.getAllHospitalDetailsPostman = catchAsyncError(
  async (req, res, next) => {
    const hospitals = await Hospital.find(
      {},
      {
        _id: 1,
        name: 1
      }
    );
    if (!hospitals) {
      return next(new ErrorHandler("No Hospitals available", 404));
    }

    res.status(200).json({
      success: "true",
      hospital_count: hospitals.length,
      hospitals,
      message: "Successful",
      error: "",
    });
  }
);
