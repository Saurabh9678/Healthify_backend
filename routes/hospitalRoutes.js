const express = require("express");

const {
  registerHospital,
  loginHospital,
  logoutHospital,
  getHospitalDetailPostman,
  getHospitalDetail,
  getAllNewAppointments,
  updateHostpitalDetail,
  getAllHospitalDetailsPostman,
} = require("../controllers/hospitalController");

const { addDoctorByHospital } = require("../controllers/doctorController");

const {
  resToAppointment,
  getAllAcceptedAppointmentManagement,
} = require("../controllers/appointmentController");

const { isAuthenticatedHospital } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerHospital);

router.route("/login").post(loginHospital);

router.route("/logout").get(isAuthenticatedHospital, logoutHospital);

router
  .route("/detail/:h_id")
  .get(isAuthenticatedHospital, getHospitalDetail)
  .put(isAuthenticatedHospital, updateHostpitalDetail);

router
  .route("/all-appointment/:h_id")
  .get(isAuthenticatedHospital, getAllNewAppointments);

router
  .route("/add-doctor/:h_id")
  .post(isAuthenticatedHospital, addDoctorByHospital);

//Appointment controller
router.route("/resApt/:apt_id").post(isAuthenticatedHospital, resToAppointment);
router
  .route("/acceptedApt")
  .get(isAuthenticatedHospital, getAllAcceptedAppointmentManagement);

// For Postman --> All Details
router.route("/all-detail/:h_id/postman").get(getHospitalDetailPostman);
router.route("/all-hospital/postman").get(getAllHospitalDetailsPostman);

module.exports = router;
