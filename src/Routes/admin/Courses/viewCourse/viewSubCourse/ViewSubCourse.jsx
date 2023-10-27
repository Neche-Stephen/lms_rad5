//Component representing full information about a subcourse.

import React, {useState, useEffect} from 'react';
import {  Link, useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch} from 'react-redux';
import { IoIosAddCircleOutline } from 'react-icons/io'
import { Tooltip } from 'react-tooltip';
import Spinner from 'react-bootstrap/Spinner';


import { selectCourseName } from '../../../../../store/courses/courses.selector';
import { addSubCourseName } from '../../../../../store/subcourses/subcourses.actions';

import { collection, doc, setDoc, query, onSnapshot } from 'firebase/firestore';
import {firestore, storage} from '../../../../../utils/firebase.utils';
import { uploadString,  ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

import AddSubCourseTopicModal from '../../../../../components/admin/addSubCourseTopicModal/addSubCourseTopicModal';
import SubCourseTopicsTable from '../../../../../components/admin/subCourseTopicsTable/subCourseTopicsTable';

import Navbar from '../../../../../components/general/Navbar/Navbar';
import Sidebar from '../../../../../components/general/Sidebar/Sidebar';

const defaulTopicDetailsNonFiles = {
  topicName : '',
  topicIntro : '',
  topicMaterialLink : '',
  topicHomeworkLink : '',
  topicClassworkLink : ''
}
const defaultTopicDetailsFiles = {
  topicMaterialFile : null,
  topicHomeworkFile : null,
  topicClassworkFile : null,
}

//Getting a reference to the courses collection on firebase
const coursesCollection = collection(firestore, 'courses');

export default function SubCourseView() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleShow = () => setShowOffcanvas(true);
  const handleClose = () => setShowOffcanvas(false);

  //Selecting name of the course containing subcourse we are viewing
  const courseName = useSelector(selectCourseName);

  //Extracting name of the subcourse we are viewing
  const {subCourseName} = useParams();
  console.log(subCourseName);

  //Getting a reference to the name of the course containing subcourse we are viewing
  const selectedCourse = doc(coursesCollection, courseName);

  //Getting a reference to the subcourse collection on firebase, which is under the course
  const subCourseCollection = collection(selectedCourse, 'subcourse');

  //Getting a reference to the particular subcourse we are viewing using the name
  const selectedSubCourse = doc(subCourseCollection, subCourseName);
  
  const dispatch = useDispatch();
  dispatch(addSubCourseName({subCourseName:subCourseName}));

  //State for storing course topics fetched from firestore
  const [coursetopics, setCourseTopics] = useState([]);

  //State and methods for displaying form where a new topic will be added
  const [showModalTopic, setShowModalTopic] = useState(false);
  const handleCloseModalTopic = () => setShowModalTopic(false);
  const handleShowModalTopic = () => setShowModalTopic(true);

  const checkIfSubCourseHasTopics = () => {
    // Reference to the "topics" subcollection within the selected course
    const topicsSubcollection = collection(selectedSubCourse, 'topics');
    // A query to retrieve documents from the "topics" subcollection
    const topicsQuery = query(topicsSubcollection);
    //Then we use onSnapshot to check if the subcollection "topics" that we referenced exists
    const unsubscribe = onSnapshot(topicsQuery, (querySnapshot) => {
      // Check if the subcollection "topics" exists
      if (!querySnapshot.empty) {
        // Fetch documents from the "topics" subcollection
        fetchCourseTopics(querySnapshot)
      } 
    });
  }

   //Function to fetch and add course topics to state
  const fetchCourseTopics = (querySnapshot) =>{
    const topicDocuments = querySnapshot.docs.map((doc) => doc.data());
    setCourseTopics(topicDocuments)
  }


  useEffect(() => {
    //Check if course has direct topics under it
    checkIfSubCourseHasTopics();

  }, [])

  return (
   <>
    <Navbar handleShow={handleShow}/>
    <Container fluid>
        <Row>
            <Col className='d-none d-lg-block p-0' style = {{backgroundColor:'#3936BC'}} xs = '2'>
            <Sidebar  showOffcanvas = {showOffcanvas} handleClose = {handleClose} currentItem='Courses'/>
            </Col>

            <Col>
            <Row>
              <Col>
                <h3>SubCourse Name: {subCourseName}</h3>
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
                <Col xs = '12' sm = '10' lg = '6'>
                  <SubCourseTopicsTable coursetopics = {coursetopics}/>
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
                    <AddSubCourseTopicModal
                    handleCloseModalTopic = {handleCloseModalTopic}  
                    />
                  </Modal>
                </Col>
            </Row>
          </Col>
      </Row>
     
       {/* <><br/><button onClick={handleShowModalTopic}>Add New Topic</button></>
       <Modal show={showModalTopic} onHide={handleCloseModalTopic}>
        <AddSubCourseTopicModal
        handleCloseModalTopic = {handleCloseModalTopic}  
        />
      </Modal> */}
            </Col>
        </Row>
    </Container>
   </>
  )
}
