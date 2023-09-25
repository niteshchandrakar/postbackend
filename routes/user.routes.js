const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userRouter=express.Router()
const userModel=require("../model/user.model")
userRouter.get("/",(req,res)=>{
    res.status(200).send({msg:"users all"})
})

userRouter.post("/register",async(req,res)=>{
    try{
const {name,email,gender,password}=req.body

bcrypt.hash(password, 5, async(err, hash)=> {
    // Store hash in your password DB.
    const newuser=await new userModel({name,email,gender,password:hash})
    newuser.save()
    res.status(200).send({msg:"user registration succesfull"})
});


    }catch(error){
        res.status(400).send({msg:error})
    }
})




userRouter.post("/login",async(req,res)=>{
    try{
const {email,password}=req.body
const user=await userModel.findOne({email:email})

if(user){
    bcrypt.compare(password, user.password, async(err, result)=> {
        if(result){
            const token = jwt.sign({ userid:user._id }, 'masai',{ expiresIn: "1h" });
            res.status(200).send({msg:"Login success","token":token})
        }else{
            res.status(400).send({msg:"Wrong Password"})
        }
        // result == true
    });
}else{
    res.status(400).send({msg:"User Not Found"})
}
    }catch(error){
        res.status(400).send({msg:error})
    }
})


module.exports=userRouter