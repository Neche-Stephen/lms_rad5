import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Row, Col, Navbar } from "react-bootstrap";
import Rad5logo from '../../assets/images/Rad5 1.svg'; // Importing Rad5 logo image
import Google from '../../assets/images/google.svg'; // Importing Google logo image
import SignInCss from './signUp.module.css'; // Importing CSS module for styling

export default function SignIn() {
    
    return(
        <section>
            <Container>
                {/* Navbar with Rad5 logo */}
                <Navbar>
                    <Navbar.Brand><img src={Rad5logo} alt="Rad5 logo"/></Navbar.Brand>
                </Navbar>
                {/* Row containing sign-up form */}
                <Row lg={2} md={1} sm={1} xs={1} className={`${SignInCss.myforminputs} mt-4 mb-5 px-0 mx-0`}>
                    {/* Column for sign-up image */}
                    <Col className={`${SignInCss.signInImg}`}>       
                    </Col>
                    {/* Column for sign-up form */}
                    <Col>
                       <section>
                            {/* Article containing sign-up heading and description */}
                            <article className="text-center">
                                <h2>Welcome to RAD5</h2>
                                <p>Sign up now to create your account.</p>
                            </article>
                            {/* Form for sign-up */}
                            <Form>
                                <Form.Control placeholder="Full Name" type="text" className={`${SignInCss.inputs} shadow-none`} required/>
                                <Form.Control placeholder="Email Address" type="email" className={`${SignInCss.inputs} shadow-none`} required/>
                                <Form.Control placeholder="Password" type="password" className={`${SignInCss.inputs} shadow-none`} required/>
                                <Form.Control placeholder="Confirm Password" type="password" className={`${SignInCss.inputs} shadow-none`} required/>
                                <Button className={`${SignInCss.NextBtn}`} type="submit"> Next</Button>
                            </Form>
                            {/* Link to login page for existing users */}
                            <p className={`${SignInCss.alreadyHaveACC} text-center my-4`} >Already have an account?<a href=""> Log In</a></p>
                            {/* Button for sign-up with Google */}
                            <Button className={`${SignInCss.GoogleBtn} align-items-center py-2`}><img src={Google} alt="Google.com" className="px-3"/>Sign up with Google</Button>
                       </section>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
