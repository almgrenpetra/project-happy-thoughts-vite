import React from "react";
import "./CreateMessage.css";

export const CreateMessage = ({
  newMessage,
  onNewMessagePost,
  onFormSubmit,
}) => {
  return (
    <div className="create-message-card">
      <h2>What is making you happy right now?</h2>
      <textarea
        className="message-input"
        rows="3"
        maxLength="140"
        placeholder="Write your happy thought here."
        value={newMessage}
        onChange={onNewMessagePost}
      ></textarea>
      <p className="message-length">{newMessage.length}/140</p>
      <button
        type="submit"
        onClick={onFormSubmit}
        className="send-button"
        disabled={newMessage.length < 5 || newMessage.length > 140}
      >
        <span className="tooltip">
          Your message must be at least 5 characters long{" "}
        </span>
        ❤️ Send Happy Thought ❤️
      </button>
    </div>
  );
};
