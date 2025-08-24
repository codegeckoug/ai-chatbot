import React from "react";

export default function Sidebar({
  chats,
  onSelectChat,
  onNewChat,
  onDeleteChat,
}) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span>Chats</span>
      </div>
      <div className="chat-list">
        {chats.map((chat, index) => (
          <div
            key={index}
            className="chat-item"
            onClick={() => onSelectChat(index)}
          >
            <span>{chat.title || `Chat ${index + 1}`}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(index);
              }}
            >
              🗑
            </button>
          </div>
        ))}
      </div>
      <div className="new-chat" onClick={onNewChat}>
        + New Chat
      </div>
    </div>
  );
}
