import React, {useEffect, useState, Fragment} from 'react';
import { Link } from 'react-router-dom';
import {ref, getDownloadURL } from 'firebase/storage'; 
import {firestore, storage} from '../../../utils/firebase.utils';

import styles from './CourseCard.module.css';
import RAD5_LOGO from '../../../assets/images/rad5.png'
//utils
import { removeCourse } from '../../../utils/courses/removeCourse';
import { FaEdit } from 'react-icons/fa';
import { BiShow } from 'react-icons/bi';
import { AiFillDelete} from 'react-icons/ai';
import { Tooltip } from 'react-tooltip';

import WHITE_CIRCLE from '../../../assets/images/white_circle.svg';
import CODE_LOGO from '../../../assets/images/code_logo.svg';


export default function CoursesCard({courseData}) {
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
     fetchImage(`courses/${courseData.courseName}/courseImg`)
  },[])

  return (
    <div className={`${styles.test_card}`}>
        <div className={`row ${styles.test_card_first_row}`}>
          <div className={`${styles.test_card_white_circle}`}>
            <img src={WHITE_CIRCLE} alt="" />
            <div className={`${styles.test_card_white_circle_inner}`}>
              <img src={CODE_LOGO} alt="" />
            </div>
          </div>
          <div>
            <p>{courseData.courseName}</p>
          </div>
        </div>
        <div className={`row ${styles.test_card_second_row}`}>
          <button className={`${styles.test_card_second_row_col}`}
            data-tooltip-id="course_card_tip" 
            data-tooltip-content="Edit Course">
            <FaEdit /> 
          </button>
          <Link
          to ={`/admin/courses/view_course/${courseData.courseName}`}
          className={`${styles.test_card_second_row_col}`}
          data-tooltip-id="course_card_tip" 
          data-tooltip-content="View Course"
          
          >
            <Tooltip id="course_card_tip" />
              <BiShow /> 
          </Link>
          <button className={`${styles.test_card_second_row_col}`} onClick={()=> removeCourse(courseData.courseName)}
            data-tooltip-id="course_card_tip" 
            data-tooltip-content="Delete Course"
          >
            <AiFillDelete />
          </button>
        </div>
    </div>
       
  )
}

// src>assets>