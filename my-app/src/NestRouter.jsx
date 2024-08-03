import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    // BrowserRouter,
  } from "react-router-dom";
// import Home from './Home';
// import Dashboard from './Components/Dashboard/Dashboard';
// import MainPage from './Components/Dashboard/MainPage';
// import AddCourse from './Components/Dashboard/AddCourse';
// import { Navbar } from './Components';
import Dashboard from 'components/Dashboard/Dashboard';
import AddCourse from 'components/Dashboard/AddCourse';
import CourseTable from 'components/Dashboard/CourseTable';
import CourseDetail from 'components/Dashboard/CourseDetail';
import Pages from 'components/CoursesProduct/Pages';
import MainPage from 'components/Dashboard/MainPage';
import MainCourse from 'components/CoursesProduct/MainCourse';
import { NavBar } from 'components';
// import CourseTable from './Components/Dashboard/CourseTable';
// import CourseDetail from './Components/Dashboard/CourseDetail';

export const NestRouter = () => {
  return (
    <div>
      
        <NavBar/>
        <Routes>
          {/* <Route path="home" element={<Home />} /> */}
          <Route path="/courses" element={<MainCourse />} />
          <Route path="/dashboard/*" element={<Dashboard />}>
            {/* <Route index element={<MainPage />} /> */}
            <Route path="add" element={<AddCourse />} />
            {/* <Route path='coursetable' element={<CourseTable/>}/>
            <Route path='update/:id' element={<CourseDetail/>}/> */}
          </Route>
          <Route path='watch/:id' element={<Pages/>}/>
        </Routes>
     
    </div>
  )
}
