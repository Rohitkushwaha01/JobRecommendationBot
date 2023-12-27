import React from 'react'
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { useState, useContext } from 'react';
import AuthContext from '../context/AuthenticationContext/auth.context';

export default function ChatwindowForm() {

    const [eachChat, setEachChat] = useState("")
    const { chatting } = useContext(AuthContext);

    const handleChat = (e) => {
        e.preventDefault();
        setEachChat(e.target.value)
        console.log(eachChat)
    }

    const handleSendChat = (e) => {
        e.preventDefault();
        if(eachChat == '' || eachChat == " "){
            return
        }
        setEachChat('');
        chatting(eachChat);
    };

    return (
        <form onSubmit={handleSendChat} className='chat-form'>
            <input type="text" placeholder='Message.....' onChange={handleChat} />
            <button className='btn'>
                <FaRegArrowAltCircleUp />
            </button>
        </form>
    )
}
