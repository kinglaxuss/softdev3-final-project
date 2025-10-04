import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import { getNotes } from "../api/notes"; // example API function

interface Note {
  id: number;
  color: "gold" | "skyblue" | "pink" | "lightgreen";
  content: string;
}

const Sidebar: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  // Fetch notes from API when component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes(); // call your API function
      setNotes(data);
    };
    fetchNotes();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="add-btn">+</button>
        <h2>Notes</h2>
      </div>

      <div className="notes-list">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard key={note.id} color={note.color} />
          ))
        ) : (
          <p style={{ color: "white" }}>No notes yet</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
