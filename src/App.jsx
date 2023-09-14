import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// import Dashboard from './Routes/Dashboard/Dashboard';
import Login from './Routes/Login/Login';

import Courses from './Routes/admin/Courses/Courses';

export default function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element = {<Login />}/>
            {/* <Route path='/dashboard' element = {<Dashboard />}/> */}
            <Route path='/admin/courses' element = {<Courses />}/>

          </Routes>
      </BrowserRouter>
    </>
  )
}

