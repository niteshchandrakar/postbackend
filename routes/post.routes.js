const express=require("express")
const auth=require('../middleware/auth.middleware')
const postModel=require("../model/post.model")
const postRouter=express.Router()
postRouter.use(auth)
postRouter.get("/",async(req,res)=>{
    try{
        const {device1}=req.query
        const {device2}=req.query
        console.log(device1,device2)

const {userid}=req.body


if(device1 && device2){
    const post= await postModel.find({userid:userid,device:device1,device:device2})
res.status(200).send({posts:post})
}else if(device1){
    const post= await postModel.find({userid:userid,device:device1})
    res.status(200).send({posts:post})
}else if(device2){
    const post= await postModel.find({userid:userid,device:device2})
    res.status(200).send({posts:post})
}else{
    const post= await postModel.find({userid:userid})
    res.status(200).send({posts:post})
}
    }catch(error){
        res.status(400).send({msg:error})
    }
})
postRouter.post("/add",async(req,res)=>{
    try{
const {title,body,device,userid}=req.body

const post= await new postModel({title,body,device,userid})
post.save()
res.status(200).send({msg:"Post added"})


    }catch(error){
        res.status(400).send({msg:error})
    }
})
postRouter.patch("/update/:postid",async(req,res)=>{
const {postid}=req.params
    try{
        const post=await postModel.findOne({_id:postid})
       const payload=req.body
        if(post.userid==req.body.userid){
        await postModel.findByIdAndUpdate({_id:postid},payload)
        res.status(200).send({msg:"Post Updated"})
        }else{
            res.status(400).send({msg:"Not Authorized user"})
        }

    }catch(error){
        res.status(400).send({msg:error})
    }
})
postRouter.delete("/delete/:postid",async(req,res)=>{
const {postid}=req.params
    try{
        const post=await postModel.findOne({_id:postid})
       
        if(post.userid==req.body.userid){
        await postModel.findByIdAndDelete({_id:postid})
        res.status(200).send({msg:"Post Deleted"})
        }else{
            res.status(400).send({msg:"Not Authorized user"})
        }

    }catch(error){
        res.status(400).send({msg:error})
    }
})


module.exports=postRouter