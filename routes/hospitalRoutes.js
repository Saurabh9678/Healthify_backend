const express = require("express");

const {
  registerHospital,
  loginHospital,
  logoutHospital,
  getHospitalDetailPostman,
  getHospitalDetail,
  getAllNewAppointments,
  updateHostpitalDetail,
} = require("../controllers/hospitalController");


const { resToAppointment } = require("../controllers/appointmentController");




const router = express.Router();

router.route("/register").post(registerHospital);

router.route("/login").post(loginHospital);

router.route("/logout").get(logoutHospital);

router.route("/detail/:h_id").get(getHospitalDetail).put(updateHostpitalDetail);

router.route("/all-appointment/:h_id").get(getAllNewAppointments)


//Appointment controller
router.route("/resApt/:apt_id").post(resToAppointment);


// For Postman --> All Details
router.route("/all-detail/:h_id").get(getHospitalDetailPostman);



module.exports = router;
