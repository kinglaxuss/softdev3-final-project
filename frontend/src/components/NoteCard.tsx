import React from "react";

interface NoteCardProps {
  color: "yellow" | "blue" | "pink" | "green";
}

const NoteCard: React.FC<NoteCardProps> = ({ color }) => {
  return <div className={`note-card ${color}`}></div>;
};

export default NoteCard;
