import React from "react";

interface NoteCardProps {
  color: "gold" | "skyblue" | "pink" | "lightgreen";
  isSelected?: boolean;
}

const NoteCard: React.FC<NoteCardProps> = ({ color, isSelected = false }) => {
  return <div className={`note-card ${color} ${isSelected ? "selected" : ""}`}></div>;
};

export default NoteCard;
