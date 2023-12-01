import React, {useState} from 'react';
import { Form, Button, } from 'react-bootstrap';


import { registerStudent } from '../../utils/register/registerStudent';

const defaultStudentDetails = {
    'courseName':'',
    'course_code':'',
    'cohort':'',
}

// const Cohort = ()=>{
//     return
// }

export default function RegisterForm ({coursesArray, userProfile, uid}) {
    console.log(userProfile);
    
    const [studentDetails, setStudentDetails] = useState(defaultStudentDetails);
    const {courseName, course_code, cohort} = studentDetails;
    const { first_name, last_name, email} = userProfile;

    const handleChangeStudentDetails = (e)=>{
        const { name, value } = e.target;
        console.log(name, value);

        setStudentDetails({ ...studentDetails, [name]: value });
    }

    const handleSubmitStudentDetails = (e)=>{
        e.preventDefault();
        registerStudent(studentDetails, uid);
    }
  return (
    <Form className='register_form col-5' onSubmit={(e)=>handleSubmitStudentDetails(e)}>
    <Form.Group className="mb-3" controlId="first_name">
        <Form.Label className='register_form_label'>First Name</Form.Label>
        <Form.Control type="text" placeholder="Enter First Name" name = 'first_name' value = {first_name} disabled onChange = {(e)=>{
            handleChangeStudentDetails(e)
        }}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="last_name">
        <Form.Label className='register_form_label'>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Last Name"  name = 'last_name' value = {last_name} disabled onChange = {(e)=>{
            handleChangeStudentDetails(e)
        }}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className='register_form_label'>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  disabled name = 'email' value = {email} onChange = {(e)=>{
            handleChangeStudentDetails(e)
        }}/>
    </Form.Group>

    <Form.Select name = 'courseName' className = 'mb-3 register_form_label' onChange={(e)=>{handleChangeStudentDetails(e)}} value={courseName}>
        <option>Choose Course</option>
        {
            coursesArray.length > 0 ?
            coursesArray.map((course, index)=>{
                return (<option key={index} value={`${course.courseName}`}>{course.courseName}</option>)
            })
            :
           null
        }
    </Form.Select>

    <Form.Select name = 'course_code' className = 'mb-3 register_form_label' onChange={(e)=>{handleChangeStudentDetails(e)}}>
        <option>Choose Course Code</option>
        {
            coursesArray.length > 0 ?
            coursesArray.map((courseCohort, index)=>{
                if(courseCohort.courseName.includes(courseName)){
                    return (<option key={index} value={`${courseCohort.courseCode}`}>{courseCohort.courseCode}</option>)
                }

            })
            :
           null
        }
    </Form.Select>

    {
        courseName &&  
        <Form.Select
        name='cohort'
        className='mb-3 register_form_label'
        onChange={(e) => { handleChangeStudentDetails(e) }}
      >
        <option>Choose Cohort</option>
        {coursesArray.map((courseCohort, index) => {
          if (courseCohort.courseName.includes(courseName)) {
            return courseCohort.cohorts.map((cohort, cohortIndex) => (
              <option key={cohortIndex} value={cohort.cohort}>
                {cohort.cohort}
              </option>
            ));
          }
          return null; // Ensure to return something if the condition doesn't match
        })}
      </Form.Select>
    }

    <Button className='register_form_btn' variant="primary" type="submit">
        Register
    </Button>
</Form>
  )
}
