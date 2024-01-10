import { React, useContext, useEffect, useRef } from 'react'
import AuthContext from '../context/AuthenticationContext/auth.context';
import ChatTextAnimation from './ChatTextAnimation';

export default function Chat() {
  const { chatMessages} = useContext(AuthContext);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatMessages]);

  console.log(chatMessages)

  return (
    <div className="chats" ref={chatContainerRef}>
      {chatMessages.map((message, index) => (
        <div key={index} className={`chat-message ${message.type}`}>
          {message.type === 'chatbot' ? (
              <ChatTextAnimation chatResponse={message.text}/>
          ) : (
            <p className="user-message">{message.type} : {message.text}</p>
          )}
        </div>
      ))}
    </div>
  )
}
