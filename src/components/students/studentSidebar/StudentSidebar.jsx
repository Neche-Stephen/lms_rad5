import React from 'react';

import Sidebar from '../../general/Sidebar/Sidebar';
import { studentSidebarItems } from '../../../utils/sidebarItems/studentSideBarItems';

export default function StudentSidebar({showOffcanvas, handleClose, currentItem}) {

  return (
   <Sidebar SidebarItems = {studentSidebarItems} showOffcanvas = {showOffcanvas} handleClose = {handleClose} currentItem = {currentItem}/>
  )
}
