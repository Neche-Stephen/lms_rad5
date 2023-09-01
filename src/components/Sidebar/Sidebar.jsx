import React, { useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Sidebar({showOffcanvas, handleClose}) {
  return (
    <>

      <Offcanvas show={showOffcanvas} onHide={handleClose} responsive="lg">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Link to='/'>Analytics</Link>
            
            <Link to='/tutors'>Tutors</Link>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;


// const links = [
//     {
//         name : "Students",
//         clicked : true
//     },

//     {
//         name : "Courses",
//         clicked : false
//     }

// ]   

// <div>
//         {
//             links.map((link, index) =>{
//                 return <p key={index} onClick={()=>handleLinkClick(link)}>{link.name}</p>
//             })

//         }

//     </div>