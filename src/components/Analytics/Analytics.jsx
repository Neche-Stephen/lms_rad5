import React, { useState, useEffect} from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';


export default function Analytics() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleShow = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);
    
  return (
        <>
        <Button variant="primary" onClick={handleShow} className="d-lg-none">
            Open Offcanvas
        </Button>
        <div>
            <Sidebar  showOffcanvas = {showOffcanvas} handleClose = {handleClose}/>
        </div>
         <div>Analytics</div>
        </>
  )
}
