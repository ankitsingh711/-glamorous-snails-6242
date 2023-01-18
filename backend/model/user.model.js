const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    phone : {type:Number, unique:true},
    email : {type:String, unique:true},
    dob : {type:String},
    password : {type:String, min:6}
}, {versionKey:false});

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };
