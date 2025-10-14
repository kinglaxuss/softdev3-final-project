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

const Sidebar: React.FC<Props> = ({
  notes,
  onSelect,
  onAdd,
  onDelete,
  selectedNoteId,
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="add-btn" onClick={onAdd}>
          +
        </button>
        <h2>Notes</h2>
      </div>

      <div className="notes-list">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: "100%",
                maxWidth: "260px", // ✅ keeps all cards same size
              }}
            >
              <div
                onClick={() => onSelect(note)}
                style={{
                  flex: 1,
                  overflow: "hidden", // ✅ prevents stretching
                }}
              >
                <NoteCard
                  color={note.color}
                  content={note.content}
                  isSelected={selectedNoteId === note.id}
                />
              </div>
              <button
                onClick={() => onDelete(note.id)}
                aria-label="delete"
                style={{
                  background: "#222",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 8px",
                  cursor: "pointer",
                  flexShrink: 0, // ✅ keeps delete button from moving
                }}
              >
                🗑
              </button>
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
