const express = require("express");

const {login,register} = require("../controllers/commonControllers")

const router = express.Router();

router.route("/").post(login)

router.route("/register").post(register)

module.exports = router;
