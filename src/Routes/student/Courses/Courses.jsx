import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import {auth, firestore} from '../../../utils/firebase.utils'

import Navbar from '../../../components/general/Navbar/Navbar';
import StudentSidebar from '../../../components/students/studentSidebar/StudentSidebar';

import LOGO from '../../../assets/images/rad5.png'

export default function Courses() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleShow = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);

    const [user, setUser] = useState({});

    const fetchCourses = (uid) =>{
        // Reference to the user document in the "users" collection
        const userDocRef = doc(firestore, 'students', uid);
        // console.log('the id', uid)
            // Fetch the user document
        getDoc(userDocRef)
        .then((docSnapshot) => {
            if (docSnapshot.exists()) {
            // Check if the document has the 'active' field and its value
            const userData = docSnapshot.data();
            const isActive = userData.active;

            if (isActive === true) {
                // 'active' field is true, fetch details of the 'courses' map field
                const courses = userData.courses;
                console.log('Courses:', courses);
                // Do something with the courses data
            } else {
                console.log('User is not active');
            }
            } else {
            console.log('User document does not exist');
            }
        })
        .catch((error) => {
            console.error('Error fetching user document:', error);
        });
    }

    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log(user)
            setUser(user);
            fetchCourses(user.uid); // Call fetchCourses with the user UID
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

                    <Col>
                        <Row className='mt-5'>
                            <Col xs = '3'>
                                <Card>
                                    <Card.Img variant="top" src={LOGO} />
                                    <Card.Body>
                                        <Card.Title>Frontend</Card.Title>
                                        {/* <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                        </Card.Text> */}
                                        <Button variant="primary">Go to Course</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>    
                </Row>   
            </Container>          
        </>
    )
}
