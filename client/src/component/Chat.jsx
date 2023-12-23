import { React, useContext, useEffect, useRef } from 'react'
import AuthContext from '../context/AuthenticationContext/auth.context';

export default function Chat() {
  const { chat } = useContext(AuthContext);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chat]);

  return (
    <div className="chats" ref={chatContainerRef}>
      {chat.map((message, index) => (
        <div key={index}>You: {message.text}</div>
      ))}
    </div>
  )
}
