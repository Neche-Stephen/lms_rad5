import React from 'react';
import { Fragment, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { addCourse } from '../../../store/courses/courses.actions';
import Navbar from '../../../components/general/Navbar/Navbar';
import Sidebar from '../../../components/general/Sidebar/Sidebar';

export default function Courses() {
  const dispatch = useDispatch();
  const handleAddCourse = ()=> {
    dispatch(addCourse(
      { 
        abc : {course_name  : 'abc'}
      }
  ))
  }
  const handleAddAnotherCourse = ()=> {
    dispatch(addCourse(
      { 
        xyz : {course_name  : 'xyz'}
      }
  ))
}
  const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleShow = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);
  return (
    <Fragment>
        <Navbar handleShow={handleShow} />
        <Container fluid>
          <Row>
          <Col className='d-none d-lg-block p-0' style = {{backgroundColor:'#3936BC', height:'100vh'}} xs = '2'>
                <Sidebar  showOffcanvas = {showOffcanvas} handleClose = {handleClose}/>
          </Col>
            <Col>
            <button onClick={handleAddCourse}>Add course</button>
            <button onClick={handleAddAnotherCourse}>Add course</button>

            </Col>
          </Row>
        </Container>
    </Fragment>
  )
}
