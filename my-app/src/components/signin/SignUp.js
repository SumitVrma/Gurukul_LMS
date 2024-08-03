import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import './SignUp.css';
import axios from 'axios';

export function SignUp() {
    // const [name, setName] = useState();
    // const [email, setEmail] = useState();
    // const [password, setPassword] = useState();
    const navigate = useNavigate()
    const [addSection, setAddSection] = useState(false)
    const [editSection, setEditSection] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [formDataEdit, setFormDataEdit] = useState({
        name: "",
        email: "",
        password: "",
        _id: ""
    })
    const [dataList, setDataList] = useState([])

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log('Form submitted:', { name, email, password });
    //     axios.post('http://localhost:3001/register', { name, email, password })
    //         .then(result => {
    //             console.log(result)

    //             navigate('/login')
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
        const data = await axios.post("/create", formData)
        console.log(data);
        console.log(formData)
        if (data.data.success) {
            setAddSection(false)
            alert(data.data.message)
            getFetchData()
            // setFormData({
            //     name: "",
            //     email: "",
            //     password: ""
            // })
            navigate('/login')
        }
    }

    return (

        <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8 bg-black">

            <div className="bg-[rgba(164,163,163,0.2)] p-5 rounded-2xl max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign Up</h2>
                </div>
                <form className="mt-8 space-y-6" 
                onSubmit={handleSubmit}
                onChange={handleonChange}
                // handleClose={() => setAddSection(false)}
                // rest={formData}
                >
                    {/* <input type="hidden" name="remember" defaultValue="true" /> */}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" >
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="mt-1 mb-6 border-b-2 bg-transparent appearance-none rounded-none relative block w-full px-3 py-2 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Name"
                                // value="name"
                                // onChange={(e) => setName(e.target.value)}
                                 onChange={handleonChange}
                            />
                        </div>
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
                                className="bg-transparent mt-1 mb-6 border-b-2  appearance-none rounded-none relative block w-full px-3 py-2   text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                // value="email"
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
                                className=" mt-1 mb-6 bg-transparent border-b-2  appearance-none rounded-none relative block w-full px-3 py-2  text-white  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                // value="password"
                                onChange={handleonChange}
                            />
                        </div>
                    </div>

                    <div>

                        <button
                            // type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}