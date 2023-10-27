import React from 'react';
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';

// import Dashboard from './Routes/Dashboard/Dashboard';
import Login from './Routes/Login/Login';

import Analytics from './Routes/admin/Analytics/Analytics';
import Courses from './Routes/admin/Courses/Courses';
//Courses Children
import AddCourse from './Routes/admin/Courses/addCourse/AddCourse';
import CourseView from './Routes/admin/Courses/viewCourse/CourseView';
import SubCourseView from './Routes/admin/Courses/viewCourse/viewSubCourse/ViewSubCourse';
import ViewTopic from './Routes/admin/Courses/viewTopic/viewTopic';
import ViewSubCourseTopic from './Routes/admin/Courses/viewSubCourseTopic/viewSubCourseTopic';

export default function App() {
  return (
    <>
      <PersistGate loading = {null} persistor={persistor}>
      <BrowserRouter>
          <Routes>
            <Route path='/' element = {<Login />}/>
            <Route path='/admin/analytics' element = {<Analytics />}/>
            {/* Courses Route */}
            <Route path='/admin/courses/' element = {<Courses />} />
            <Route path = '/admin/courses/add_course' element = {<AddCourse />} />
            <Route path = '/admin/courses/view_course/:courseName' element = {<CourseView />} />
            <Route path = '/admin/courses/view_subcourse/:subCourseName' element = {<SubCourseView />} />
            <Route path = '/admin/courses/view_topic/:topicName' element = {<ViewTopic />} />
            <Route path = '/admin/courses/view_subcourseTopic/:topicName' element = {<ViewSubCourseTopic />} />


            {/* <Route path = '/admin/courses/:id' element = {<AddCourse />} /> */}
          </Routes>
      </BrowserRouter>
      </PersistGate>
    </>
  )
}

