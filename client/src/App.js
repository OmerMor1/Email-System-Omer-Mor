import { React } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Register from "./Components/Register/Register.jsx";
import InboxPage from "./Components/InboxPage/InboxPage.jsx";
import Login from "./Components/Login/Login.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
