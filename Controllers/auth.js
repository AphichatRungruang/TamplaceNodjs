const { JsonWebTokenError } = require("jsonwebtoken")
const User = require ("../Models/Users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { token } = require("morgan")

exports.register = async(req, res) =>{
    try{
      
        const{name,password}=req.body
        var user = await User.findOne({name})
       
        if(user){
            return res.send("User Alreay Exists!!!").status(400)
        }
        //Encrypt
        const salt = await bcrypt.genSalt(14)
        user = new User({
            name,
            password
        })
      
        user.password =await bcrypt.hash(password,salt)

       // console.log(user)
        //Save
       await user.save()
        res.send("Register Suuess!!!")

    }catch(err){
        console.log(err)
        res.status(500).send("Sever error")
    }
}
exports.login = async(req, res) =>{
    try{
        //code
        //Check User
        const {name ,password} = req.body
        var user = await User.findOneAndUpdate({name},{new:true})
        console.log(user)
        if(user){
            const isMatch = await bcrypt.compare(password,user.password)
            
            if(!isMatch){
                return res.status(400).send("Password Invalid")
            }
            //payload
            var payload ={
                user:{
                    name:user.name
                }
            }
          //Genetare
          jwt.sign(payload,"jwtsecret",{expiresIn:40},(err,token)=>{
            if(err) throw err;
            res.json({token,payload})
          })
        }else{
           return res.status(400).send("User not found")
        }
        
        

        //Payload
        //Generate
        //res.send("Hello login Controller")
    }catch(err){
        console.log(err)
        res.status(500).send("Sever error")
    }
}