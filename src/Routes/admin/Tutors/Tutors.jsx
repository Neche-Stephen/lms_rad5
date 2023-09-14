import React, { useState, useEffect} from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import Sidebar from '../../../components/Sidebar/Sidebar';

export default function Tutors() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleShow = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);
    useEffect(()=>{
      handleShow()
    }, [])
    
  return (
        <>
         <div>Tutors</div>
        </>
  )
}
