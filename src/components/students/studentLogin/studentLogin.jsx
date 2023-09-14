import React, {useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { signInAuthUserWithEmailAndPassword } from '../../../utils/firebase.utils';


export default function StudentLogin() {
    const [studentEmail, setStudentEmail] = useState('');
    const [studentPassword, setStudentPassword] = useState('');

    const handleStudentSubmit = (e) => {
        e.preventDefault();
        console.log('calling')
        signInAuthUserWithEmailAndPassword(studentEmail, studentPassword);
    }

  return (
        <form className='col p-0' onSubmit={handleStudentSubmit}>
            <Row className='justify-content-center mb-4 px-2 px-sm-0'>
                <Col xs ='6' sm = '5' md = '4'>
                    <label htmlFor="email">Email*</label>
                    <input type="email" id='email' className='form-control'
                     value={studentEmail}
                     onChange={(e) => setStudentEmail(e.target.value)}
                    />
                </Col>

                <Col xs ='6' sm = '5' md = '4'>
                    <label htmlFor="password">Password*</label>
                    <input type="password" id='password' className='form-control'
                      value={studentPassword}
                      onChange={(e) => setStudentPassword(e.target.value)}
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
