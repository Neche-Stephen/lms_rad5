import React, { useState } from 'react';
import { Offcanvas, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import './sidebar.css'


import RAD5_LOGO from './images/rad5.png';
import { sidebarItems as defaultSidebarItems  } from '../../../utils/sidebarItems.utils';

function Sidebar({showOffcanvas, handleClose}) {
  const [sidebarItems, setSidebarItems] = useState(defaultSidebarItems);

  const handleSideItemClick = (e, sidebarItemClicked) =>{
        e.preventDefault();
        const updatedSidebarItems = sidebarItems.map(sidebarItem =>{
          return {...sidebarItem, clicked:sidebarItemClicked === sidebarItem}
        })

        if (sidebarItemClicked.hasChildren){ //resetting all the children to be !clicked
          const newUpdatedSidebarItems = updatedSidebarItems.map(sidebarItem =>{
            if (sidebarItem.hasChildren === true){
             return {...sidebarItem, children:sidebarItem.children.map(child => { return {...child, childClicked : false}} )}
            }
            else{
              return sidebarItem
            }
          })
          setSidebarItems(newUpdatedSidebarItems);
          return;
        }
       else {
        setSidebarItems(updatedSidebarItems);
       }
  }

  const handleSideBarItemChildClick = (childrenItemClicked, childItemClicked) => {
    const updatedSidebarItems = sidebarItems.map(sidebarItem =>{
      if (sidebarItem.children === childrenItemClicked){
       return {...sidebarItem, children:childrenItemClicked.map(child => { return {...child, childClicked : childItemClicked === child}} )}
      }
      else{
        return sidebarItem
      }
    })
    setSidebarItems(updatedSidebarItems)
  }

  const resetChildren = () => {

  }
  return (
    <>
    <Offcanvas className='offcanvas-div' show={showOffcanvas} onHide={handleClose} responsive="lg">
      <Offcanvas.Body className='p-0'>
        <Container fluid className='p-0'>
          <Row className='admin-row p-0 justify-content-center m-0 mb-4 '>
            <Col xs = '12'>
              <i className="bi bi-person-check-fill ms-2"></i>
              <h4>ADMIN</h4>
            </Col>
          </Row>
          {
              sidebarItems.map((sidebarItem, index)=>{
                if (sidebarItem.hasChildren === true){
                  return (
                    <Row  key={index} type="button" disabled = {sidebarItem.clicked} role="button"
                    className='justify-content-center  align-items-center m-0' 
                   >
                      <Col className = 'p-0' xs = '12'>
                        <button className='row justify-content-center m-0 mb-1 sidebar-row align-items-center'
                        onClick={(e) => handleSideItemClick(e, sidebarItem)}
                         style={{
                          backgroundColor : sidebarItem.clicked ? '#AAAAAA':'#D0FFBF',
                          color:sidebarItem.clicked ? '#FFF':'#3936BC',
                          }}
                        >
                            <Col className='p-0'  xs ='auto'>
                              {sidebarItem.name}
                            </Col>
                        </button>

                        {/* Sidebar Children */}
                        {
                        sidebarItem.clicked && sidebarItem.children.map((child, index, children) => {
                          return(
                            <button key = {index}
                            className='row mb-1 sidebar-row-children justify-content-center'
                            onClick={() => handleSideBarItemChildClick(children, child )}
                            style={{
                              backgroundColor : child.childClicked ? '#AAAAAA':'#FF9A9A',
                              color:child.childClicked.clicked ? '#FFF':'#2A2A2A',
                              }}>
                              <Col xs = '10'>
                                {child.childName}
                              </Col>
                            </button>
                          )
                        })
                      }
                      </Col>
                     
                    </Row>
                
                  )
                }
                else {
                  return (
                    <button  
                    onClick={(e) => {handleSideItemClick(e, sidebarItem)}}
                    to='/'
                    key={index} type="button" disabled = {sidebarItem.clicked} role="button"
                    className='row justify-content-center  m-0 mb-1 sidebar-row align-items-center' 
                    style={
                      {
                        backgroundColor : sidebarItem.clicked ? '#AAAAAA':'#D0FFBF',
                        color:sidebarItem.clicked ? '#FFF':'#3936BC',
                    }}>
                      <Col className = 'p-0' xs = 'auto'>
                        {sidebarItem.name}
                    </Col>
                    </button>
                  )
                }
              })
            }

        </Container>
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