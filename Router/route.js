// import express

const express=require('express')

// create a router object of express to define routes(path)
const multerConfig=require('../Middlewares/multerMiddleware')
const router=new express.Router()
const userController=require('../Controllers/userController')
const projectController=require('../Controllers/projectController')
const jwtMiddleware=require('../Middlewares/jwtMiddleware')
// using router ogj to define path

// 1. Redistr api routes - localhost:4000/register

router.post('/register',userController.register)

// 2. Redistr api routes - localhost:4000/login

router.post('/login',userController.login)

// 3. add user project api routes :localhost:4000/project/add
router.post('/project/add',jwtMiddleware,multerConfig.single('projectimage'),projectController.addUserProject)

// 4 get user project api routes- localhost:4000/projects/all-user-projects


router.get('/project/all-user-projects',jwtMiddleware,projectController.getUserProject)

// 5 get all projects 
router.get('/project/all-projects',jwtMiddleware,projectController.getAllProjects)

// 6. get any three projects at home page
router.get('/project/home-projects',projectController.getHomeProject)
//  7. update project
router.put('/project/update-project/:id',jwtMiddleware,multerConfig.single('projectimage'),projectController.editProject)

//8. delete project
router.delete('/project/delete-project/:id',jwtMiddleware,projectController.deleteProject)
module.exports=router