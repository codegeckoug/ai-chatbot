import React, { useState } from "react";

const Sidebar = ({ onNewChat }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Icon (Mobile Only) */}
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>

      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <button className="new-chat-btn" onClick={onNewChat}>
          + New Chat
        </button>
      </aside>

      {/* Mobile Sidebar Modal */}
      {isOpen && (
        <div className="mobile-menu">
          <button className="close-btn" onClick={toggleMenu}>
            ×
          </button>
          <button className="new-chat-btn" onClick={onNewChat}>
            + New Chat
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;
