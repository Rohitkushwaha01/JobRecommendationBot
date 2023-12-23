import { React, useState, useContext } from 'react'
import { jwtDecode } from 'jwt-decode'
import { FaUser } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { AiOutlineForm } from "react-icons/ai";
import { BsRobot } from "react-icons/bs";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthenticationContext/auth.context';

export default function SideBar() {
  const {setAuthenticated} = useContext(AuthContext);

  const {handleLogout} = useContext(AuthContext)

  let userName = ""

  if(localStorage.getItem('token')){
    userName = jwtDecode(localStorage.getItem('token')).user.name
  }

  const [activeLink, setActiveLink] = useState("chat")
  const handleActive = (link) => {
    setActiveLink(link);
  }

  return (
    <div className='side-bar'>
      <h3 className='align'>Recommendation Bot <BsRobot/></h3>
      <div className="no-of-chats">

      </div>
      <div className='user-info'>
        <Link to='chatwindow' ><p className={`user-info-link ${activeLink === 'chat' ? 'user-info-active' : ''}`} onClick={() => handleActive('chat')}> <IoChatboxEllipsesOutline /> Chat</p></Link>

        <Link to='job-data' > <p className={`user-info-link ${activeLink === 'job-data' ? 'user-info-active' : ''}`} onClick={() => handleActive('job-data')}><AiOutlineForm /> Job Form</p></Link>

        <Link to='curr-user-info' ><p className={`user-info-link ${activeLink === 'current-user' ? 'user-info-active' : ''}`} onClick={() => handleActive('user')}> <FaUser /> {userName}</p></Link>

        <Link to='/' ><p className={`user-info-link ${activeLink === 'current-user' ? 'user-info-active' : ''}`} onClick={handleLogout}> <IoIosLogOut /> Logout</p></Link>
      </div>
    </div>
  )
}