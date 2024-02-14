// import mongoose

const mongoose=require('mongoose')
// schema creation
const userSchema= new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    github:{type:String},
    link:{type:String },
    profile:{type:String }
})


// create model
const users=mongoose.model("users",userSchema)

// export
module.exports=users

