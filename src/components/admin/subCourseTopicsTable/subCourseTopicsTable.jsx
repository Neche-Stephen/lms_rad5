import React, {useEffect, useState, Fragment} from 'react';
import { Link } from 'react-router-dom';
import {ref, getDownloadURL } from 'firebase/storage'; 
import { useSelector} from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import { BiShow } from 'react-icons/bi';
import { AiFillDelete} from 'react-icons/ai';
import { Tooltip } from 'react-tooltip';
import { Table} from 'react-bootstrap';

import { selectCourseName } from '../../../store/courses/courses.selector';
import {firestore, storage} from '../../../utils/firebase.utils';

import './subCourseTopicsTable.css';
import RAD5_LOGO from '../../../assets/images/rad5.png'
// import { removeCourse } from '../../../utils/courses/removeCourse';
// import { removeSubCourse } from '../../../utils/courses/subcourses/removeSubCourse';
import { removeTopic } from '../../../utils/courses/topics/removeTopic';

export default function SubCourseTopicsTable({ coursetopics }) {
  const courseName = useSelector(selectCourseName)
  return (
    <Fragment>

    <Table responsive="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Topic Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
            coursetopics.length > 0 &&
            coursetopics.map((topic, index) =>{
              return (
                <tr key = {index}>
                  <td>{index + 1}</td>
                  <td>{topic.topicName}</td>
                  <td>
                    <div className = 'row justify-content-around'>
                      <Link
                        to ={`/admin/courses/view_subcourseTopic/${topic.topicName}`}
                        className='btn btn-primary w-25'
                        data-tooltip-id="course_card_tip" 
                        data-tooltip-content="View Course"
                        >
                      <Tooltip id="course_card_tip" />
                      <BiShow /> 
                      </Link>
                      <button type='button' className='btn btn-secondary w-25'
                      data-tooltip-id="course_card_tip" 
                      data-tooltip-content="Edit Course">
                        <FaEdit /> 
                      </button>
                      <button type='button' className='btn btn-danger w-25' onClick={()=> removeTopic(courseName, topic.topicName)}
                      data-tooltip-id="course_card_tip" 
                      data-tooltip-content="Delete Course"
                      >
                        <AiFillDelete />
                      </button>
                      </div>
                  </td>
                </tr>
              )
            })
          }
      

      </tbody>
    </Table>
    </Fragment>
       
  )
}

// src>assets>