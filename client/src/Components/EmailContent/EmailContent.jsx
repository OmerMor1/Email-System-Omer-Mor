import React from "react";
import "./EmailContent.scss";

const EmailContent = ({ email, selectedCategory }) => {
  if (!email) {
    return (
      <div className="email-content">Select an email to view its content</div>
    );
  }
  const sender = email.sender || {};
  const senderFirstName = sender.firstName || "";
  const senderLastName = sender.lastName || "";
  const recipient = email.recipient || {};
  const recipientFirstName = recipient.firstName || "";
  const recipientLastName = recipient.lastName || "";
  const isInbox = selectedCategory === "inbox";
  const headerField = isInbox
    ? `From: ${senderFirstName} ${senderLastName}`
    : `To: ${recipientFirstName} ${recipientLastName}`;

  return (
    <div className="email-content">
      <div className="email-header">
        <div className="sender-avatar">
          {senderFirstName.charAt(0).toUpperCase()}
          {senderLastName.charAt(0).toUpperCase()}
        </div>
        <div className="email-details">
          <div className="header-field">{headerField}</div>
          <div className="subject">{email.subject}</div>
        </div>
        <div className="time">{new Date(email.createdAt).toLocaleString()}</div>
      </div>
      <div className="email-body">
        <p>{email.body}</p>
      </div>
    </div>
  );
};

export default EmailContent;
