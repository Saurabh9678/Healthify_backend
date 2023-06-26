const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
  },
  email: {
    type: String,
    unique:true,
    required: [true, "Please Enter your email"],
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your password"],
    select: false,
  },
  dob:{
    type:String,
    default:"NA"
  },
  blood_group: {
    type: String,
    default: "NA"
  },
  phone_number: {
    type: String,
    default: "0"
  },
  gender: {
    type: String,
    default:"NA"
  },
  address: {
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    district: {
      type: String,
    },
    pin_code: {
      type: String,
    },
  },
  prescriptions: [
    {
      prescription: {
        type: mongoose.Schema.ObjectId,
        ref: "Prescription",
      },
    },
  ],
  appointments: [
    {
      acpt_appointment: {
        type: mongoose.Schema.ObjectId,
        ref: "Appointment",
      },
    },
  ],
  req_appointments: [
    {
      req_appt: {
        type: mongoose.Schema.ObjectId,
        ref: "Appointment",
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  
};

// Compare Password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model("User", userSchema);