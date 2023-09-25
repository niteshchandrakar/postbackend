const jwt=require("jsonwebtoken")

const auth=async(req,res,next)=>{
    try{
        let token=req.headers.authorization
       
        if(token){
            jwt.verify(token, 'masai', async(err, decoded)=> {
               if(decoded){
                req.body.userid=decoded.userid
                
                next()
               }else{
                res.status(400).send({msg:"Not authorized"})
               }
              });

            
        }else{
            res.status(400).send({msg:"Not authorized"})
        }
    }catch(error){
        res.status(400).send({msg:error})
    }
   
   
}

module.exports=auth