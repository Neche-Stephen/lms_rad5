import React, {useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

import { signInAuthUserWithEmailAndPassword } from '../../../utils/firebase.utils';


export default function AdminLogin() {
    const navigate = useNavigate();
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    // navigate('/admin/analytics');

    const handleAdminSubmit = async (e) => {
        e.preventDefault();
        try {
          console.log('calling');
          const userCredential = await signInAuthUserWithEmailAndPassword(adminEmail, adminPassword);
          const user = userCredential.user;
          // Handle success, e.g., navigate, update state, etc.
          console.log('User signed in:', user);
          navigate('/admin/courses');
        } catch (error) {
          // Handle error, e.g., show an error message, update state, etc.
          console.error('Sign-in error:', error.code);
          // You can switch on error.code if needed
        }
      };

  return (
        <form className='col p-0' onSubmit={handleAdminSubmit}>
            <Row className='justify-content-center mb-4 px-2 px-sm-0'>
                <Col xs ='6' sm = '5' md = '4'>
                    <label htmlFor="email">Email*</label>
                    <input type="email" id='email' className='form-control'
                     value={adminEmail}
                     onChange={(e) => setAdminEmail(e.target.value)}
                     required
                    />
                </Col>

                <Col xs ='6' sm = '5' md = '4'>
                    <label htmlFor="password">Password*</label>
                    <input type="password" id='password' className='form-control'
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      required
                    />
                </Col>
            </Row>  
            <Row className='justify-content-center mb-4'>
                <Col xs = 'auto'>
                    <Button type='submit' className='login_button py-1'>LOGIN</Button>
                </Col>
            </Row>
           
        </form>
  )
}
