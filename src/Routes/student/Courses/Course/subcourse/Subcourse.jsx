import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Accordion, Button, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { collection, doc, query, onSnapshot } from 'firebase/firestore';

import { firestore } from '../../../../../utils/firebase.utils';

import { selectCourseName } from '../../../../../store/studentCourses/sCourses.selector';
import { addSubCourseName } from '../../../../../store/subcourses/subcourses.actions';

import Navbar from '../../../../../components/general/Navbar/Navbar';
import StudentSidebar from '../../../../../components/students/studentSidebar/StudentSidebar';


export default function Subcourse() {

  const [loadingSubCourse, setLoadingSubCourse] = useState(true);

  //Offcanvas functions and state
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleShow = () => setShowOffcanvas(true);
  const handleClose = () => setShowOffcanvas(false);

   //Selecting name of the course containing subcourse we are viewing
   const courseName = useSelector(selectCourseName);

  //Extracting name of the subcourse we are viewing
  const {subCourseName} = useParams();

  const dispatch = useDispatch();
  dispatch(addSubCourseName({subCourseName:subCourseName}));

  //Getting a reference to the courses collection on firebase
  const coursesCollection = collection(firestore, 'courses');
  
 //Getting a reference to the name of the course containing subcourse we are viewing
 const selectedCourse = doc(coursesCollection, courseName);

 //Getting a reference to the subcourse collection on firebase, which is under the course
 const subCourseCollection = collection(selectedCourse, 'subcourse');

 //Getting a reference to the particular subcourse we are viewing using the name
 const selectedSubCourse = doc(subCourseCollection, subCourseName);

 //State for storing course topics fetched from firestore
 const [coursetopics, setCourseTopics] = useState([]);

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
    else{
      setLoadingSubCourse(false);
    }
  });
}

 //Function to fetch and add course topics to state
const fetchCourseTopics = (querySnapshot) =>{
  const topicDocuments = querySnapshot.docs.map((doc) => doc.data());
  setCourseTopics(topicDocuments);
  setLoadingSubCourse(false);
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
            <StudentSidebar  showOffcanvas = {showOffcanvas} handleClose = {handleClose} currentItem='My Courses'/>
          {
            loadingSubCourse ?
            <Col className='mt-5'><Row className='justify-content-center'><Col xs ='auto'><Spinner animation="border" /></Col></Row></Col>
            :
            <Col>
            <Row>
                {/* <Col><h3>Topics</h3></Col> */}
            </Row>
            <Row>
                <Col>
                <Accordion className='mt-4'>
                <h3>Topics</h3>
                { coursetopics.length > 0 ? coursetopics.map((coursetopic, index)=>{
                  return (
                    <Accordion.Item eventKey={index}>
                    <Accordion.Header>{coursetopic.topicName}</Accordion.Header>
                    <Accordion.Body>
                      <Row>
                          <Col>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                          </Col>
                      </Row>
                      <Row className='mt-3'>
                        <Col>
                          <Link to={`/student/courses/subcourse/topic/${coursetopic.topicName}`}><Button>Go to topic</Button></Link>
                        </Col>
                      </Row>
                    </Accordion.Body>
                </Accordion.Item>
                
                  )
                }) 
                :
                <p>No topics in this subcourse</p>
                }
                
              </Accordion>
                </Col>
            </Row>
          </Col>
          }
          </Row>
        </Container>
      
      </>
  )
}
