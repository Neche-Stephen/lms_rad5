import React from 'react';
import Sidebar from '../../general/Sidebar/Sidebar';
import { adminSidebarItems } from '../../../utils/sidebarItems/adminSideBarItems';

export default function AdminSidebar({showOffcanvas, handleClose, currentItem}) {
  
  return (
   <Sidebar SidebarItems = {adminSidebarItems} showOffcanvas = {showOffcanvas} handleClose = {handleClose} currentItem = {currentItem}/>
  )
}
