import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import AdminLogin from '../../components/admin/adminLogin/adminLogin';
import TutorLogin from '../../components/tutor/tutorLogin/tutorLogin';
import StudentLogin from '../../components/students/studentLogin/studentLogin';

import RAD5_LOGO from '../../assets/images/rad5.png';


import './Login.css';
const defaultLoginClicked =  {
    adminLogin : true,
    tutorLogin : false,
    studentLogin : false
}

export default function Login() {
    const [loginClicked, setLoginClicked] = useState(defaultLoginClicked);
    const {adminLogin, tutorLogin, studentLogin} = loginClicked;
    const [login, setLogin] = useState(<AdminLogin />);

    const handleLoginCircleBgColor = (login) =>{
        const updatedLoginClicked = { ...loginClicked };
        // Set the selected key to true and the rest to false
        for (const key in updatedLoginClicked) {
        updatedLoginClicked[key] = key === login;
        }

        // Update the state with the modified object
        setLoginClicked(updatedLoginClicked);
    }
    const handleChangeLogin = (e, login) => {
        e.preventDefault();
        if (login === 'adminLogin'){
            setLogin(<AdminLogin />);
            handleLoginCircleBgColor('adminLogin');
        }
        else if (login === 'tutorLogin'){
            setLogin(<TutorLogin />);
            handleLoginCircleBgColor('tutorLogin');
        }
        else if (login === 'studentLogin'){
            setLogin(<StudentLogin />);
            handleLoginCircleBgColor('studentLogin');
        }
    }
    
  return (
    <div className='loginComponent'>
        <Container fluid className=''>
            <Row className='justify-content-center login-logo-row mb-3'>
                <Col xs = 'auto'>
                    <img src={RAD5_LOGO} alt="" />
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col xs = 'auto'>
                    <p>Select your account type and enter login details below to access dashboard.</p>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col xs = '11' sm = '10' md = '8'  className='login_account_type px-sm-5 pt-5 pb-4'>
                    <Row className='justify-content-evenly mb-4'>
                        <Col xs = '4' style={{position:"relative"}}>
                            <button style={{backgroundColor : adminLogin ? '#FF9A9A': 'white' }} onClick={(e) => handleChangeLogin(e, 'adminLogin')} className='login_circle'></button>
                            <div className='login_admin d-flex align-items-end justify-content-center'>
                                <p>Administrator</p>
                            </div>
                            
                        </Col>
                        <Col xs = '4' style={{position:"relative"}}>
                            <button className='login_circle' style={{backgroundColor : tutorLogin ? '#FF9A9A': 'white' }} onClick={(e) => handleChangeLogin(e, 'tutorLogin')}  ></button>
                            <div className='login_admin d-flex align-items-end justify-content-center'>
                                <p>Tutor</p>
                            </div>
                            
                        </Col>

                        <Col xs = '4' style={{position:"relative"}}>
                            <button  className='login_circle' style={{backgroundColor : studentLogin ? '#FF9A9A': 'white' }} onClick={(e) => handleChangeLogin(e, 'studentLogin')}></button>
                            <div className='login_admin d-flex align-items-end justify-content-center'>
                                <p>Student</p>
                            </div>
                            
                        </Col>
                        
                    </Row> 
                    <Row>
                        {/* <form className='col p-0'>
                            <Row className='justify-content-center mb-4 px-2 px-sm-0'>
                                <Col xs ='6' sm = '5' md = '4'>
                                    <label htmlFor="email">Email*</label>
                                    <input type="email" id='email' className='form-control'/>
                                </Col>

                                <Col xs ='6' sm = '5' md = '4'>
                                    <label htmlFor="password">Password*</label>
                                    <input type="password" id='password' className='form-control' />
                                </Col>
                            </Row>  
                            <Row className='justify-content-center mb-4'>
                                <Col xs = 'auto'>
                                    <Button className='login_button py-1'>LOGIN</Button>
                                </Col>
                            </Row>
                            <Row className='justify-content-center'>
                                <Col xs = 'auto'>
                                    <span>Forgot Password?</span>
                                </Col>
                            </Row>
                        </form> */}
                        {login}
                    </Row>        
                    <Row className='justify-content-center'>
                        <Col xs = 'auto'>
                            <span>Forgot Password?</span>
                        </Col>
                    </Row>     
                </Col>
            </Row>
        </Container>
    </div>
  )
}
