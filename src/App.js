import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatBot";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false); // Already here

  const [conversations, setConversations] = useState(() => {
    const savedConversations = localStorage.getItem("conversations");
    return savedConversations ? JSON.parse(savedConversations) : [];
  });
  const [activeChat, setActiveChat] = useState(() => {
    const savedActiveChat = localStorage.getItem("activeChat");
    return savedActiveChat ? JSON.parse(savedActiveChat) : null;
  });

  useEffect(() => {
    localStorage.setItem("conversations", JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem("activeChat", JSON.stringify(activeChat));
  }, [activeChat]);

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      name: `Chat ${conversations.length + 1}`,
      messages: [],
    };
    setConversations([newChat, ...conversations]);
    setActiveChat(newChat.id);
  };

  const handleDeleteChat = (id) => {
    setConversations(conversations.filter((chat) => chat.id !== id));
    if (activeChat === id) setActiveChat(null);
  };

  return (
    <div className="App">
      <Sidebar
        conversations={conversations}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
      />
      <ChatWindow
        activeChat={activeChat}
        conversations={conversations}
        setConversations={setConversations}
        loading={loading}
        setLoading={setLoading} // Pass loading state down
      />
    </div>
  );
}

export default App;
