const express = require("express");
const errorMiddleware = require("./middleware/error");


const app = express();

app.use(express.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Request-Headers", 'https');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-api-key");
    next();
  });

//Route Imports
const userRoutes = require("./routes/userRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes.js");
const doctorRoutes = require("./routes/doctorRoutes.js");
const appointmentRoutes = require("./routes/appointmentRoutes.js")
const prescriptionRoutes = require("./routes/prescriptionRoutes")

//Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/hospital", hospitalRoutes);
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/appointment", appointmentRoutes)
app.use("/api/v1/prescription", prescriptionRoutes)

// MiddleWare for Error

app.use(errorMiddleware);

module.exports = app;
