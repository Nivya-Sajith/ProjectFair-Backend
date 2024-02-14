const jwt =require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    console.log("Inside jwt middleware");
    //token verification
    //get the token from req header

    const token=req.headers['authorization'].slice(7)
    console.log(token);
    //verify the token

    try{
        const tokenVerification=jwt.verify(token,"superkey24")
        console.log(tokenVerification);
        req.payload=tokenVerification.userid;
        
        next()

    }
    catch(err){
        res.status(401).json("Authorization failed! Please login again!")
    }

   
}

module.exports=jwtMiddleware
