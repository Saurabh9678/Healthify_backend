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

const { isAuthenticatedUser } = require("../middleware/auth");

const { resToAppointment } = require("../controllers/appointmentController");

const router = express.Router();

router.route("/register").post(registerHospital);

router.route("/login").post(loginHospital);

router.route("/logout").get(isAuthenticatedUser, logoutHospital);

router
  .route("/detail/:h_id")
  .get(isAuthenticatedUser, getHospitalDetail)
  .put(isAuthenticatedUser, updateHostpitalDetail);

router.route("/all-appointment/:h_id").get(getAllNewAppointments);

//for user routes
//Appointment controller
router.route("/resApt/:apt_id").post(resToAppointment);

// For Postman --> All Details
router.route("/all-detail/:h_id/postman").get(getHospitalDetailPostman);
router.route("/all-hospital/postman").get(getAllHospitalDetailsPostman);

module.exports = router;
