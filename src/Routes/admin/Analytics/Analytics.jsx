import React, { useState, useEffect} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Fragment } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';


import './Analytics.css';
import Navbar from '../../../components/general/Navbar/Navbar';
import Sidebar from '../../../components/general/Sidebar/Sidebar';

export default function Analytics() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleShow = () => setShowOffcanvas(true);
  const handleClose = () => setShowOffcanvas(false);
  return (
    <Fragment>
      <Navbar handleShow={handleShow}/>
       <Container fluid>
          <Row>
          <Col className='d-none d-lg-block p-0' style = {{backgroundColor:'#3936BC', height:'100vh'}} xs = '2'>
                <Sidebar  showOffcanvas = {showOffcanvas} handleClose = {handleClose} currentItem='Analytics'/>
          </Col>
            <Col  lg = '10'>
            <Row className='analytics_widget_one p-3 mx-2 mt-4 mb-5 justify-content-between'>
            <Col xs = '5' lg = '3' className='analytics_staff py-3'>
                <Row className='justify-content-center mb-3'>8</Row>   
                <Row className='justify-content-center'>NUMBER OF STAFF</Row>  
            </Col>
            <Col xs = '5' lg = '3' className='analytics_active py-3'>
                <Row className='justify-content-center mb-3'>175</Row>   
                <Row className='justify-content-center'>AVAILABLE / ACTIVE STUDENTS</Row>  
            </Col>
            <Col xs = '5' lg = '3' className='analytics_graduate py-3 mt-4'>
                <Row className='justify-content-center mb-3'>496</Row>   
                <Row className='justify-content-center'>GRADUATED STUDENTS</Row>  
            </Col>
            </Row>
        {/* <Row className='analytics_widget_two mx-2 justify-content-between'>
          <div className='analytics_widget_two_col px-4 pt-1 pb-4'>
              <Row>Current Bootcamp Info</Row>
              <Row className='analytics_current'>
                  <Col>
                  <form>
                        <label htmlFor="bootcamp_course">Course</label>
                        <select name="" id="bootcamp_course" className='form-select'>
                          <option value="">Front-end</option>
                          <option value="">UI/UX Design</option>
                        </select>
                        <label htmlFor="bootcamp_year">Update Bootcamp Year</label>
                        <select name="" id="bootcamp_year" className='form-select'>
                          <option value="">2023</option>
                          <option value="">2022</option>
                        </select>

                        <label htmlFor="bootcamp_batch">Update Bootcamp Batch</label>
                        <select name="" id="bootcamp_batch" className='form-select'>
                          <option value="A">A</option>
                          <option value="B">B</option>
                        </select>

                        <Row className='justify-content-center mt-4 mb-5'>
                          <Col xs = 'auto'><Button className='bootcamp_btn px-5' disabled>View Info</Button></Col>
                        </Row>
                    </form>
                  </Col>
              </Row>
          </div>
          
          <div className='analytics_widget_two_col pb-4 px-4 pt-1'>
              <Row>Current Bootcamp Info</Row>
              <Row className='analytics_current'>
                  <Col>
                  <form>
                        <label htmlFor="bootcamp_course">Course</label>
                        <select name="" id="bootcamp_course" className='form-select'>
                          <option value="">Front-end</option>
                          <option value="">UI/UX Design</option>
                        </select>
                        <label htmlFor="bootcamp_year">Update Bootcamp Year</label>
                        <select name="" id="bootcamp_year" className='form-select'>
                          <option value="">2023</option>
                          <option value="">2022</option>
                        </select>

                        <label htmlFor="bootcamp_batch">Update Bootcamp Batch</label>
                        <select name="" id="bootcamp_batch" className='form-select'>
                          <option value="A">A</option>
                          <option value="B">B</option>
                        </select>

                        <Row className='justify-content-center mt-4'>
                          <Col xs = 'auto'><Button className='bootcamp_btn px-5' disabled>View Info</Button></Col>
                        </Row>
                    </form>
                  </Col>
              </Row>
          </div>
        </Row> */}
            </Col>
          </Row>
       </Container>
    </Fragment>
  )
}
