import React, {useState} from 'react';
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoIosAddCircleOutline } from 'react-icons/io'
import { Tooltip } from 'react-tooltip';

import Navbar from '../../../components/general/Navbar/Navbar';
import AdminSidebar from '../../../components/admin/adminSideBar/AdminSidebar';
import AddCohortModal from '../../../components/admin/addCohortModal/AddCohortModal';

import LOGO from '../../../assets/images/rad5.png'



export default function Cohorts() {

    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleShow = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);

    const [showAddCohortModal, setShowAddCohortModal] = useState(false);
    const handleCloseAddCohortModal = () => setShowAddCohortModal(false);
    const handleShowAddCohortModal = () => setShowAddCohortModal(true);

  return (
    <>
         <Navbar handleShow={handleShow} />
         <Container fluid>
            <Row>
                <AdminSidebar  showOffcanvas = {showOffcanvas} handleClose = {handleClose} currentItem='Cohorts'/>
                <Col>
                    <Row className='mt-5 align-items-stretch student_course_row'>
                            <Col xs = '10' md = '4' lg = '3'>
                                <button onClick={handleShowAddCohortModal}>
                                    <IoIosAddCircleOutline 
                                    data-tooltip-id="add_cohort_tip"
                                    data-tooltip-content="Add new cohort"
                                    style={{fontSize:'4em', cursor:'pointer'}}/>
                                </button>
                                <Tooltip id="add_cohort_tip" />
                                <Modal show={showAddCohortModal} onHide={handleCloseAddCohortModal}>
                                    <AddCohortModal handleCloseAddCohortModal = {handleCloseAddCohortModal}/>
                                </Modal>
                            </Col>

                    </Row>
                </Col>
            </Row>
         </Container>
    </>
  )
}
