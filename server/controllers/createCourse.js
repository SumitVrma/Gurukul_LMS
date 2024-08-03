import CourseSchema from "../models/CourseSchema.js";
const createCourse = async(req,res)=>{
    const courseData = req.body;
    try{
        const newCourse = await CourseSchema.create(courseData)
        .then(()=>{
            res.status(200).json({message:"COURSE CREATED"})
        })
    }catch(err){
        console.log(err)
    }
}

export default createCourse;