//Component representing full information about a course.

import React, {useState, useEffect} from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch} from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io'
import { Tooltip } from 'react-tooltip';


import { addCourseName } from '../../../../store/courses/courses.actions';
import { selectCourseName } from '../../../../store/courses/courses.selector';

import { collection, doc, setDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import {firestore, storage} from '../../../../utils/firebase.utils';
import { uploadString,  ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

import Navbar from '../../../../components/general/Navbar/Navbar';
import Sidebar from '../../../../components/general/Sidebar/Sidebar';
import AddTopicModal from '../../../../components/admin/addTopicModal/AddTopicModal';
import AddSubCourseModal from '../../../../components/admin/addSubCourseModal/AddSubCourseModal';
import SubCoursesCard from '../../../../components/admin/subcourseCard/SubCoursesCard';
import TopicsTable from '../../../../components/admin/topicsTable/TopicsTable';
import Table from 'react-bootstrap/Table';



//Getting a reference to the courses collection on firebase
const coursesCollection = collection(firestore, 'courses');

export default function CourseView() {
  const [loading, setLoading] = useState(true);

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleShow = () => setShowOffcanvas(true);
  const handleClose = () => setShowOffcanvas(false);
  //Spinner or loader for fetching the course details
  const [loadingCourseDetails, setLoadingCourseDetails] = useState(true);

   //Extracting name of the course we are viewing
  const {courseName} = useParams();
  
  const dispatch = useDispatch();
  dispatch(addCourseName({courseName:courseName}));

  //Getting a reference to the particular course we are viewing using the name
  const selectedCourse = doc(coursesCollection, courseName);

  //State for storing subcourses fetched from firestore
  const [subCourses, setSubCourses] = useState([]);
  
  //State for storing course topics fetched from firestore
  const [coursetopics, setCourseTopics] = useState([]);

  //State and methods for Modal displaying form where a new subcourse will be added
  const [showModalSubCourse, setShowModalSubCourse] = useState(false);
  const handleCloseModalSubCourse = () => setShowModalSubCourse(false);
  const handleShowModalSubCourse = () => setShowModalSubCourse(true);

  //State and methods for displaying form where a new topic will be added
  const [showModalTopic, setShowModalTopic] = useState(false);
  const handleCloseModalTopic = () => setShowModalTopic(false);
  const handleShowModalTopic = () => setShowModalTopic(true);

  //Function to check if this course has subcourses
  const checkIfCourseHasSubCourse = () => {
    // Reference to the "subcourse" subcollection within the selected course
    const subcourseSubcollection = collection(selectedCourse, 'subcourse');

    const orderByTimestamp = orderBy('created_at');
    // A query to retrieve documents from the "subcourse" subcollection
    // const subcourseQuery = query(subcourseSubcollection );
    const q = query(subcourseSubcollection, orderByTimestamp);

    //Then we use onSnapshot to check if the subcollection "subcourse" that we referenced exists
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // Check if the subcollection "subcourse" exists
      if (!querySnapshot.empty) {
        // Fetch documents from the "subcourse" subcollection
        fetchSubCourses(querySnapshot)
        setLoading(false);
      } 
      else{
        console.log('no subcourse');
        setLoading(false);
      }
    });
  }

  const checkIfCourseHasDirectTopics = () => {
    console.log('here direct topics ')
    // Reference to the "topics" subcollection within the selected course
    const topicsSubcollection = collection(selectedCourse, 'topics');
    const orderByTimestamp = orderBy('created_at');
    // A query to retrieve documents from the "topics" subcollection
    const topicsQuery = query(topicsSubcollection);
    const q = query(topicsSubcollection, orderByTimestamp);
    //Then we use onSnapshot to check if the subcollection "topics" that we referenced exists
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // Check if the subcollection "topics" exists
      if (!querySnapshot.empty) {
        // Fetch documents from the "topics" subcollection
        fetchCourseTopics(querySnapshot)
        setLoading(false);
      } 
      else{
        console.log('empty ')
        setLoading(false);
      }
    });
  }

  //Function to fetch and add subcourses to state
  const fetchSubCourses = (querySnapshot) =>{
    const subcourseDocuments = querySnapshot.docs.map((doc) => doc.data());
    setSubCourses(subcourseDocuments);
  }

   //Function to fetch and add course topics to state
  const fetchCourseTopics = (querySnapshot) =>{
    const topicDocuments = querySnapshot.docs.map((doc) => doc.data());
    setLoading(false);
    setCourseTopics(topicDocuments)
  }


  useEffect(() => {
    //Check if course has direct topics under it
    checkIfCourseHasDirectTopics();

    //Check if course has subcourses
    checkIfCourseHasSubCourse();


  }, [])

  return (
    <>
      <Navbar handleShow={handleShow}/>
      <Container fluid>
        <Row>
         <Sidebar  showOffcanvas = {showOffcanvas} handleClose = {handleClose} currentItem='Courses'/>
          {
            loading ?
            <Col>
            <div className='row justify-content-center mt-5'>
              <div className='col-auto'>
                <Spinner animation="grow" />
              </div>
            </div>
          </Col>
            :
            <Col>
            <Row>
              <Col>
                  <p><FaArrowLeft /> Go back to Courses</p>
              </Col>
            </Row>

            <Row >
              <Col>
                <h3>Course Name: {courseName}</h3>
              </Col>
            </Row>

          {/* Subcourses */}
            <Row className='mb-3'>
              <Col>
                <Row>
                  <Col>
                    <h3>Subcourses</h3>
                  </Col>
                </Row>
                <Row  className='px-5 mt-2' style={{gap:'50px'}}>
                {
                subCourses.length > 0 &&
                subCourses.map((subCourse, index)=>{
                return (
                  <Col xs = '10' md = '4' lg = '3' key = {index}>
                    <SubCoursesCard 
                        subCourseData = {subCourse}
                    />
                   
                  </Col>
                )
                })
                }

                <Col xs = '10' md = '4' lg = '3' className = 'course_card'>
                    <div className='row justify-content-center align-items-center course_card_add p-0' >
                      <p className='col-auto' onClick={handleShowModalSubCourse}>
                        <IoIosAddCircleOutline 
                          data-tooltip-id="add_subcourse_tip"
                          data-tooltip-content="Add New subcourse"
                          style={{fontSize:'4em', cursor:'pointer'}}/>
                      </p>
                      <Tooltip id="add_subcourse_tip" />
                    </div>
                     {/* Add Subcourse Modal */}
                  <Modal show={showModalSubCourse} onHide={handleCloseModalSubCourse}>
                    <AddSubCourseModal 
                      handleCloseModalSubCourse = {handleCloseModalSubCourse}
                    />
                  </Modal>
                </Col>
                </Row>
              </Col>
              
            </Row>

          {/* Topics */}
            <Row>
              <Col>
                <Row>
                  <Col>
                    <h3>Topics</h3>
                  </Col>
                </Row>
                <Row  className='px-5 mt-2' style={{gap:'50px'}}>
                   <Col xs = '12' sm = '10' lg='6'>
                      <TopicsTable coursetopics = {coursetopics}/>
                   </Col>

                   
                <Col xs = '10'  md = '4' lg = '3' className = 'course_card'>
                    <div className='row justify-content-center align-items-center course_card_add p-0' >
                      <p className='col-auto' onClick={handleShowModalTopic}>
                        <IoIosAddCircleOutline 
                          data-tooltip-id="add_topic_tip"
                          data-tooltip-content="Add New Topic"
                          style={{fontSize:'4em', cursor:'pointer'}}/>
                      </p>
                      <Tooltip id="add_topic_tip" />
                    </div>
                     {/* Add Topic Modal */}
                  <Modal show={showModalTopic} onHide={handleCloseModalTopic}>
                    <AddTopicModal
                      handleCloseModalTopic = {handleCloseModalTopic}
                    />
                  </Modal>
                </Col>
                </Row>
              </Col>
            </Row>

            </Col>
          }
        </Row>
      
      </Container>
    </>
  )
}
