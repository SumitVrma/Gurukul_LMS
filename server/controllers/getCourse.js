import CourseSchema from "../models/CourseSchema.js";
const getCourseData = async(req,res) => {
    try{
        const courses=await CourseSchema.find();
        res.status(200).json({courses});
    }catch(err){
        console.log(err);
    }
}
export default getCourseData;