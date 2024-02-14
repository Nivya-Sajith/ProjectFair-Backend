// import mongoose

const mongoose=require('mongoose')

// create schema

const projectScheme=new mongoose.Schema({
    title:{type:String, required:true},
    language:{type:String,required:true},
    github:{type:String,required:true},
    link:{type:String,required:true},
    overview:{type:String,required:true},
    projectimage:{type:String,required:true},
    userid:{type:String,required:true}
})
const projects=mongoose.model("projects",projectScheme)
module.exports=projects;