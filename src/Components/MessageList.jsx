import React from "react";
import moment from "moment";
import "./MessageList.css";

export const MessageList = ({ messageList, setMessageList, loading }) => {
  if (loading) {
    return <h3>Loading in progress...</h3>;
  }

  const apiUrl = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";

  const likeMessage = (messageId) => {
    fetch(apiUrl + `/${messageId}/like`, { method: "POST" })
      .then(() => {
        setMessageList(
          messageList.map((message) =>
            message._id === messageId
              ? { ...message, hearts: message.hearts + 1 }
              : message
          )
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {messageList.map((message) => (
        <div key={message._id} className="message-card">
          <p className="message">{message.message}</p>
          <div className="message-footer">
            <div className="likes-container">
              <button
                onClick={() => likeMessage(message._id)}
                className="like-button"
              >
                <span className="emoji">❤️</span>
              </button>
              <p>x{message.hearts}</p>
            </div>
            <p>{moment(message.createdAt).fromNow()}</p>
          </div>
        </div>
      ))}
    </>
  );
};
