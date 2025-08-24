import React from "react";

function Sidebar({
  conversations,
  onNewChat,
  onDeleteChat,
  activeChat,
  setActiveChat,
}) {
  return (
    <div className="sidebar">
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
  );
}

export default Sidebar;
