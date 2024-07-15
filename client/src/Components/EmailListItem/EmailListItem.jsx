import React from "react";
import "./EmailListItem.scss";

const EmailListItem = ({ email, onClick }) => {
  const sender = email.sender || {};
  const senderFirstName = sender.firstName || "";
  const senderLastName = sender.lastName || "";

  return (
    <div className="email-list-item" onClick={onClick}>
      <div className="avatar">
        {senderFirstName.charAt(0).toUpperCase()}
        {senderLastName.charAt(0).toUpperCase()}
      </div>
      <div className="email-info">
        <div className="sender">
          {senderFirstName} {senderLastName}
        </div>
        <div className="subject">{email.subject}</div>
        <div className="snippet">{email.body.substring(0, 50)}...</div>
      </div>
      <div className="time">
        {new Date(email.createdAt).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default EmailListItem;
