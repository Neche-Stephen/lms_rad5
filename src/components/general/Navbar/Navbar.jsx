import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RAD5_LOGO from '../../../assets/images/rad5.png';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Navbar.css'

export default function Navbar({handleShow}) {
  return (
    <Container fluid className='navba'>
        <Row className='' style={{alignItems: 'stretch'}}>
          <Col xs = '4' sm = '2' className = 'navba_logo'>
              <img src={RAD5_LOGO} alt="RAD5_LOGO" className='img-fluid' />
          </Col>
          <Col xs = '3' className=' d-lg-none navba-icon position-relative' onClick={handleShow}>
            <i className="bi bi-menu-button-wide position-absolute" style={{top:'25%'}} ></i>
          </Col>
          <Col xs = '5' sm ='7' lg = '10' className='navba-ash'>
            <h1 className='mx-auto w-100 w-sm-75 d-none d-sm-block'>RAD5 ACADEMY</h1>
            </Col>
            
        </Row>
    </Container>
  )
}
