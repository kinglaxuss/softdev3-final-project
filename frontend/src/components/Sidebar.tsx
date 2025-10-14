import React from "react";
import NoteCard from "./NoteCard";

interface Note {
  id: number;
  color: "gold" | "skyblue" | "pink" | "lightgreen";
  content: string;
}

interface Props {
  notes: Note[];
  onSelect: (note: Note) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
  selectedNoteId: number | null;
}

const Sidebar: React.FC<Props> = ({ notes, onSelect, onAdd, onDelete, selectedNoteId }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="add-btn" onClick={onAdd}>+</button>
        <h2>Notes</h2>
      </div>

      <div className="notes-list">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div onClick={() => onSelect(note)} style={{ flex: 1 }}>
                <NoteCard color={note.color} isSelected={selectedNoteId === note.id} />
              </div>
              <button onClick={() => onDelete(note.id)} aria-label="delete">🗑</button>
            </div>
          ))
        ) : (
          <p style={{ color: "white" }}>No notes yet</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
