import React from 'react';
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';

// import Dashboard from './Routes/Dashboard/Dashboard';
import Login from './Routes/Login/Login';

import Analytics from './Routes/admin/Analytics/Analytics';
import Courses from './Routes/admin/Courses/Courses';
import AddCourse from './Routes/admin/Courses/addCourse/AddCourse';

export default function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element = {<Login />}/>
            <Route path='/admin/analytics' element = {<Analytics />}/>
            <Route path='/admin/courses' element = {<Courses />} />
            <Route path = '/admin/courses/add_course' element = {<AddCourse />} />

          </Routes>
      </BrowserRouter>
    </>
  )
}

