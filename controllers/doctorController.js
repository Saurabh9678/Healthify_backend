const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Doctor = require("../models/doctorModel");
const Hospital = require("../models/hospitalModel");
const sendToken = require("../utils/jwtToken");


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

//Hospital controller
//Add doctor by hospital management
exports.addDoctorByHospital = catchAsyncError(async (req, res, next) => {
  const {
    department_name,
    doctor_name,
    doctor_email,
    doctor_password,
    doctor_license_id,
  } = req.body;
  const hospital_id = req.params.h_id;

  let pushed = 0;

  const doctor = await Doctor.create({
    name: doctor_name,
    email: doctor_email,
    password: doctor_password,
    license_id: doctor_license_id,
  });

  const hospital = await Hospital.findById(hospital_id);

  hospital.departments.forEach((department) => {
    if (department.dept_name.toLowerCase() === department_name.toLowerCase()) {
      department.doctors.push({ doct_id: doctor._id });
      pushed = 1;
      return;
    }
  });

  if (pushed === 0) {
    const dept_name =
      department_name.charAt(0).toUpperCase() + department_name.slice(1);

    const dept_data = {
      dept_name,
      doctors: [
        {
          doct_id: doctor._id,
        },
      ],
    };
    hospital.departments.push(dept_data);
  }

  await hospital.save({ validateBeforeSave: false });

  res.status(200).json({
    status: true,
    message: "Doctor added",
    error: ""
  })


});
