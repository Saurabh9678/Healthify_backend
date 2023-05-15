const express = require("express");
const {
  loginDoctor,
  logoutDoctor,
} = require("../controllers/doctorController.js");

// const { getAppointment } = require("../controllers/appointmentController.js");

const {
  addPrescription,
  updateUserPrescription,
} = require("../controllers/prescriptionController.js");



const router = express.Router();


router.route("/login").post(loginDoctor);

router.route("/logout").get(logoutDoctor);


// For testing appointment details
// router.route("/:id").get(getAppointment)

router.route("/add-prescription").post(addPrescription);

module.exports = router;
