const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    userid:String

},{
    versionKey:false
})

const postModel=mongoose.model("posts",userSchema)

module.exports=postModel