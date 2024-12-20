// components/ChatBotPage.js

"use client";

import React, { useState } from "react";
import ChatWindow from "../../components/ChatWindow";
import Sidebar from "../../components/Sidebar";
import styles from "../../components/ChatWindow.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

export default function ChatBotPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [sliderValue, setSliderValue] = useState(50);

  const handleNewChatClick = () => {
    setMessages([]); // Clear messages to start a new chat
  };

  const handleChatClick = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };
  // const handleSendMessage = async (message) => {
  //   setMessages([...messages, { text: message, sender: "user" }]);
  //   const enrichedMessage = `${message} (Latitude: ${latitude}, Longitude: ${longitude})`;

  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/ask", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         question: enrichedMessage,
  //         // user_ip: "03.240.207.188",
  //         // latitude: latitude,
  //         // longitude: longitude,
  //       }),
  //     });

  //     try {
  //       const data = await response.json();
  //       console.log("Parsed response:", data);
  //       if (response.ok) {
  //         const botMessage = data.result
  //         ? data.result
  //           : "No response from server.";
  //         setMessages((prevMessages) => [
  //           ...prevMessages,
  //           { text: botMessage, sender: "bot" },
  //         ]);
  //       } else {
  //         setMessages((prevMessages) => [
  //           ...prevMessages,
  //           {
  //             text: data.error || "Error occurred while fetching data.",
  //             sender: "bot",
  //           },
  //         ]);
  //       }
  //     } catch (error) {
  //       console.error("Error parsing response:", error);
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         {
  //           text: "Error occurred while communicating with the server.",
  //           sender: "bot",
  //         },
  //       ]);
  //     }
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { text: "Error occurred while sending the request.", sender: "bot" },
  //     ]);
  //   }
  // };
  // const handleSendMessage = async (message) => {
  //   const enrichedMessage = `${message} (Latitude: ${latitude}, Longitude: ${longitude})`;

  //   setMessages([...messages, { text: message, sender: "user" }]);

  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/ask", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         question: message,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       const botMessage = data.answer || "No response from server.";
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { text: botMessage, sender: "bot" },
  //       ]);
  //     } else {
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         {
  //           text: data.error || "Error occurred while fetching data.",
  //           sender: "bot",
  //         },
  //       ]);
  //     }
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { text: "Error occurred while sending the request.", sender: "bot" },
  //     ]);
  //   }
  // };
  const handleSendMessage = async (message) => {
    const enrichedMessage = `${message} (Latitude: ${latitude}, Longitude: ${longitude})`;

    // Add user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "user" },
    ]);

    // Add "Thinking..." placeholder message
    const thinkingMessageId = `thinking-${Date.now()}`;
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: thinkingMessageId, text: "Thinking...", sender: "bot" },
    ]);

    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: message,
        }),
      });

      const data = await response.json();

      // Update with actual bot response
      if (response.ok) {
        const botMessage = data.answer || "No response from server.";
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === thinkingMessageId ? { ...msg, text: botMessage } : msg
          )
        );
      } else {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === thinkingMessageId
              ? {
                  ...msg,
                  text: data.error || "Error occurred while fetching data.",
                }
              : msg
          )
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === thinkingMessageId
            ? { ...msg, text: "Error occurred while sending the request." }
            : msg
        )
      );
    }
  };

  //     if (response.ok) {
  //       // Add the response message from the bot
  //       const botMessage = data.temperature || data.error || 'No response from server.';
  //           // Add the response message from the bot
  //           setMessages((prevMessages) => [
  //               ...prevMessages,
  //               { text: botMessage, sender: 'bot' },
  //           ]);
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { text: data.temperature || data.error || 'No response from server.', sender: 'bot' },
  //       ]);
  //     } else {
  //       // Handle API error
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { text: data.error || 'Error occurred while fetching data.', sender: 'bot' },
  //       ]);
  //     }
  //   } catch (error) {
  //     console.error('Error sending message:', error);
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { text: 'Error occurred while communicating with the server.', sender: 'bot' },
  //     ]);
  //   }
  // };

  const handleSave = () => {
    console.log("Saving Coordinates:", { latitude, longitude });
  };

  const handleReset = () => {
    setLatitude("");
    setLongitude("");
    setSliderValue(50); // reset slider to default value
  };

  return (
    <div className={styles.container}>
      <Sidebar onNewChatClick={handleChatClick} />
      <div className={styles.layout}>
        <div className={styles.inputSection}>
          <div className={styles.sidebarHeader}>
            <FontAwesomeIcon icon={faRobot} size="1x" />
            <span> ChatBot</span>
          </div>
          <label>
            Latitude:
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="Enter Latitude"
            />
          </label>
          <br />
          <label>
            Longitude:
            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="Enter Longitude"
            />
          </label>
          <br />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleReset}>Reset</button>
        </div>

        <div className={styles.main}>
          <ChatWindow
            messages={messages}
            onCloseChat={handleCloseChat}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
