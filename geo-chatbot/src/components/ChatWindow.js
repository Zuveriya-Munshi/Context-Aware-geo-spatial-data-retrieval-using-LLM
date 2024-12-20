import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faUpload,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./ChatWindow.module.css";

const handleNewChatClick = () => {
  setMessages([]); // Clear chat messages
  setLatitude(""); // Reset latitude
  setLongitude(""); // Reset longitude
  setSliderValue(50); // Reset slider to default value
  setIsChatOpen(false); // Optional: Close chat if necessary
};

const ChatWindow = ({ messages = [], onSendMessage }) => {
  const inputRef = useRef(null);
  const router = useRouter();

  const handleSend = () => {
    const message = inputRef.current.value.trim();
    if (message) {
      onSendMessage(message);
      inputRef.current.value = "";
    }
  };

  const handleLogout = () => {
    router.push("/login"); // Redirect to the login page
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatHeader}>
        <span>Chat Bot</span>
        <button onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
        </button>
      </div>
      <div className={styles.chatBody}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.chatMessage} ${
              msg.sender === "user" ? styles.userMessage : styles.botMessage
            }`}
          >
            <div className={styles.chatAvatar}>
              <FontAwesomeIcon icon={faUser} size="2x" />
            </div>
            <div className={styles.chatContent}>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.chatInputContainer}>
        <label htmlFor="fileInput" className={styles.uploadButton}>
          <FontAwesomeIcon icon={faUpload} />
          <input id="fileInput" type="file" className={styles.fileInput} />
        </label>
        <input
          id="chatInput"
          type="text"
          placeholder="Message Chat Bot"
          className={styles.chatInput}
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button className={styles.sendButton} onClick={handleSend}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
      <div className={styles.chatFooter}></div>
    </div>
  );
};

export default ChatWindow;
