import React, { useState, useEffect } from "react";
import { CreateMessage } from "./CreateMessage";
import { MessageList } from "./MessageList";
import "./Messages.css";

export const Messages = () => {
  const [messageList, setMessageList] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const postUrl = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";
  const apiUrl = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";

  const fetchMessageList = async () => {
    setLoading(true);

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        setMessageList(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewMessagePost = (event) => {
    setNewMessage(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `${newMessage}`,
      }),
    };

    try {
      const response = await fetch(postUrl, options);
      if (response.ok) {
        await fetchMessageList();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setNewMessage("");
    }
  };

  useEffect(() => {
    fetchMessageList();
  }, []);

  return (
    <div className="main">
      <CreateMessage
        newMessage={newMessage}
        onNewMessagePost={handleNewMessagePost}
        onFormSubmit={handleFormSubmit}
      />
      <MessageList
        messageList={messageList}
        setMessageList={setMessageList}
        loading={loading}
      />
    </div>
  );
};
