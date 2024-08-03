import './App.css';
import { useState, useEffect, useMemo } from 'react';
import CursorAnimation from './components/cursor_animation/CursorAnimation'
import Courses from './components/courses/Courses';
import Companies from './components/companies/Companies';
import Hero from './components/herosection/Hero';
import Brain from './components/brain/Brain';
import Achievement from './components/achievements/Achievement'
import Categories from './components/categories/Categories';
import Feedback from './components/feedback/Feedback';
import CTA from './components/CallToAction/CTA';
import Footer from './components/footer/Footer';
// import { useElementSize, useMouse } from '@mantine/hooks';
import { useMouse } from 'react-use';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Support from './components/support/Support';
import JoinForm from './components/support/Support';
import { method } from 'lodash';
import { selectIsConnectedToRoom, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import Room from './components/support/Room';
import { SignUp } from './components/signin/SignUp';
import SignIn from './components/signin/SignIn';
import Contact from './components/contact/Contact';
import AllUsers from './components/AllUsers/AllUsers';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import Layout from 'components/scenes/layout';
import AdminDashboard from 'components/scenes/dashboard';
import Products from 'components/scenes/products';
import Customers from 'components/scenes/customers';
import Transactions from 'components/scenes/transactions';
import Geography from 'components/scenes/geography.js';
import Overview from 'components/scenes/overview';
import Daily from 'components/scenes/daily';
import Monthly from 'components/scenes/monthly';
import Breakdown from 'components/scenes/breakdown';
import Admin from 'components/scenes/admin';
import Performance from 'components/scenes/performance';
import MainCourse from 'components/CoursesProduct/MainCourse';
import Pages from 'components/CoursesProduct/Pages';
import { NestRouter } from './NestRouter';
import { NavBar } from 'components';


const endPoint = "https://prod-in2.100ms.live/hmsapi/hemanth-videoconf-003.app.100ms.live/";

const getToken = async (user_id) => {
  const response = await fetch(`${endPoint}api/token`,
    {
      method: "POST",
      body: JSON.stringify({
        user_id,
        role: "host",
        type: "app",
        room_id: "6560ecec3bc2e1189563106f"
      })
    });
  const { token } = await response.json();
  return token;
};




function App() {

  // const [scaling, setscaling] = useState(false);
  // const [color, setColor] = useState('white');
  const hmsActions = useHMSActions();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const handleSubmit = async (userName) => {
    const token = await getToken(userName);
    hmsActions.join({ authToken: token, userName });
  };

  const [isLoggedIn, setLoggedIn] = useState(false);
  const handleSignIn = () => {
    setLoggedIn(true);
  };

  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App"
    >
      {/* <CursorAnimation scaling={scaling} color={color} /> */}
      {/* <CursorAnimation scaling={scaling} color={color} /> */}
      {/* <CursorAnimation/> */}

      {/* <button
          onMouseEnter={() => setscaling(true)}
          onMouseLeave={() => setscaling(false)}>
          read more
        </button> */}

      <Router>
          {/* <NavBar/> */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/register' element={<SignUp />} />
            <Route path='/login' element={<SignIn onSignIn={handleSignIn} />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/allusers' element={<AllUsers />} />
            {/* <Route path="/courses" element={<MainCourse />} />
            <Route path='/watch/:id' element={<Pages/>}/> */}
            <Route path="/user/*" element={<NestRouter />} />
            <Route path="/" element={isLoggedIn ? <Home /> : <SignUp />} />
            {/* <Route path="/support" element={<Support />} /> */}
            <Route path="/support" element={isConnected ? <Room /> : <Support handleSubmit={handleSubmit} />} />
            <Route path='/layout' element={<Layout />}>
              {/* <Route path="/" element={<Navigate to="/admindashboard" replace />}/> 
              <Route path="/admindashboard" element={<AdminDashboard />} />  */}
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="customers" element={<Customers />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="geography" element={<Geography />} />
              <Route path="overview" element={<Overview />} />
              <Route path="daily" element={<Daily />} />
              <Route path="monthly" element={<Monthly />} />
              <Route path="breakdown" element={<Breakdown />} />
              <Route path="admin" element={<Admin />} />
              <Route path="performance" element={<Performance />} />
            </Route>
          </Routes>
          <Footer />
        </ThemeProvider>
      </Router>
    </div>
    // docs.100ms.live/v2/web-frameworks/Getting-started-react
  );
}

export default App;
