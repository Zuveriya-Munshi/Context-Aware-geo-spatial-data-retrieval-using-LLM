// components/Sidebar.js
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./Sidebar.module.css";

const Sidebar = ({ onNewChatClick }) => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebarList}>
        <li className={styles.sidebarItem} onClick={onNewChatClick}>
          <i className="fas fa-plus" style={{ marginRight: "8px" }}></i>{" "}
          {/* Plus Icon */}
          New chat
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
