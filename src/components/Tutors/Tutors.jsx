import React, { useState, useEffect} from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';

export default function Tutors() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleShow = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);
    useEffect(()=>{
      handleShow()
    }, [])
    
  return (
        <>
        <Button variant="primary" onClick={handleShow} className="d-lg-none">
            Open Offcanvas
        </Button>
        <div>
            <Sidebar  showOffcanvas = {showOffcanvas} handleClose = {handleClose}/>
        </div>
         <div>Tutors</div>
        </>
  )
}
