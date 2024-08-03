import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

const SignIn = ({ onSignIn }) => {
    // const [name, setName] = useState();
    // const [email, setEmail] = useState();
    // const [password, setPassword] = useState();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [dataList, setDataList] = useState([])


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('Form submitted:', { email, password });
    //     axios.post('http://localhost:3001/login', { email, password })
    //         .then(result => {
    //             console.log(result)
    //             if(result.data === "Login Success"){
    //                 alert("Successfully Logged In");
    //                 onSignIn();
    //                 navigate('/')
    //             }
    //         })
    //         .catch(err => console.log(err))
    // }
    const getFetchData = async () => {
        const data = await axios.get("/")
        console.log(data)
        if (data.data.success) {
            setDataList(data.data.data)
            // getFetchData()
            // alert(data.data.message)
        }
    }
    const handleonChange = (e) => {
        const { value, name } = e.target
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
        console.log(formData)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('/', formData);

            console.log("formdata", formData)
            console.log("response", response.data.data)
            const user = response.data.data.find((user) => user.email === formData.email && user.password === formData.password);
            if (user) {
                alert("Successfully Logged In");
                onSignIn();
                navigate('/');
            } else {
                // Handle login failure, show error message, etc.
                console.log(response.data);
                alert("Login failed. Please check your credentials.");
            }
        } catch (error) {
            // Handle the error, e.g., show an error message
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again.");
        }
    };


    return (
        <div className=" min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-[rgba(164,163,163,0.2)] p-5 rounded-2xl max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign In</h2>
                </div>
                <form className="mt-8 space-y-6"
                    onSubmit={handleSubmit}>
                    {/* <input type="hidden" name="remember" defaultValue="true" /> */}
                    <div className="rounded-md shadow-sm -space-y-px">
                        {/* <div>
                            <label htmlFor="name" >
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div> */}
                        <div>
                            <label htmlFor="email">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className=" mt-1 mb-6 bg-transparent border-b-2 appearance-none rounded-none relative block w-full px-3 py-2  text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                // value="email"
                                // onChange={(e) => setEmail(e.target.value)}
                                onChange={handleonChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className=" mt-1 mb-6 bg-transparent border-b-2 appearance-none rounded-none relative block w-full px-3 py-2 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                // value="password"
                                // onChange={(e) => setPassword(e.target.value)}
                                onChange={handleonChange}
                            />
                        </div>
                    </div>

                    <div>

                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn
