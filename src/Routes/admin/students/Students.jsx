import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Navbar from '../../../components/general/Navbar/Navbar';
import AdminSidebar from '../../../components/admin/adminSideBar/AdminSidebar';

import './Students.css'
import LOGO from '../../../assets/images/rad5.png'

export default function Students() {

    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleShow = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);

  return (
    <>
         <Navbar handleShow={handleShow} />
         <Container fluid>
            <Row>
                <AdminSidebar  showOffcanvas = {showOffcanvas} handleClose = {handleClose} currentItem='Students'/>
                <Col>
                    <Row className='mt-5 align-items-stretch student_course_row'>
                        {/* <div className='student_courses'> */}
                            <Card className='student_courses'>
                                <Card.Img variant="top" src={LOGO} />
                                <Card.Body>
                                    <Card.Title >Front End Students</Card.Title>
                                    <Link to = {`/admin/students/${"Front End Students"}`}><Button variant="primary">View Students</Button></Link>
                                </Card.Body>
                            </Card>
                        {/* </div> */}

                        {/* <div className='student_courses'> */}
                            <Card className='student_courses'>
                                <Card.Img variant="top" src={LOGO} />
                                <Card.Body>
                                    <Card.Title >Digital Marketing Students</Card.Title>
                                    <Button variant="primary">View Students</Button>
                                </Card.Body>
                            </Card>
                        {/* </div> */}

                        {/* <div className='student_courses'> */}
                            <Card className='student_courses'>
                                <Card.Img variant="top" src={LOGO} />
                                <Card.Body>
                                    <Card.Title >Python Students</Card.Title>
                                    <Button variant="primary">View Students</Button>
                                </Card.Body>
                            </Card>
                        {/* </div> */}
                    </Row>
                </Col>
            </Row>
         </Container>
    </>
  )
}
