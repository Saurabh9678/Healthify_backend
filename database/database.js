const mongoose = require("mongoose");

const connectDataBase = ()=>{
    mongoose.connect("mongodb+srv://admin:admin123@cluster.ihnistu.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true}).then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
}

module.exports = connectDataBase