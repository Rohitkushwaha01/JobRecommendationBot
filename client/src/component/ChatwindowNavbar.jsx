import {React, useContext} from 'react'
import AuthContext from '../context/AuthenticationContext/auth.context';
import { FaUser } from "react-icons/fa";


export default function ChatwindowNavbar() {
    const { currentUserName } = useContext(AuthContext);

    return (
        <nav className='chat-window-navbar'>
            <ul className=''>
                <li>DynamicBot 1.0</li>
                <li>{currentUserName} <FaUser/></li>
            </ul>
        </nav>
    )
}
