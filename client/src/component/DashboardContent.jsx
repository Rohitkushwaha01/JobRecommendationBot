import SideBar from './SideBar'
import ChatWindow from './ChatWindow'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

export default function DashboardContent() {
  // const [display, setDisplay] = useState(true);

  // const handleDisplay = () => {
  //   setDisplay(!display);
  // }

  return (
    <>
      <div className='dashboard-content'>
        <SideBar />
        <Outlet />
      </div>
    </>
  )
}
