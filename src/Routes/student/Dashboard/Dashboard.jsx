import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../../../utils/firebase.utils';

import Navbar from '../../../components/general/Navbar/Navbar';
import StudentSidebar from '../../../components/students/studentSidebar/StudentSidebar';

export default function Dashboard() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleShow = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);

    useEffect(()=>{
         // Set up an observer for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          console.log('User is signed in:', user.uid);
          user.getIdTokenResult()
            .then((idTokenResult) => {
                // Access custom claim from the user's ID token
                const customClaimValue = idTokenResult.claims.admin;
                console.log('Custom claim value:', customClaimValue);
            })
            .catch((error) => {
                console.error('Error getting ID token:', error);
            });
        } else {
          // No user signed in
          console.log('No user signed in');
        }
      });
  
      // Clean up the observer when the component unmounts
      return () => {
        unsubscribe();
      };
    }, [])

    return (
        <>
            <Navbar handleShow={handleShow} />
            <Container fluid>
                <Row>
                    <StudentSidebar  showOffcanvas = {showOffcanvas} handleClose = {handleClose} currentItem='Dashboard'/>

                    <Col>
                        Dashboard
                    </Col>    
                </Row>   
            </Container>          
        </>
    )
}
