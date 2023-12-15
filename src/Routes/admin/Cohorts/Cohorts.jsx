import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoIosAddCircleOutline } from 'react-icons/io'
import { Tooltip } from 'react-tooltip';
import { getDocs , collection, query, orderBy, onSnapshot } from 'firebase/firestore';


import { firestore } from '../../../utils/firebase.utils';
import Navbar from '../../../components/general/Navbar/Navbar';
import AdminSidebar from '../../../components/admin/adminSideBar/AdminSidebar';
import AddCohortModal from '../../../components/admin/addCohortModal/AddCohortModal';
import AdminCohortCard from '../../../components/admin/adminCohortCard/adminCohortCard';

import LOGO from '../../../assets/images/rad5.png'



export default function Cohorts() {

    // State and functions for the offcanvas
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleShow = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);

    // State and functions for the modal
    const [showAddCohortModal, setShowAddCohortModal] = useState(false);
    const handleCloseAddCohortModal = () => setShowAddCohortModal(false);
    const handleShowAddCohortModal = () => setShowAddCohortModal(true);

    // State for cohort groups
    const [cohortGroups, setCohortGroups] = useState([])


    const fetchCohorts = async() => {
        const cohortCollectionRef = collection(firestore, 'cohorts');
        const orderByTimestamp = orderBy('created_at');
        const q = query(cohortCollectionRef, orderByTimestamp);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newCohortGroups = []; // Array to store cohort groups when fetched
            querySnapshot.forEach((doc) => {
                const cohortGroupDocumentData = doc.data();
                newCohortGroups.push(cohortGroupDocumentData);
            })
            setCohortGroups(newCohortGroups);
        }, 
        (error) => {
            // Handle errors here
            console.error('Error fetching data:', error);
          }
        );
    }

    useEffect(()=>{
        fetchCohorts();
    }, [])

  return (
    <>
         <Navbar handleShow={handleShow} />
         <Container fluid>
            <Row>
                <AdminSidebar  showOffcanvas = {showOffcanvas} handleClose = {handleClose} currentItem='Cohorts'/>
                <Col>
                    <Row className='mt-5 align-items-stretch student_course_row'>
                        {
                            cohortGroups.map((cohortGroup, index) => {
                                return (
                                    <Col xs = '10' md = '4' lg = '3'>
                                        <AdminCohortCard key={index} cohortGroup = {cohortGroup}/>
                                    </Col>
                                )
                            })
                        }
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
