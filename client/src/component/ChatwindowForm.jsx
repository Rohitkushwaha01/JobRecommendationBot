import React from 'react';
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { useState, useContext } from 'react';
import AuthContext from '../context/AuthenticationContext/auth.context';

export default function ChatwindowForm() {

    const [eachChat, setEachChat] = useState("");
    const { chatting, setChatMessages } = useContext(AuthContext);

    const handleChat = (e) => {
        setEachChat(e.target.value);
    }

    const handleClearText = () => {
        setEachChat("");
    }

    const handleSendChat = (e) => {
        e.preventDefault();
        if (eachChat.trim() === '') {
            return;
        }

        setChatMessages(prevMessages => [
            ...prevMessages,
            { type: 'user', text: eachChat }
        ]);

        chatting(eachChat);
        setEachChat('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendChat(e);
        }
    }

    return (
        <form onSubmit={handleSendChat} className='chat-form'>
            <input
                type="text"
                placeholder='Message.....'
                value={eachChat}
                onChange={handleChat}
                onKeyDown={handleKeyDown}
            />
            <button className='btn' onClick={handleSendChat}>
                <FaRegArrowAltCircleUp />
            </button>
        </form>
    )
}
