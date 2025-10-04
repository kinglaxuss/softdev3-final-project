import React from "react";

interface NoteCardProps {
  color: "gold" | "skyblue" | "pink" | "lightgreen";
}

const NoteCard: React.FC<NoteCardProps> = ({ color }) => {
  return <div className={`note-card ${color}`}></div>;
};

export default NoteCard;
