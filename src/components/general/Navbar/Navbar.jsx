import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RAD5_LOGO from '../../../assets/images/rad5.png';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Navbar.css'

export default function Navbar({handleShow}) {
  return (
    <Container fluid className='navba'>
        <Row className=''>
            <Col xs = '2' >
                <img src={RAD5_LOGO} alt="RAD5_LOGO" className='img-fluid' />
            </Col>
            <i className="col-auto bi bi-menu-button-wide d-lg-none navba-ash" onClick={handleShow}></i>
            <Col className='navba-ash'><h1>RAD5 ACADEMY</h1></Col>
            
        </Row>
    </Container>
  )
}
