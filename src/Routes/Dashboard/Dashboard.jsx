import React, { useState, useEffect} from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './Dashboard.css';

//Side bar Items
import Analytics from '../../components/Analytics/Analytics';

export default function Dashboard() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleShow = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);
    
  return (
    <>
      <Container fluid className='dashboard'>
        <Row>
          <Col className='d-none d-lg-block p-0' style = {{backgroundColor:'#3936BC', height:'100vh'}} xs = '2'>
                <Sidebar  showOffcanvas = {showOffcanvas} handleClose = {handleClose}/>
          </Col>
          <Col  className='' xs = '12' lg = '10'>
              <Row className='justify-content-center align-items-center navba-ash'>
                <i className="col-auto bi bi-menu-button-wide d-lg-none" onClick={handleShow}></i>
                <Col xs = 'auto' className=''><h1>RAD5 ACADEMY</h1></Col>
              </Row>
              <Analytics />
              
          </Col>
        </Row>
      </Container>
    </>
  )
}
