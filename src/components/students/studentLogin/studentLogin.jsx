import React, {useState} from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

import { signInAuthUserWithEmailAndPassword } from '../../../utils/firebase.utils';


export default function StudentLogin() {
    const navigate = useNavigate();
    const [studentEmail, setStudentEmail] = useState('');
    const [studentPassword, setStudentPassword] = useState('');
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const handleStudentSubmit = async (e) => {
        e.preventDefault();
        setLoadingSubmit(true);
        try {
          console.log('calling');
          const userCredential = await signInAuthUserWithEmailAndPassword(studentEmail, studentPassword);
          const user = userCredential.user;
          // Handle success, e.g., navigate, update state, etc.
          console.log('User signed in:', user);
          setLoadingSubmit(false);
          navigate('/student/courses');
        } catch (error) {
          // Handle error, e.g., show an error message, update state, etc.
          console.error('Sign-in error:', error.code);
          // You can switch on error.code if needed
          setLoadingSubmit(false);

        }
      };

  return (
        <form className='col p-0' onSubmit={handleStudentSubmit}>
            <Row className='justify-content-center mb-4 px-2 px-sm-0'>
                <Col xs ='6' sm = '5' md = '4'>
                    <label htmlFor="email">Email*</label>
                    <input type="email" id='email' className='form-control'
                     value={studentEmail}
                     onChange={(e) => setStudentEmail(e.target.value)} required
                    />
                </Col>

                <Col xs ='6' sm = '5' md = '4'>
                    <label htmlFor="password">Password*</label>
                    <input type="password" id='password' className='form-control'
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)} required
                    />
                </Col>
            </Row>  
            <Row className='justify-content-center mb-4'>
                <Col xs = 'auto'>
                    <Button type='submit' className='login_button py-1'>
                      {loadingSubmit ? <Spinner animation='border'/> :'LOGIN'}
                      </Button>
                </Col>
            </Row>
           
        </form>
  )
}
