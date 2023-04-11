const mongoose = require("mongoose")


const appointmentSchema = new mongoose.Schema({
    hospital_id:{
        type:mongoose.Schema.ObjectId,
        ref:"Hospital"
    },
    doctor_id:{
        type:mongoose.Schema.ObjectId,
        ref:"Doctor"
    },
    user_id:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    department:{
        type:String,
    },
    req_date:{
        type:Date,
        default: Date.now
    },
    status:{
        type:String,
    },
    appointment_date:{
        type: Date,
    },
    time_of_appointment:{
        type:String
    },
    urgency:{
        type:Number,
        default: 0
    }
})


module.exports = mongoose.model("Appointment", appointmentSchema)