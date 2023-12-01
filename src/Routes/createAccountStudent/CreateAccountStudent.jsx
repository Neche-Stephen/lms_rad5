import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

import './CreateAccountStudent.css'

import LOGO from '../../assets/images/rad5.png';
import REGISTER from '../../assets/images/register.png';

import { signUpWithEmailAndPassword, firestore } from '../../utils/firebase.utils';

const defaultStudentDetails = {
    'first_name' : '',
    'last_name' : '',
    'email':'',
    'password': '',
}

function CreateAcountStudent() {
    const auth = getAuth();
    const [studentDetails, setStudentDetails] = useState(defaultStudentDetails);
    const {first_name, last_name, password, email} = studentDetails;

    const handleChangeStudentDetails = (e)=>{
        const { name, value } = e.target;
        console.log(name, value);

        setStudentDetails({ ...studentDetails, [name]: value });
    }

    const handleCreateAccount = async (e)=>{
        e.preventDefault();

        try {
            console.log('calling');
            const userCredential = await signUpWithEmailAndPassword(email, password);
            const user = userCredential.user;
            // Handle success, e.g., navigate, update state, etc.
            console.log('User signed in:', user);

            await setDoc(doc(firestore, 'students', user.uid), {
                first_name: first_name,
                last_name: last_name,
                active: false
                // Add more fields as needed
              });

              console.log('User profile created successfully in Firestore');
    
            // navigate('/admin/analytics');
       
          } catch (error) {
            // Handle error, e.g., show an error message, update state, etc.
            console.error('Sign-in error:', error);
            // You can switch on error.code if needed
          }
    }

   

  return (
    <Container fluid>
        {/* header */}
        <Row className='create_account_first_row justify-content-center align-items-center'>
            <Col xs = 'auto'><img src={LOGO} alt="" /></Col>
        </Row>
        <Row className='mt-3 justify-content-end'>
            <Col xs = 'auto'>
               <div className='d-flex create_account_create_account_text_div ' style={{gap:'30px'}}>
                    <hr />
                    <p className='create_account_create_account_text'>Create Account</p>
                    <hr/>
               </div>
            </Col>
        </Row>
        <Row className='mt-2 mb-5 justify-content-center align-items-stretch' style={{gap:"30px"}}>
            {/* <Col xs = '4'> */}
                <img className='col-4 create_account_img' src={REGISTER} alt="" />
            {/* </Col> */}
            {/* <Col xs = '5'> */}
            <Form className='create_account_form col-5' onSubmit={(e)=>handleCreateAccount(e)}>
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
                    <Form.Label className='create_account_form_label'>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"  name = 'email' value = {email} onChange = {(e)=>{
                        handleChangeStudentDetails(e)
                    }}/>
                </Form.Group>

                
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='register_form_label'>Create Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"  name = 'password' value = {password} onChange = {(e)=>{
                        handleChangeStudentDetails(e)
                    }}/>
                </Form.Group>

                <Button className='create_account_form_btn' variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {/* </Col> */}
        </Row>
    </Container>
  );
}


export default CreateAcountStudent;