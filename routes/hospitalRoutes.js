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

const {addDoctorByHospital} = require("../controllers/doctorController")

const { resToAppointment } = require("../controllers/appointmentController");

const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerHospital);

router.route("/login").post(loginHospital);

router.route("/logout").get(isAuthenticatedUser, logoutHospital);

router
  .route("/detail/:h_id")
  .get(isAuthenticatedUser, getHospitalDetail)
  .put(isAuthenticatedUser, updateHostpitalDetail);

router.route("/all-appointment/:h_id").get(getAllNewAppointments);

router.route("/add-doctor/:h_id").post(addDoctorByHospital)





//Appointment controller
router.route("/resApt/:apt_id").post(resToAppointment);






// For Postman --> All Details
router.route("/all-detail/:h_id/postman").get(getHospitalDetailPostman);
router.route("/all-hospital/postman").get(getAllHospitalDetailsPostman);

module.exports = router;
