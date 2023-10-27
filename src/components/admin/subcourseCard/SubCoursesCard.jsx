import React, {useEffect, useState, Fragment} from 'react';
import { Link } from 'react-router-dom';
import {ref, getDownloadURL } from 'firebase/storage'; 
import { useSelector} from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import { BiShow } from 'react-icons/bi';
import { AiFillDelete} from 'react-icons/ai';
import { Tooltip } from 'react-tooltip';

import { selectCourseName } from '../../../store/courses/courses.selector';
import {firestore, storage} from '../../../utils/firebase.utils';

import './SubCourseCard.css';
import RAD5_LOGO from '../../../assets/images/rad5.png'
// import { removeCourse } from '../../../utils/courses/removeCourse';
import { removeSubCourse } from '../../../utils/courses/subcourses/removeSubCourse';

export default function SubCoursesCard({subCourseData}) {
  const courseName = useSelector(selectCourseName);
  const [courseImg, setCourseImg] = useState(null);
   // Function to fetch course image
  async function fetchImage(imagePath) {
    const imageRef = ref(storage, imagePath);
    try {
      const downloadURL = await getDownloadURL(imageRef);
      if (downloadURL) {
        console.log('Image URL:', downloadURL);
        setCourseImg(downloadURL);
      } else {
        console.log('Image not found.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  useEffect(()=>{
     fetchImage(`courses/${courseName}/${subCourseData.subCourseName}/subcourseImg`)
  },[])

  return (
    <Fragment>
        <div className='row justify-content-center'>
            <div className='col-auto'>
                <img src={ courseImg ? courseImg : RAD5_LOGO } alt="" className='img-fluid course_card_img'/>
            </div>
        </div>
        <div className='row justify-content-center'>
            <div className='col-auto'>
                <p className='course_title'>{subCourseData.subCourseName} </p>
            </div>
        </div>
        <div className='row justify-content-center'>
            <div className='col-auto'>
                <div className='row' style={{gap:'10px'}}>
                   <Link
                        to ={`/admin/courses/view_subcourse/${subCourseData.subCourseName}`}
                        className='btn btn-primary col'
                        data-tooltip-id="course_card_tip" 
                        data-tooltip-content="View Course"
                        
                        >
                          <Tooltip id="course_card_tip" />
                            <BiShow /> 
                    </Link>
                    <button className='btn btn-secondary col'
                     data-tooltip-id="course_card_tip" 
                     data-tooltip-content="Edit Course">
                      <FaEdit /> 
                    </button>
                    <button className='btn btn-danger col' onClick={()=> removeSubCourse(courseName, subCourseData.subCourseName)}
                    data-tooltip-id="course_card_tip" 
                    data-tooltip-content="Delete Course"
                    >
                      <AiFillDelete />
                    </button>
                </div>
            </div>
        </div>

    </Fragment>
       
  )
}

// src>assets>