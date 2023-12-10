import React,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Img from "./Img.png"
import logo from "./logo.png"
import { Button, Container, Form, Col, Row, Navbar} from "react-bootstrap";
import ForgettenPasswordCss from './forgettingPassword.module.css'

export default function ForgottenPassword() {
    const [email, setEmail]= useState('')

    const handleClick =() =>{
        console.log(email)
    }

    return(
        <section>
            <Navbar className={`${ForgettenPasswordCss.Navbar} `}>
                <Container className="justify-content-center">
                    <Navbar.Brand><img src={logo} alt="logo" className={`${ForgettenPasswordCss.logo}`}/></Navbar.Brand>
                </Container>
            </Navbar>
            <Container className={`${ForgettenPasswordCss.content} `}>
                <Row xl={2} lg={2} md={1} sm={1} xs={1}>
                    <Col className="text-center">
                        <img src={Img} alt="error-img-passsword" className="img-fluid"/>
                    </Col>
                    <Col className=" px-3">
                        <p  className="pt-5 pb-3"><b>Enter your E-mail address to reset your password.</b></p>
                        <Form className={`${ForgettenPasswordCss.form_col} px-3 py-5 rounded-4`}>
                            <Form.Group  className="mt-4 px-5">
                                <Form.Label><b>Email</b></Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    placeholder="www.name.gmail.com" 
                                    className="mb-3"
                                    onChange={(e)=>setEmail(e.target.value)}       
                                />
                            </Form.Group>                            
                            <div className="text-center">
                                <Button onClick={handleClick} className={`${ForgettenPasswordCss.button} btn btn-primary px-5 mt-5 rounded-5  `} >continue</Button>
                            </div>
                        </Form>
                        <div className="text-center pt-5">
                            <a href="#" className="text-dark"> I have remembered my password.</a>
                        </div>                        
                    </Col>
                </Row>
            </Container>
        </section>
    )
}