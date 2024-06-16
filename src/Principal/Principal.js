import React from 'react'
import NavBar from '../NavBar/NavBar'
import ButtomBar from '../ButtomBar/ButtomBar'
// import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'

export default function Principal() {
  return (
    <div>
        <NavBar />
        <ButtomBar />
        {/* <SideBar /> */}
        <Outlet />
    </div>
    
  )
}
