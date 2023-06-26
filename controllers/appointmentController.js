const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const Hospital = require("../models/hospitalModel");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const mongoose = require("mongoose");

//Make appointment --USER
exports.reqAppointment = catchAsyncError(async (req, res, next) => {
  const { h_id, u_id, appointment_date,description } = req.body;
  const hospital_id = new mongoose.Types.ObjectId(h_id);
  const user_id = new mongoose.Types.ObjectId(u_id);

  const appointment = await Appointment.create({
    hospital_id,
    user_id,
    appointment_date,
    description
  });

  //User
  const user = await User.findById(user_id);
  user.req_appointments.push({ req_appt: appointment._id });

  //Hospital
  const hospital = await Hospital.findById(hospital_id);
  hospital.new_appoinments.push({ apt_id: appointment._id });

  await user.save({ validateBeforeSave: false });
  await hospital.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment request success",
    error: "",
  });
});

//Get All Accepted Appointments of User

exports.getAllAcceptedAppointment = catchAsyncError(async (req, res, next) => {
  const { appointments } = req.user;

  if (appointments.length === 0) {
    res.status(200).json({
      success: true,
      message: "No available appointments",
      error: "",
    });
  } else {
    const populatedAppointments = await Appointment.find({
      _id: { $in: appointments.map((app) => app.acpt_appointment) },
    })
      .populate("hospital_id", "name")
      .populate("doctor_id", "name")
      .select("-user_id -__v -req_date -status -urgency")
      .exec();

    res.status(200).json({
      success: true,
      appointment_count: populatedAppointments.length,
      appointments: populatedAppointments,
      message: "Appointment retrieve successful",
      error: "",
    });
  }
});

//Change status of appointment (accept/reject) --Management
exports.resToAppointment = catchAsyncError(async (req, res, next) => {
  const { status, doctor_id, department } = req.body;

  const appointment = await Appointment.findByIdAndUpdate(
    req.params.apt_id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  //if accepted
  if (status === "A") {
    if (doctor_id && department) {
      //User
      const user = await User.findById(appointment.user_id);
      user.appointments.push({ acpt_appointment: appointment._id });

      const req_appointments = user.req_appointments.filter(
        (apt) => apt.req_appt.toString() !== appointment._id.toString()
      );
      user.req_appointments = req_appointments;

      //Hospital
      const hospital = await Hospital.findById(appointment.hospital_id);
      hospital.accepted_appointments.push({ acpt_apt_id: appointment._id });

      const new_appoinments = hospital.new_appoinments.filter(
        (apt) => apt.apt_id.toString() !== appointment._id.toString()
      );
      hospital.new_appoinments = new_appoinments;

      //Add the accepted appointment's id to the doctor's model
      const doctor = await Doctor.findById(appointment.doctor_id);
      doctor.allAppointments.push({ appointment: appointment._id });

      await user.save({ validateBeforeSave: false });
      await hospital.save({ validateBeforeSave: false });
      await doctor.save({ validateBeforeSave: false });

      res.status(200).json({
        success: true,
        appointment,
        message: "Appointment Accepted",
        error: "",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Doctor Not Assigned",
        error: "Doctor Not Assigned",
      });
    }
  } else if (status === "R") {
    const user = await User.findById(appointment.user_id);

    const req_appointments = user.req_appointments.filter(
      (apt) => apt.req_appt.toString() !== appointment._id.toString()
    );
    user.req_appointments = req_appointments;

    const hospital = await Hospital.findById(appointment.hospital_id);

    const new_appoinments = hospital.new_appoinments.filter(
      (apt) => apt.apt_id.toString() !== appointment._id.toString()
    );
    hospital.new_appoinments = new_appoinments;

    await user.save({ validateBeforeSave: false });
    await hospital.save({ validateBeforeSave: false });
    await Appointment.findByIdAndDelete(req.params.apt_id);
    res.status(200).json({
      success: true,
      message: "Appointment Rejected",
      error: "",
    });
  }
});

//get appointment detail --Management

exports.getAppointmentDetail = catchAsyncError(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.apt_id)
    .populate("hospital_id", "_id name")
    .populate("user_id", "_id name");

  res.status(200).json({
    success: true,
    appointment,
    message: "Success",
    error: "",
  });
});

//Get All Accepted Appointments of Management

exports.getAllAcceptedAppointmentManagement = catchAsyncError(
  async (req, res, next) => {

    const { accepted_appointments } = req.user;

    if (accepted_appointments.length === 0) {
      res.status(200).json({
        success: true,
        message: "No available appointments",
        error: "",
      });
    } else {
      const populatedAppointments = await Appointment.find({
        _id: { $in: accepted_appointments.map((app) => app.acpt_apt_id) },
      })
        .populate("user_id", "name")
        .populate("doctor_id", "name")
        .select("-hospital_id -__v -req_date -status -urgency")
        .exec();

      res.status(200).json({
        success: true,
        appointment_count: populatedAppointments.length,
        appointments: populatedAppointments,
        message: "Appointment retrieve successful",
        error: "",
      });
    }
  }
);
