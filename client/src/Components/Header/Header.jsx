import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { Button } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import OutboxIcon from "@mui/icons-material/Outbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import MailIcon from "@mui/icons-material/Mail";
import NewEmailForm from "../NewEmailForm/NewEmailForm";
import "./Header.scss";

const Header = ({ setSelectedCategory }) => {
  const [activeButton, setActiveButton] = useState("inbox");
  const [userInitial, setUserInitial] = useState("");
  const [isNewEmailOpen, setIsNewEmailOpen] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setUserInitial(email.charAt(0).toUpperCase());
    }
  }, []);

  const handleButtonClick = (category) => {
    setActiveButton(category);
    setSelectedCategory(category);
  };

  const handleNewEmailClick = () => {
    setIsNewEmailOpen(true);
  };

  const handleCloseNewEmail = () => {
    setIsNewEmailOpen(false);
  };

  const handleSubmitNewEmail = () => {
    setIsNewEmailOpen(false);
  };

  return (
    <div className="header">
      <div className="left-section">
        <Button
          variant="outlined"
          startIcon={<InboxIcon />}
          className={`inbox-button ${activeButton === "inbox" ? "active" : ""}`}
          onClick={() => handleButtonClick("inbox")}
        >
          Inbox
        </Button>
        <Button
          variant="outlined"
          startIcon={<OutboxIcon />}
          className={`outbox-button ${
            activeButton === "outbox" ? "active" : ""
          }`}
          onClick={() => handleButtonClick("outbox")}
        >
          Outbox
        </Button>
        <Button
          variant="outlined"
          startIcon={<DraftsIcon />}
          className={`draft-button ${activeButton === "draft" ? "active" : ""}`}
          onClick={() => handleButtonClick("draft")}
        >
          Draft
        </Button>
        <SearchBar />
      </div>
      <div className="right-section">
        <Button
          variant="contained"
          startIcon={<MailIcon />}
          className="new-email-button"
          onClick={handleNewEmailClick}
        >
          New Email
        </Button>
        <div className="user-icon">{userInitial}</div>
      </div>
      <NewEmailForm
        open={isNewEmailOpen}
        onClose={handleCloseNewEmail}
        onSubmit={handleSubmitNewEmail}
      />
    </div>
  );
};

export default Header;
