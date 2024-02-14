// load .env  into process.env
// config() loads .env file contents into process.env by default.
require('dotenv').config()

// import express
const express=require('express')

// import cors

const cors=require('cors');
const router= require('./Router/route')
const db=require('./DB/connection')
const appMiddleware=require('./Middlewares/appMiddleware')
const jwtMiddleware=require('./Middlewares/jwtMiddleware')
// create a backend app using express

const pfserver=express();

// use 
pfserver.use(cors())
pfserver.use(express.json()) //return middleware that only parse json
pfserver.use(appMiddleware)
// pfserver.use(jwtMiddleware)
pfserver.use(router)
pfserver.use('/uploads',express.static('./uploads')) //to export image from server to client
// port creation

const port=4000 || process.env.port

// server listen

pfserver.listen(port,()=>{
    console.log('listening on port',port);

})

// http -get resolving to http://localhost4000

pfserver.get("/",(req,res)=>{
    res.send('<h1>Project fair is started...</h1>')
})
