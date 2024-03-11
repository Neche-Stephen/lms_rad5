import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Row, Col, Navbar,  } from "react-bootstrap";
import Rad5logo from '../../assets/images/Rad5 1.svg';
import Google from '../../assets/images/google.svg'
import SignInCss from './signUp.module.css';


export default function SignIn() {
    
    return(
        <section>
            <Container>
                <Navbar>
                    <Navbar.Brand><img src={Rad5logo} alt="Rad5 logo"/></Navbar.Brand>
                </Navbar>
                <Row  lg={2} md={1} sm={1} xs={1} className={`${SignInCss.myforminputs} mt-4 mb-5 px-0 mx-0`}>
                    <Col className={`${SignInCss.signInImg}`}>       
                    </Col>
                    <Col >
                       <section>
                            <article  className="text-center">
                                <h2>Welcome to RAD5</h2>
                                <p>Sign up now to create your account.</p>
                            </article>
                            <Form>
                                <Form.Control placeholder="Full Name" type="text" className={`${SignInCss.inputs} shadow-none`}/>
                                <Form.Control placeholder="Email Address" type="email" className={`${SignInCss.inputs} shadow-none`}/>
                                <Form.Control placeholder="Password" type="password" className={`${SignInCss.inputs} shadow-none`}/>
                                <Form.Control placeholder="Confirm Password" type="password" className={`${SignInCss.inputs} shadow-none`}/>
                                <Button className={`${SignInCss.NextBtn}`} type="submit"> Next</Button>
                            </Form>
                            <p className={`${SignInCss.alreadyHaveACC} text-center my-4`} >Already have an account?<a href=""> Log In</a></p>
                            <Button className={`${SignInCss.GoogleBtn} align-items-center py-2`}><img src={Google} alt="Google.com" className="px-3"/>Sign up with Google</Button>
                       </section>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}