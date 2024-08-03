import mongoose from "mongoose";

export default mongoose.model("courses", mongoose.Schema({
    course: {
        type: String,
        required: true,
     
    },
    teacher:{
        type:String,
    },
    rating: {
        type: Number
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    videoUrl1: {
        type: String,
        required: true
    },
    videoUrl2: {
        type: String,
        required: true
    },
    videoUrl3: {
        type: String,
        required: true
    },
    videoUrl4: {
        type: String,
        required: true
    },
}))