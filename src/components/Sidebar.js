import React, { useState } from "react";

function Sidebar({
  conversations,
  onNewChat,
  onDeleteChat,
  activeChat,
  setActiveChat,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger button - visible on mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      {/* Sidebar - normal for desktop */}
      <div className="sidebar desktop">
        <button className="new-chat" onClick={onNewChat}>
          + New Chat
        </button>
        <ul className="chat-list">
          {conversations.map((chat) => (
            <li
              key={chat.id}
              className={activeChat === chat.id ? "active" : ""}
              onClick={() => setActiveChat(chat.id)}
            >
              Chat {chat.id}
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat.id);
                }}
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile modal menu */}
      {isOpen && (
        <div className="mobile-menu">
          <button className="close-btn" onClick={toggleMenu}>
            ✕
          </button>
          <button className="new-chat" onClick={onNewChat}>
            + New Chat
          </button>
          <ul className="chat-list">
            {conversations.map((chat) => (
              <li
                key={chat.id}
                className={activeChat === chat.id ? "active" : ""}
                onClick={() => {
                  setActiveChat(chat.id);
                  toggleMenu(); // Close menu after selecting
                }}
              >
                Chat {chat.id}
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                >
                  🗑
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Sidebar;
