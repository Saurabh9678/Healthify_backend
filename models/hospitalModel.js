const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the hospital name"],
  },
  email: {
    type: String,
    unique:true,
    required: [true, "Please enter email"],
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    select: false,
  },
  gst_in: {
    type: String,
    required: [true, "Please provide GST IN number"],
    select: false,
  },
  contact_number: {
    type: Array,
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
      type: Number,
    },
  },
  departments: [
    {
      dept_name: {
        type: String,
      },
      doctors: [
        {
          doct_id: {
            type: mongoose.Schema.ObjectId,
            ref: "Doctor",
          },
        },
      ],
    },
  ],
  new_appoinments: [
    {
      apt_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Appointment",
      },
    },
  ],
  accepted_appointments: [
    {
      acpt_apt_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Appointment",
      },
    },
  ],
});

hospitalSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
hospitalSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password
hospitalSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Hospital", hospitalSchema);
