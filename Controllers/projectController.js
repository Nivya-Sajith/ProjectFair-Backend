const projects=require('../Models/projectSchema')


// add project logic

 exports.addUserProject=async(req,res)=>{
    console.log("inside AddUserProject");
// res.status(200).json("add user project request")
    // get userid

    const userid=req.payload
    // console.log(userid);
    // get Add projectdetails
    const {title,language,github,link,overview}=req.body
    // get the image
projectimage=req.file.filename
console.log(projectimage);

    // logic of adding new user project

    try{
        const existingProject=await projects.findOne({github});
        if(existingProject)
        {
            res.status(406).json("Project already exist")
        }
        else{
            console.log("user id from Authentication Middleware:",userid);
            const newProject=new projects({title,language,github,link,overview,projectimage,userid:userid});
            await newProject.save() //saving new project into mongoose
            res.status(200).json(newProject) //send response to the client
        }
    }
    catch(err)
    {
        console.log("error;",err);
        res.status(404).json({message:err.message})
    }

}

// 1.get user project

exports.getUserProject=async(req,res)=>{
    // get user id
    const userid=req.payload

    // api request
    try{
const userProject=await projects.find({userid})
console.log(userProject);
res.status(200).json(userProject)
    }
    catch(err)
    {
        res.status(401).json(err.message)

    }
}


// 2.get all project

exports.getAllProjects=async(req,res)=>{
    const searchkey=req.query.search
    const query={
        language:{
            $regex:searchkey,
            $options:"i"
        }
    }
    try{
const AllProjects=await projects.find(query)
res.status(200).json(AllProjects) //send response to the client
    }
    catch(err)
    {res.status(401).json(err.message)

    }
}


// 3.get any three projects  in the home page

exports.getHomeProject=async(req,res)=>{
    try{
        const HomeProject=await projects.find().limit(3)
        res.status(200).json(HomeProject) //send response to the client

    }
    catch(err)
    {
        res.status(401).json(err.message)
    }
}

// 4.Edit project details

exports.editProject=async(req,res)=>{
    console.log("Inside update part");
    const {title,language,github,link,overview,projectimage}=req.body;
     const uploadImage=req.file?req.file.filename:projectimage;
     const userid=req.payload
     const {id}=req.params
     try{
const updateProject=await projects.findByIdAndUpdate({_id:id},{title,language,github,link,overview,projectimage:uploadImage,userid},{new:true})

// save the updated project details

await updateProject.save();
// response send back to the client

res.status(200).json(updateProject)
     }
     catch(err)
     {
        res.status(401).json(err)
     }
}


//4. Delete a project

exports.deleteProject=async(req,res)=>{
    console.log("inside delete part");
    const {id}=req.params
    try{
const deletePjt=await projects.findByIdAndDelete({_id:id})
res.status(200).json(deletePjt)
    }catch(err)
    {
res.status(401).json(err)
    }

}