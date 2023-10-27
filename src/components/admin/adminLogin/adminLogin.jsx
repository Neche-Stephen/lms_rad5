import React, {useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

import { signInAuthUserWithEmailAndPassword } from '../../../utils/firebase.utils';


export default function AdminLogin() {
    const navigate = useNavigate();
    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    const handleAdminSubmit = (e) => {
        e.preventDefault();
        signInAuthUserWithEmailAndPassword(adminEmail, adminPassword);
        navigate('/admin/analytics')
    }

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
