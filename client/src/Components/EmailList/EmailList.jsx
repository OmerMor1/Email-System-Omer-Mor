import React, { useEffect, useState } from "react";
import EmailListItem from "../EmailListItem/EmailListItem.jsx";
import "./EmailList.scss";
import axios from "axios";

const EmailList = ({ selectedCategory, onEmailSelect }) => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/emails", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const { receivedEmails, sentEmails, drafts } = response.data;

        switch (selectedCategory) {
          case "inbox":
            setEmails(receivedEmails || []);
            break;
          case "outbox":
            setEmails(sentEmails || []);
            break;
          case "draft":
            setEmails(drafts || []);
            break;
          default:
            setEmails(receivedEmails || []);
        }
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    fetchEmails();
  }, [selectedCategory]);

  return (
    <div className="email-list">
      {emails.map((email) => (
        <EmailListItem
          key={email._id}
          email={email}
          onClick={() => onEmailSelect(email)}
        />
      ))}
    </div>
  );
};

export default EmailList;
