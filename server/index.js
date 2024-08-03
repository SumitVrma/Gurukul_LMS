// const express = require("express")
// const mongoose = require("mongoose")
// const cors = require("cors")
// const EmployeeModel = require('./models/Employee')

// const app = express()
// app.use(express.json())
// app.use(cors())

// // mongoose.connect("mongodb://127.0.0.1:27017/employee")
// mongoose.connect("mongodb+srv://hemumani73:sIcAvRZCliyMj7Yi@cluster0.4wd1kim.mongodb.net/employee")
// // ,{
// //     useNewUrlParser : true,
// //     useUnifiedTopology : true.

// // })
// // .then(()=>{console.log("Connection success")})
// // .catch((error)=>{console.log("Connection failed")})

// app.post('/register',(req,res)=>{
//     console.log('Received data:',req.body)
//     EmployeeModel.create(req.body)
//     .then(employees => res.json(employees))
//     .catch(err=>res.json(err))
// })
// app.post('/login',(req,res)=>{
//     const {email, password} = req.body;
//     EmployeeModel.findOne({email:email})
//     .then(user => {
//         if(user){
//             if(user.password === password){
//                 res.json("Login Success")
//             }
//             else{
//                 res.json('Password is incorrect!')
//             }
//         }
//         else{
//             res.json('No record existed!')
//         }
//     })
// })

// app.listen(3001,()=>{
//     console.log("server is running")
// })

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const bodyParser = require("body-parser");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const clientRoutes = require("./routes/client.js");
// const generalRoutes = require("./routes/general.js");
// const managementRoutes = require("./routes/management.js");
// const salesRoutes = require("./routes/sales.js");

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import getCourseData from "./controllers/getCourse.js";
import createCourses from "./controllers/createCourse.js";
import courseRoute from "./controllers/getCourseId.js";


//data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
    dataUser,
    dataProduct,
    dataProductStat,
    dataTransaction,
    dataOverallStat,
    dataAffiliateStat,
} from "./data/index.js";
// const User = require("./models/User.js");
// const {dataUser} = require("./data/index.js");

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

// ROUTES
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

//mongodb atlas password
// const pass = 'sIcAvRZCliyMj7Yi'

//Schema
const schemaData = mongoose.Schema({
    name: String,
    email: String,
    password: String,
}, {
    timestamps: true
})

const userModel = mongoose.model("employees", schemaData);
// const userModel1 = mongoose.model("users", schemaData);

const PORT = process.env.PORT || 9000;

//courses
app.post("/createcourse", createCourses)
// app.get("/courses", getCourseData.getCourseData);
app.get("/courses", getCourseData);
// app.get('/getcourse/:id',courseDataId.courseData)
app.use('/api', courseRoute)

//read
// "http://localhost:8080/"
app.get("/", async (req, res) => {
    const data = await userModel.find({})
    res.json({ success: true, data: data })
})

//create data || save data in mongodb
// "http://localhost:8080/create"
// {
//     name, 
//     email, 
//     password
// }
app.post("/create", async (req, res) => {
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({ success: true, message: "data save successfully", data: data })
})

//update data
// "http://localhost:8080/update"
// {
//     id:"",
//     name:"", 
//     email:"", 
//     password:""
// }
app.put("/update", async (req, res) => {
    console.log(req.body)
    const { _id, ...rest } = req.body
    console.log(rest)
    // const updateUser = await userModel.findByIdAndUpdate(id, rest)
    const data = await userModel.updateOne({ _id: _id }, rest)
    res.send({ success: true, message: "data updated sccessfully", data: data })
})

//delete api
// "http://localhost:8080/delete/id"
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const data = await userModel.deleteOne({ _id: id });
    res.send({ success: true, message: "data deleted sccessfully", data: data })
})


// mongoose.connect("mongodb+srv://hemumani73:sIcAvRZCliyMj7Yi@cluster0.4wd1kim.mongodb.net/employee")
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

    .then(() => {
        console.log("Connected to DB")
        app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));

        // ONLY ADD DATA ONE TIME
        // AffiliateStat.insertMany(dataAffiliateStat);
        // OverallStat.insertMany(dataOverallStat);
        // Product.insertMany(dataProduct);
        // ProductStat.insertMany(dataProductStat);
        // Transaction.insertMany(dataTransaction);
        // User.insertMany(dataUser);
    }).catch((err) => console.log(`${err} did not connect`))
