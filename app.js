const express = require("express");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(express.json());

//Route Imports
const userRoutes = require("./routes/userRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes.js");
const doctorRoutes = require("./routes/doctorRoutes.js");
const appointmentRoutes = require("./routes/appointmentRoutes.js")

//Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/hospital", hospitalRoutes);
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/appointment", appointmentRoutes)

// MiddleWare for Error

app.use(errorMiddleware);

module.exports = app;
