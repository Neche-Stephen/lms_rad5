import React, {useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import LOGO from '../../../../assets/images/rad5.png'

import Navbar from '../../../../components/general/Navbar/Navbar';
import AdminSidebar from '../../../../components/admin/adminSideBar/AdminSidebar';

import AddStudentModal from '../../../../components/admin/addStudentModal/AddStudentModal';

export default function CourseStudents() {

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleShow = () => setShowOffcanvas(true);
  const handleClose = () => setShowOffcanvas(false);

  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const handleCloseAddStudentModal = () => setShowAddStudentModal(false);
  const handleShowAddStudentModal = () => setShowAddStudentModal(true);


  return (
   <> 
    <Navbar handleShow={handleShow} />
    <Container fluid>
      <Row>
        <AdminSidebar  showOffcanvas = {showOffcanvas} handleClose = {handleClose} currentItem='Students'/>
        <Col >
          <Row className='mt-5'>
              <Col xs = '4'>
                <Card>
                  <Card.Img variant="top" src={LOGO} />
                  <Card.Body>
                    <Card.Title>Front End Students</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Card.Link href="#"><Button onClick={handleShowAddStudentModal}>Add Student</Button></Card.Link>
                      {/* Add Student Modal */}
                      <Modal show={showAddStudentModal} onHide={handleCloseAddStudentModal}>
                          <AddStudentModal  handleCloseAddStudentModal = {handleCloseAddStudentModal}/>
                      </Modal>
                    {/* <Card.Link href="#">Another Link</Card.Link> */}
                  </Card.Body>


                </Card>
              </Col>
          </Row>
        </Col>
      </Row>
    </Container>
   </>
  )
}
