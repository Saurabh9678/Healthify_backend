const express = require("express");

const {
  loginUser,
  registerUser,
  logoutUser,
  getUserDetail,
  getUserDetailsPostman,
  updateUserDetail,
  getAllUsersDetailsPostman,
} = require("../controllers/userController");

const { isAuthenticatedUser } = require("../middleware/auth");

const { reqAppointment } = require("../controllers/appointmentController");

const {
  searchedHospital,
  getHospitalDetailForUser,
} = require("../controllers/hospitalController");

const { getPrescription } = require("../controllers/prescriptionController");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(isAuthenticatedUser, logoutUser);

router
  .route("/details/:u_id")
  .get(isAuthenticatedUser, getUserDetail)
  .put(isAuthenticatedUser, updateUserDetail);

//appointment controller
router.route("/reqApt").post(isAuthenticatedUser, reqAppointment);

//from hospital controller
router.route("/searchHospital").get(isAuthenticatedUser, searchedHospital);
router
  .route("/hospital-detail/:h_id")
  .get(isAuthenticatedUser, getHospitalDetailForUser);

//postman route only for testing
router.route("/detail/:u_id/postman").get(getUserDetailsPostman);
router.route("/all-detail/postman").get(getAllUsersDetailsPostman);
router.route("/prescription/:u_id").get(getPrescription);

module.exports = router;
