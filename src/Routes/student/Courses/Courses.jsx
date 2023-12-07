import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';

import {auth, firestore} from '../../../utils/firebase.utils'

import Navbar from '../../../components/general/Navbar/Navbar';
import StudentSidebar from '../../../components/students/studentSidebar/StudentSidebar';

import LOGO from '../../../assets/images/rad5.png'

export default function Courses() {

    const [loadingCourses, setLoadingCourses] = useState(true);

    const [courses , setCourses ] = useState([])

    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleShow = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);

    const [user, setUser] = useState({});

    const fetchStudentDetails = (uid) => {
        const userDocRef = doc(firestore, 'students', uid);
      
        // Create a real-time listener for the user document
        const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const studentDetails = docSnapshot.data();
            CheckIfStudentIsActive(studentDetails);
          } else {
            console.log('User document does not exist');
            setLoadingCourses(false);
          }
        }, (error) => {
          console.error('Error fetching user document:', error);
          setLoadingCourses(false);
        });
      
        // Return the unsubscribe function to detach the listener when needed
        return unsubscribe;
      };

    const CheckIfStudentIsActive = (studentDetails)=>{
        const isActive = studentDetails.active;
            if (isActive === true) {
                // 'active' field is true, fetch details of the 'courses' map field
                const courses = studentDetails.courses;
                console.log('Courses:', courses);
                // Do something with the courses data
                setCourses(courses);
                setLoadingCourses(false);
            } else {
                console.log('User is not active');
                setLoadingCourses(false);

            }
    }

    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // console.log(user)
            setUser(user);
            fetchStudentDetails(user.uid); // Call fetchCourses with the user UID
          } else {
         // Redirect to the login page if the user is not authenticated
          }
        });
    
        return () => {
          unsubscribe(); // Unsubscribe from the onAuthStateChanged listener when the component is unmounted
        };
      }, []);
    return (
        <>
          <Navbar handleShow={handleShow} />
          <Container fluid>
            <Row>
                <StudentSidebar  showOffcanvas = {showOffcanvas} handleClose = {handleClose} currentItem='My Courses'/>

             {
              loadingCourses ?
              <Col className='mt-5'><Row className='justify-content-center'><Col xs ='auto'><Spinner animation="border" /></Col></Row></Col>
              :
              <Col>
              <Row className='mt-5'>
                  {
                  courses.length > 0 ?
                courses.map((course, index)=>{
                  return (
                      <Col xs = '3' key={index}>
                      <Card>
                          <Card.Img variant="top" src={LOGO} />
                          <Card.Body>
                              <Card.Title>{course.courseName}</Card.Title>
                              <Card.Text>
                                Cohort: {course.cohort}
                              </Card.Text>
                            
                              <Link to={`/student/courses/${course.courseName}`} state={course}>
                                    <Button variant="primary">Go to Course</Button>
                              </Link>
                          </Card.Body>
                      </Card>
                  </Col>
                  )
                })
              :
              <p>No courses Available</p>
                  }
              </Row>
          </Col>    
          
             }
            </Row>   
          </Container>          
        </>
    )
}
