const users=require('../Models/userSchema')
const jwt=require('jsonwebtoken')
// register logic
exports.register=async(req,res)=>{
    console.log("inside register function");
const {username,email,password}=req.body
try
{
    const existinguser=await users.findOne({email})
if(existinguser)
{
    res.status(401).json("User already registered")
}
else
{
    const newuser=await users({
        username,email,password,github:"",link:"",profile:""
    })
await newuser.save() 
res.status(200).json("User registration successfull")
}
}
catch(err)
{
    res.status(500).json("Server error :",err.message)

    
}

console.log(`${username} ${email} ${password}`);

}



// Login logic

exports.login=async(req,res)=>{
    console.log("inside login function");
    const {email,password}=req.body

    try{
const  loginUser=await users.findOne({email,password})
if(!loginUser)
{
    res.status(404).json("user not exist")
}
else{
//   token generation
const token=jwt.sign({userid:loginUser._id},"superkey24")
    res.status(200).json({loginUser,token})

  }
 
}
    
    catch(err)
    {
        res.status(500).json("Server error",err.message)

    }

}