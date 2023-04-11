const express = require("express")
const { getAppointmentDetail } = require("../controllers/appointmentController")

const router = express.Router()

router.route("/detail/:apt_id").get(getAppointmentDetail)

module.exports = router