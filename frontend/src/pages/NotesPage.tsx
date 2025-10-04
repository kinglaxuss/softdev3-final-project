import React from "react";
import "../css/notes.css";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";

const NotesPage: React.FC = () => {
  return (
    <div className="notes-container">
      <Sidebar />
      <Editor />
    </div>
  );
};

export default NotesPage;
