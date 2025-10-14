import React from "react";

interface NoteCardProps {
  color: "gold" | "skyblue" | "pink" | "lightgreen";
  content: string;
  isSelected?: boolean;
}

const NoteCard: React.FC<NoteCardProps> = ({ color, content }) => {
  const preview = content.length > 30 ? content.slice(0, 30) + "..." : content;

  return (
    <div className={`note-card ${color}`}>
      <p
        style={{
          color: "white",
          fontSize: "0.9rem",
          padding: "10px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {preview || "(Empty note)"}
      </p>
    </div>
  );
};

export default NoteCard;
