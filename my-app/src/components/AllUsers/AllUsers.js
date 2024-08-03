// import logo from './logo.svg';
import './AllUsers.css';
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './Form';

axios.defaults.baseURL = "http://localhost:8080/"

function AllUsers() {

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

  const handleonChange = (e) => {
    const { value, name } = e.target
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
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
      setFormData({
        name:"",
        email:"",
        password:""
      })
    }
  }


  const getFetchData = async () => {
    const data = await axios.get("/")
    console.log(data)
    if (data.data.success) {
      setDataList(data.data.data)
      // getFetchData()
      // alert(data.data.message)
    }
  }

  useEffect(() => {
    getFetchData()
  }, [])

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id)
    if (data.data.success) {
      getFetchData()
      alert(data.data.message)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const data = await axios.put("/update", formDataEdit)
    if (data.data.success) {
      getFetchData()
      alert(data.data.message)
      setEditSection(false)
    }
  }
  const handleEditonChange = async (e) => {
    const { value, name } = e.target
    setFormDataEdit((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })

  }
  const handleEdit = (el) => {
    setFormDataEdit(el)
    setEditSection(true)
    console.log(formDataEdit)
  }

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>ADD</button>

        {
          addSection && (
            <Form
              handleSubmit={handleSubmit}
              handleonChange={handleonChange}
              handleClose={() => setAddSection(false)}
              rest={formData}
            />
          )
        }
        {
          editSection && (
            <Form
              handleSubmit={handleUpdate}
              handleonChange={handleEditonChange}
              handleClose={() => setEditSection(false)}
              rest={formDataEdit}
            />
          )
        }
        <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>

                </th>
              </tr>
            </thead>
            <tbody>
              {
                dataList[0] ? (

                  dataList.map((el) => {
                    // console.log(el)
                    return (
                      <tr>
                        <td>{el.name}</td>
                        <td>{el.email}</td>
                        <td>{el.password}</td>
                        <td>
                          <button className='btn btn-edit' onClick={() => handleEdit(el)}>Edit</button>
                          <button className='btn btn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                        </td>
                      </tr>
                    )
                  })
                ) :

                  (
                    <h1 style={{ textAlign: "center" }}>No Data</h1>
                  )
              }
            </tbody>

          </table>
        </div>

      </div>
    </>
  );
}

export default AllUsers;
