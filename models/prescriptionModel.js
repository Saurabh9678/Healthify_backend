const mongoose = require("mongoose")

const prescriptionSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    doctor_id:{
        type:mongoose.Schema.ObjectId,
        ref:"Doctor"
    },
    hospital_id:{
        type:mongoose.Schema.ObjectId,
        ref:"Hospital"
    },
    appointment_id:{
        type:mongoose.Schema.ObjectId,
        ref:"Appointment"
    },
    date_of_issue:{
        type:Date,
        default: Date.now
    },
    medicines:[
        {
            medicine_name:{
                type:String,
            },
            dose:{
                type:Number,
            },
            to_take:{
                type:String,
            },
            timeline:{
                type:String
            }
        }
    ],
    disease:[
        {
            disease_name:{
                type:String,
            }
        }
    ],
    tests:{
        type:Array,
    }
})


module.exports = mongoose.model("Prescription", prescriptionSchema)