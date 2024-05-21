const mongoose = require ("mongoose")
const UserSchema = mongoose.Schema({
    name:String,
    password:{
        type:String
    }
   
},{timestamps: true})
module.exports=mongoose.model("users",UserSchema)