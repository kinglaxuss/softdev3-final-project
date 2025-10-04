import React from "react";
import NoteCard from "./NoteCard";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="add-btn">+</button>
        <h2>Notes</h2>
      </div>
      <div className="notes-list">
        <NoteCard color="yellow" />
        <NoteCard color="blue" />
        <NoteCard color="pink" />
        <NoteCard color="green" />
      </div>
    </div>
  );
};

export default Sidebar;
