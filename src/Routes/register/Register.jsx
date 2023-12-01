import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { collection, getDocs, getDoc, deleteDoc, doc, setDoc} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import './Register.css'

import { firestore, auth } from '../../utils/firebase.utils';
import LOGO from '../../assets/images/rad5.png';
import REGISTER from '../../assets/images/register.png';

import RegisterForm from './RegisterForm';

function Register() {
    // State to store user id, if user is authenicated
    const [user, setUser] = useState(null);

    const [coursesArray, setCoursesArray] = useState([]);

    const [userProfile, setUserProfile] = useState({}); // State to store user profile like first name and last name

    const fetchCohortCourses = async () => {
        const cohortCollection = collection(firestore, 'cohorts');
        const cohortCoursesSnapshot = await getDocs(cohortCollection);
       // Extracting data from QuerySnapshot and updating coursesArray
        const newDataArray = cohortCoursesSnapshot.docs.map((doc) => doc.data());

        // Updating coursesArray with the accumulated data
        setCoursesArray([...coursesArray, ...newDataArray]);
    }

    const fetchUserProfileInfo = async (uid) => {
       try{
        const studentsDocRef = doc(firestore, "students", uid);
        const docSnapshot = await getDoc(studentsDocRef);
        if (docSnapshot.exists()) {
            // Document exists, retrieve its data
            const documentData = docSnapshot.data();
            console.log('Document data:', documentData);
            setUserProfile(documentData);
            // return documentData;
          } else {
            console.log('Document not found.');
            return null;
          }

       }catch (error) {
        console.error('Error fetching document:', error);
        return null;
      }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            // User is signed in
            console.log('User is signed');
            setUser(currentUser);
            fetchUserProfileInfo(currentUser.uid);
            fetchCohortCourses();
          } else {
            // No user is signed in, redirect to login
            console.log('No user is signed');
          }
        });
    
        return () => {
          unsubscribe(); // Cleanup the listener when component unmounts
        };
      }, [auth]);

 
  return (
    <Container fluid>
        {/* header */}
        <Row className='register_first_row justify-content-center align-items-center'>
            <Col xs = 'auto'><img src={LOGO} alt="" /></Col>
        </Row>
        <Row className='mt-3 justify-content-end'>
            <Col xs = 'auto'>
               <div className='d-flex register_create_account_text_div ' style={{gap:'30px'}}>
                    <hr />
                    <p className='register_create_account_text'>Register</p>
                    <hr/>
               </div>
            </Col>
        </Row>
        <Row className='mt-2 mb-5 justify-content-center align-items-stretch' style={{gap:"30px"}}>
            <img className='col-4 register_img' src={REGISTER} alt="" />
            <RegisterForm 
                coursesArray = {coursesArray}
                userProfile =   {userProfile}
                uid = {user.id}
            />    
        </Row>
    </Container>
  );
}

export default Register;