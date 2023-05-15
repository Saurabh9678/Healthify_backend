const express = require("express");

const {
  getAllPrescriptionDetails,
} = require("../controllers/prescriptionController");

const router = express.Router();




//POSTMAN
router.route("/all-prescription-detail").get(getAllPrescriptionDetails);



module.exports = router;
