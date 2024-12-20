// src/components/Home.js
"use client";

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import styles from './home.module.css';

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleChatClick = () => {
    setIsChatOpen(true);
  };

  const handleNewChatClick = () => {
    // Implement logic for new chat if needed
    // For example, reset messages:
    setMessages([]);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, sender: 'user' }]);
    // Implement additional logic to handle bot responses if needed
  };

  return (
    <div className={styles.container}>
      <Sidebar onNewChatClick={handleNewChatClick} />
      <div className={styles.main}>
        {(
          <ChatWindow
            messages={messages}
            onCloseChat={handleCloseChat}
            onSendMessage={handleSendMessage}
          />
        ) }
      </div>
    </div>
  );
};

export default Home;
