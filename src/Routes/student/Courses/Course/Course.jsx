//This component is the student component for accessing a particular course

import React, {useState, useEffect} from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { doc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Accordion from 'react-bootstrap/Accordion';
import { Container, Row, Col, Offcanvas, Button , Spinner} from 'react-bootstrap';
import { useDispatch} from 'react-redux';


import { addCourseName } from '../../../../store/studentCourses/sCourses.actions';
import Navbar from '../../../../components/general/Navbar/Navbar';
import StudentSidebar from '../../../../components/students/studentSidebar/StudentSidebar';

import { firestore, storage } from '../../../../utils/firebase.utils';

export default function Course() {
  
    const [loadingCourse, setLoadingCourse] = useState(true);

    //Offcanvas functions and state
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleShow = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);
    
    //Getting a reference to the courses collection on firebase
    const coursesCollectionRef = collection(firestore, 'courses');

     //Extracting name of the course we are viewing
    const {courseName} = useParams();

    const dispatch = useDispatch();
    dispatch(addCourseName({courseName:courseName}));

    //Getting a reference to the particular course we are viewing using the name
    const selectedCourseDocRef = doc(coursesCollectionRef, courseName);

    //State for storing subcourses fetched from firestore
    const [subCourses, setSubCourses] = useState([]);
    
    //State for storing course topics fetched from firestore
    const [coursetopics, setCourseTopics] = useState([]);

     //Function to check if this course has subcourses
  const checkIfCourseHasSubCourse =  () => {
    // Reference to the "subcourse" subcollection within the selected course
    const subcourseSubcollection = collection(selectedCourseDocRef, 'subcourse');

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
        // setLoading(false);
        console.log('course dey')
      } 
      else{
        console.log('no subcourse');
        setLoadingCourse(false);
      }
    });
  }

  const checkIfCourseHasDirectTopics =  () => {
    // Reference to the "topics" subcollection within the selected course
    const topicsSubcollection = collection(selectedCourseDocRef , 'topics');
    const orderByTimestamp = orderBy('created_at');
    // A query to retrieve documents from the "topics" subcollection
    const q = query(topicsSubcollection, orderByTimestamp);
    //Then we use onSnapshot to check if the subcollection "topics" that we referenced exists
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // Check if the subcollection "topics" exists
      if (!querySnapshot.empty) {
        // Fetch documents from the "topics" subcollection
        fetchCourseTopics(querySnapshot)
        // setLoading(false);
      } 
      else{
        console.log('empty ')
        setLoadingCourse(false);
      }
    });
  }
  //Function to fetch and add subcourses to state
  const fetchSubCourses = (querySnapshot) =>{
    const subcourseDocuments = querySnapshot.docs.map((doc) => doc.data());
    setSubCourses(subcourseDocuments);
    setLoadingCourse(false)
  }

  //Function to fetch and add course topics to state
  const fetchCourseTopics = (querySnapshot) =>{
  const topicDocuments = querySnapshot.docs.map((doc) => doc.data());
  setLoadingCourse(false)
  setCourseTopics(topicDocuments)
}
  
  useEffect(() => {
    //Check if course has direct topics under it
    checkIfCourseHasDirectTopics();

    //Check if course has subcourses
    checkIfCourseHasSubCourse();

  }, [])


    //More info about the course on the student
    let { state } = useLocation();
 
  return (
   <>
        <Navbar handleShow={handleShow}/>
        <Container fluid>
            <Row>
             <StudentSidebar  showOffcanvas = {showOffcanvas} handleClose = {handleClose} currentItem='My Courses'/>

              {
                loadingCourse ?
                <Col className='mt-5'><Row className='justify-content-center'><Col xs ='auto'><Spinner animation="border" /></Col></Row></Col>
                :
                <Col>
                <Accordion>
                  <h3>Subcourses</h3>
                  { subCourses.length > 0 && subCourses.map((subcourse, index)=>{
                    return (
                      <Accordion.Item eventKey={index}>
                      <Accordion.Header>{subcourse.subCourseName}</Accordion.Header>
                      <Accordion.Body>
                        <Row>
                            <Col>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                          <Col>
                            <Link to={`/student/courses/subcourse/${subcourse.subCourseName}`}><Button>Go to subcourse</Button></Link>
                          </Col>
                        </Row>
                      </Accordion.Body>
                  </Accordion.Item>
                  
                    )
                  })}
                  
                </Accordion>

                <Accordion className='mt-4'>
                  <h3>Topics</h3>
                  { coursetopics.length > 0 && coursetopics.map((coursetopic, index)=>{
                    return (
                      <Accordion.Item eventKey={index}>
                      <Accordion.Header>{coursetopic.topicName}</Accordion.Header>
                      <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                      minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                      aliquip ex ea commodo consequat. Duis aute irure dolor in
                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                      culpa qui officia deserunt mollit anim id est laborum.
                      </Accordion.Body>
                  </Accordion.Item>
                  
                    )
                  })}
                  
                </Accordion>
             </Col>
              }
            </Row>
        </Container>

   </>
  )
}
