const express=require("express")
const userRouter=require("./routes/user.routes")
const postRouter=require("./routes/post.routes")
require("dotenv").config()
const cors=require("cors")
const connection=require("./db")
const app=express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).send({msg:"Homepage"})
})
app.use("/users",userRouter)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
try{
await connection
console.log("connected to db")
}catch(error){
    console.log(error)
}
})
