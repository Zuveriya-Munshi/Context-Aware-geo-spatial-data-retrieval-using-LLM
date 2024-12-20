'use client';

import React, { useState } from 'react';
import LoginPage from './login/page';
import ChatBotPage from './chatbot/page';

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <ChatBotPage />
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}
