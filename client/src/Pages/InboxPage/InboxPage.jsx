import React, { useState } from "react";
import Header from "../../Components/Header/Header.jsx";
import EmailList from "../../Components/EmailList/EmailList.jsx";
import EmailContent from "../../Components/EmailContent/EmailContent.jsx";
import "./InboxPage.scss";

const InboxPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
  };

  return (
    <div className="inbox-page">
      <Header setSelectedCategory={setSelectedCategory} />
      <div className="content">
        <EmailList
          selectedCategory={selectedCategory}
          onEmailSelect={handleEmailSelect}
        />
        <EmailContent
          email={selectedEmail}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
};

export default InboxPage;
