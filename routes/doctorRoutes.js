const express = require("express");
const {
  loginDoctor,
  logoutDoctor,
  getAllDoctorsDetailsPostman,
  getDoctorDetailsPostman,
} = require("../controllers/doctorController.js");

// const { getAppointment } = require("../controllers/appointmentController.js");

const {
  addPrescription,
  updateUserPrescription,
} = require("../controllers/prescriptionController.js");



const router = express.Router();


router.route("/login").post(loginDoctor);

router.route("/logout").get(logoutDoctor);



router.route("/add-prescription").post(addPrescription);


//POSTMAN
router.route("/all-doctor-details").get(getAllDoctorsDetailsPostman)
router.route("/detail/:d_id").get(getDoctorDetailsPostman)


module.exports = router;
