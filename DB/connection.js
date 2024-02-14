// import mongoose

const mongoose=require('mongoose')
const connectionstring=process.env.DATABASE

mongoose.connect(connectionstring).then(()=>{
    console.log('MongoDB connection established...');
})
.catch((error)=>{
    console.log("MongoDB connection error",error);
})