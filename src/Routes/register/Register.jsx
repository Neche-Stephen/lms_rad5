import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

import './Register.css'
import LOGO from '../../assets/images/rad5.png';
import REGISTER from '../../assets/images/register.png';



import { addStudentToCohort } from '../../utils/register/register';

const defaultStudentDetails = {
    'first_name' : '',
    'last_name' : '',
    'email':'',
    'course':'',
    'course_code':'',
    'cohort':'',
}

function Register() {
    const [studentDetails, setStudentDetails] = useState(defaultStudentDetails);
    const {first_name, last_name, email} = studentDetails;

    const handleChangeStudentDetails = (e)=>{
        const { name, value } = e.target;
        console.log(name, value);

        setStudentDetails({ ...studentDetails, [name]: value });
    }

    const handleSubmitStudentDetails = (e)=>{
        e.preventDefault();
        addStudentToCohort(studentDetails);
    }

   

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
            {/* <Col xs = '4'> */}
                <img className='col-4 register_img' src={REGISTER} alt="" />
            {/* </Col> */}
            {/* <Col xs = '5'> */}
            <Form className='register_form col-5' onSubmit={(e)=>handleSubmitStudentDetails(e)}>
                <Form.Group className="mb-3" controlId="first_name">
                    <Form.Label className='register_form_label'>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter First Name" name = 'first_name' value = {first_name} onChange = {(e)=>{
                        handleChangeStudentDetails(e)
                    }}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="last_name">
                    <Form.Label className='register_form_label'>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Last Name"  name = 'last_name' value = {last_name} onChange = {(e)=>{
                        handleChangeStudentDetails(e)
                    }}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='register_form_label'>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"  name = 'email' value = {email} onChange = {(e)=>{
                        handleChangeStudentDetails(e)
                    }}/>
                </Form.Group>

                <Form.Select name = 'course' className = 'mb-3 register_form_label' onChange={(e)=>{handleChangeStudentDetails(e)}}>
                    <option>Choose Course</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Backend">Backend</option>
                </Form.Select>

                <Form.Select name = 'course_code' className = 'mb-3 register_form_label' onChange={(e)=>{handleChangeStudentDetails(e)}}>
                    <option>Choose Course Code</option>
                    <option value="FE">FE - Frontend</option>
                    <option value="DM">DM - Digital Marketing</option>
                    <option value="BE">BE - Backend</option>
                </Form.Select>

                
                <Form.Select name = 'cohort' className = 'mb-3 register_form_label' onChange={(e)=>{handleChangeStudentDetails(e)}}>
                    <option>Choose Cohort</option>
                    <option value="2024-A">2024-A</option>
                    <option value="2024-B">2024-B</option>
                </Form.Select>

                <Button className='register_form_btn' variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            {/* </Col> */}
        </Row>
    </Container>
  );
}


export default Register;