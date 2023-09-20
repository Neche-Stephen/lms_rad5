import React, { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import {firestore, storage} from '../../../utils/firebase.utils';

import { addCourse } from '../../../store/courses/courses.actions';
import Navbar from '../../../components/general/Navbar/Navbar';
import Sidebar from '../../../components/general/Sidebar/Sidebar';
import CoursesCard from '../../../components/admin/courseCard/CoursesCard';


export default function Courses() {
  // Reference to the Firestore collection
  const collectionRef = collection(firestore, 'courses');
  const dispatch = useDispatch();

  const [coursesData, setCoursesData] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleShow = () => setShowOffcanvas(true);
  const handleClose = () => setShowOffcanvas(false);

  // useEffect(() => {
  //   // Fetch all documents in the collection
  //   getDocs(collectionRef)
  //   .then((querySnapshot) => {
  //     const newCoursesData = [];
  //     // Iterate through the documents
  //     querySnapshot.forEach((doc) => {
  //       // Document data is in doc.data()
  //       const courseDocumentData = doc.data();
  //       console.log('Document Data:', courseDocumentData);
  //       // dispatch(addCourse({
  //       //     [courseDocumentData.courseName] : {
  //       //       courseName : courseDocumentData.courseName
  //       //     }
  //       // }))
  //       newCoursesData.push(courseDocumentData);
  //     });
  //     // Update the state after fetching the data
  //     setCoursesData(newCoursesData);
  //   })
  //   .catch((error) => {
  //     console.error('Error getting documents:', error);
  //   });
  // }, [])
  useEffect(() => {
    // Create a real-time listener using onSnapshot
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const newCoursesData = [];

      querySnapshot.forEach((doc) => {
        const courseDocumentData = doc.data();
        newCoursesData.push(courseDocumentData);
      });

      setCoursesData(newCoursesData);
    });

    // Return a cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <Fragment>
        <Navbar handleShow={handleShow} />
        <Container fluid>
          <Row>
            <Col className='d-none d-lg-block p-0' style = {{backgroundColor:'#3936BC', height:'100vh'}} xs = '2'>
                  <Sidebar  showOffcanvas = {showOffcanvas} handleClose = {handleClose} currentItem='Courses'/>
            </Col>
            <Col xs = '10'>
              <Row>
                  <Link to='/admin/courses/add_course'><p>Add Course</p></Link>
              </Row>
                <Row>
                  {
                    coursesData.length > 0 && coursesData.map((courseData, index) =>{
                      return <Col><CoursesCard key = {index} courseData = {courseData} /></Col>
                    })
                  }

                 
                </Row>
            </Col>
          </Row>
        </Container>
    </Fragment>
  )
}
