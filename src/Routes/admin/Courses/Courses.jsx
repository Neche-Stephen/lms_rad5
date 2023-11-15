import React, { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { Container, Row, Col, Spinner, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { collection, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';
import {firestore, storage} from '../../../utils/firebase.utils';
import { IoIosAddCircleOutline } from 'react-icons/io'
import { Tooltip } from 'react-tooltip';


import { addCourse } from '../../../store/courses/courses.actions';
import Navbar from '../../../components/general/Navbar/Navbar';
import AdminSidebar from '../../../components/admin/adminSideBar/AdminSidebar';
import CoursesCard from '../../../components/admin/courseCard/CoursesCard';
import AddCourseModal from '../../../components/admin/addCourseModal/AddCourseModal';


export default function Courses() {
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Reference to the Firestore collection
  const collectionRef = collection(firestore, 'courses');

  const [coursesData, setCoursesData] = useState([]);
  const [coursesImg, setCourseImg] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleShow = () => setShowOffcanvas(true);
  const handleClose = () => setShowOffcanvas(false);

  useEffect(() => {
    const orderByTimestamp = orderBy('created_at');
    const q = query(collectionRef, orderByTimestamp);
    // Create a real-time listener using onSnapshot
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newCoursesData = [];
      querySnapshot.forEach((doc) => {
        const courseDocumentData = doc.data();
        newCoursesData.push(courseDocumentData);
        console.log(courseDocumentData)
      });
      setCoursesData(newCoursesData);
      setLoadingCourses(false);
    });
    

    // Return a cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <Fragment>
        <Navbar handleShow={handleShow} />
        <Container fluid>
          <Row>
            <AdminSidebar  showOffcanvas = {showOffcanvas} handleClose = {handleClose} currentItem='Courses'/>
            {/* <Sidebar  showOffcanvas = {showOffcanvas} handleClose = {handleClose} currentItem='Courses'/> */}

           
           {
            loadingCourses
            ?
            <Col>
              <div className='row justify-content-center mt-5'>
                <div className='col-auto'>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              </div>
            </Col>
            :
            <Col xs = '10'>
              <Row className='px-5 mt-5' style={{gap:'50px'}}>
                  {
                    coursesData.length > 0 && coursesData.map((courseData, index) =>{
                      console.log(courseData)
                      return <Col xs = '10' md = '4' lg = '3' key = {index}  className = 'course_card p-3'>
                          <CoursesCard courseData = {courseData} />
                        </Col>
                      
                    })
                  }

                <Col xs = '10' md = '4' lg = '3' className = 'course_card'>
                    <div className='row justify-content-center align-items-center course_card_add p-0' >
                      <p className='col-auto' onClick={handleShowModal}>
                        <IoIosAddCircleOutline 
                          data-tooltip-id="add_course_tip"
                          data-tooltip-content="Add new course"
                          style={{fontSize:'4em', cursor:'pointer'}}/>
                      </p>
                      <Tooltip id="add_course_tip" />
                    </div>
                    <Modal show={showModal} onHide={handleCloseModal} className='addcourse_modal'>
                        <AddCourseModal 
                          handleCloseModal = {handleCloseModal}
                        />
                    </Modal>
                </Col>
              </Row>
          </Col>
           }
          </Row>
        </Container>
    </Fragment>
  )
}
