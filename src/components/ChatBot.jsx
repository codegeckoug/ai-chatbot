import React, { useState, useEffect } from "react";
import { getCohereResponse } from "../chatService";

function ChatWindow({ activeChat, conversations, setConversations }) {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState(null);
  const [isTyping, setIsTyping] = useState(false); // NEW

  useEffect(() => {
    // Keep chat state in sync with activeChat
    setChat(conversations.find((c) => c.id === activeChat) || null);
  }, [activeChat, conversations]);

  const sendMessage = async () => {
    if (input.trim() === "" || !activeChat) return;

    // 1. Add user message to current chat
    const updatedConversations = conversations.map((c) =>
      c.id === activeChat
        ? { ...c, messages: [...c.messages, { text: input, sender: "user" }] }
        : c
    );
    setConversations(updatedConversations);
    setInput("");

    // 2. Show "Bot is typing..."
    setIsTyping(true);

    // 3. Get bot response from Cohere
    const botReply = await getCohereResponse(input);

    // 4. Add bot reply to current chat
    setConversations((prevConversations) =>
      prevConversations.map((c) =>
        c.id === activeChat
          ? {
              ...c,
              messages: [...c.messages, { text: botReply, sender: "bot" }],
            }
          : c
      )
    );

    // 5. Remove "Bot is typing..."
    setIsTyping(false);
  };

  if (!chat) {
    return (
      <div className="chat-window empty">
        <h2>what's for today?</h2>
        <p>Start a new chat from the sidebar.</p>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="messages">
        {chat.messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}

        {isTyping && <div className="message bot typing">Bot is typing...</div>}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
