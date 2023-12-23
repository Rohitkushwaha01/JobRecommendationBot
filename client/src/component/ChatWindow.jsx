import React from 'react'
import ChatwindowNavbar from './ChatwindowNavbar'
import ChatwindowForm from './ChatwindowForm'
import Chat from './Chat'

export default function ChatWindow() {
  return (
    <div className='chat-window'>
      <ChatwindowNavbar/>
      <Chat />
      <ChatwindowForm/>
    </div>
  )
}
