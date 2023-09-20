import React from 'react';
import PYTHON_IMG from '../../../assets/images/python.png'
//utils
import { removeCourse } from '../../../utils/courses/removeCourse';

export default function CoursesCard({courseData}) {
  return (
    <>
        <div className='row justify-content-center'>
            <div className='col-auto'>
                <img src={PYTHON_IMG} alt="" className='img-fluid'/>
            </div>
        </div>
        <div className='row justify-content-center'>
            <div className='col-auto'>
                <p className='course_title'>{courseData.courseName} </p>
            </div>
        </div>
        <div className='row justify-content-center'>
            <div className='col-auto'>
                <div className='row'>
                   <p className='col-auto'>View Course</p>
                   <p className='col-auto'>Edit Course</p>
                   <p className='col-auto' onClick={()=> removeCourse(courseData.courseName)}>Delete Course</p>
                </div>
            </div>
        </div>

    </>
       
  )
}

// src>assets>