import React from 'react';
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';

import Login from './Routes/Login/Login';
import Register from './Routes/register/Register';
import CreateAccountStudent from './Routes/createAccountStudent/CreateAccountStudent';

//change for dev

// Admin Routes
import Analytics from './Routes/admin/Analytics/Analytics';
import Courses from './Routes/admin/Courses/Courses';
  //Courses Children
import AddCourse from './Routes/admin/Courses/addCourse/AddCourse';
import CourseView from './Routes/admin/Courses/viewCourse/CourseView';
import SubCourseView from './Routes/admin/Courses/viewCourse/viewSubCourse/ViewSubCourse';
import ViewTopic from './Routes/admin/Courses/viewTopic/viewTopic';
import ViewSubCourseTopic from './Routes/admin/Courses/viewSubCourseTopic/viewSubCourseTopic';
import Students from './Routes/admin/students/Students';
import CourseStudents from './Routes/admin/students/courseStudents/CourseStudents';

import Cohorts from './Routes/admin/Cohorts/Cohorts';
import Cohort from './Routes/admin/Cohorts/cohort/cohort';

//Students Routes
import Dashboard from './Routes/student/Dashboard/Dashboard';
import StudentCourse from './Routes/student/Courses/Courses';



export default function App() {
  return (
    <>
      <PersistGate loading = {null} persistor={persistor}>
      <BrowserRouter>
          <Routes>
            <Route path='/' element = {<Login />}/>

            {/* Admins Route */}
            <Route path='/admin/analytics' element = {<Analytics />}/>

            {/* Admin Courses Route */}
            <Route path='/admin/courses/' element = {<Courses />} />
            <Route path = '/admin/courses/add_course' element = {<AddCourse />} />
            <Route path = '/admin/courses/view_course/:courseName' element = {<CourseView />} />
            <Route path = '/admin/courses/view_subcourse/:subCourseName' element = {<SubCourseView />} />
            <Route path = '/admin/courses/view_topic/:topicName' element = {<ViewTopic />} />
            <Route path = '/admin/courses/view_subcourseTopic/:topicName' element = {<ViewSubCourseTopic />} />

            {/* Admin Students Route */}
            <Route path='/admin/students/' element = {<Students />} />
            <Route path='/admin/students/:course_students' element = {<CourseStudents />} />

            {/* Admin Courses Route */}
            <Route path='/admin/cohorts/' element = {<Cohorts />} />
            <Route path='/admin/cohorts/:cohort' element = {<Cohort />} />

            {/* Students Dashboard Route */}
            <Route path='/student/dashboard/' element = {<Dashboard />} /> 
            <Route path='/student/courses/' element = {<StudentCourse />} />



            {/* Create Account on LMS Route - Students */}
            <Route path='/student-signup/' element = {<CreateAccountStudent />} />

            {/* Register for course and cohort on LMS Route - Students */}
            <Route path='/register/' element = {<Register />} />


            {/* <Route path = '/admin/courses/:id' element = {<AddCourse />} /> */}
          </Routes>
      </BrowserRouter>
      </PersistGate>
    </>
  )
}

