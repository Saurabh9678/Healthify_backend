const express = require("express");

const {
  loginUser,
  registerUser,
  logoutUser,
  getUserDetail,
  getUserDetailsPostman,
  updateUserDetail,
} = require("../controllers/userController");

const { reqAppointment } = require("../controllers/appointmentController");
const { searchedHospital } = require("../controllers/hospitalController");
const { getPrescription } = require("../controllers/prescriptionController");


const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/details/:u_id").get(getUserDetail).put(updateUserDetail);

//appointment controller
router.route("/reqApt").post(reqAppointment);

//from hospital controller
router.route("/searchHospital").get(searchedHospital);

//postman route only for testing
router.route("/postman/:u_id").get(getUserDetailsPostman);

router.route("/prescription/:u_id").get(getPrescription);

module.exports = router;
