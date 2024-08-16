const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
        "first_Name":String,
        "last_Name":String,
        "age":Number,
        "gender":String,
        "phone_Number":Number,
        "hobbies":[""],
        "email":{
            type:String,
            required:[true,"Please enter Your Email"],
            unique:true,
        },
        "password":{
           type:String,
           required:[true,"Please enter Your password"],
        }
})


const User = mongoose.model("users",userSchema);

module.exports = User;