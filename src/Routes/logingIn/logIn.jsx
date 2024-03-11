import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Row, Col, Navbar } from "react-bootstrap";
import Rad5logo from '../../assets/images/Rad5 1.svg'; // Importing Rad5 logo
import loginImg from '../../assets/images/loginImg.png'; // Importing login image
import Google from '../../assets/images/google.svg'; // Importing Google logo
import LoginCss from './logIn.module.css'; // Importing CSS module for styling

export default function LogIn() {
 
    return(
        <section>
            <Container>
                 {/* Navbar */}
                <Navbar>
                    <Navbar.Brand><img src={Rad5logo} alt="Rad5 logo"/></Navbar.Brand>
                </Navbar>
                {/* Login Section */}
                <section>
                    {/* Login Form and Image */}
                    <Row xl={2} lg={2} md={1} sm={1} xs={1} className={`${LoginCss.loginbgColor}`}>
                        {/* Image Column */}
                        <Col>
                            <div className={`${LoginCss.LoginImg}`}>
                                <img src={loginImg} alt="I'm happy" className="img-fluid"/>  
                            </div>        
                        </Col>
                        {/* Form Column */}
                        <Col  className={`${LoginCss.loginInputs}`}>
                            <section>
                                {/* Welcome Message */}
                                <article>
                                    <h2>Welcome back</h2>
                                    <p>Login now to access your account.</p>
                                </article>
                                {/* Login Form */}
                                <Form>
                                    <Form.Control placeholder="Email Address" type="email"  className={`${LoginCss.inputs} shadow-none`} required/>
                                    <Form.Control placeholder="Password" type="password"  className={`${LoginCss.inputs} shadow-none`}  required/>
                                    {/* Remember me and Forgot password */}
                                    <Row className={`${LoginCss.Check}`}>
                                        <Col><Form.Check type="radio" label='Remember me' className={`${LoginCss.radioCheck} shadow-none`}/></Col>
                                        <Col  className="text-end"><a href="#">Forgot password</a></Col>
                                    </Row>
                                    {/* Login Button */}
                                    <Button className={`${LoginCss.LoginBtn}`}>Login</Button>
                                </Form>
                                {/* Sign Up link */}
                                <p className={`${LoginCss.alreadyHaveACC} text-center mt-2 mb-5`} >Don't have an account?<a href=""> Sign Up</a></p>
                                {/* Login with Google Button */}
                                <Button className={`${LoginCss.GoogleBtn} align-items-center py-2`}><img src={Google} alt="Google.com" className="px-3"/>Login with Google</Button>
                            </section>
                        </Col>
                    </Row>
                </section>
            </Container>
        </section>
    )
}
