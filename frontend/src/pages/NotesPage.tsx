import React, { useEffect, useState } from "react";
import "../css/notes.css";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import { getNotes, createNote, updateNote, deleteNote} from "../api/notes";
import type { NoteDto } from "../api/notes";

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<NoteDto[]>([]);
  const [selectedNote, setSelectedNote] = useState<NoteDto | null>(null);

  const loadNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
      // if no selected note, pick the first
      if (!selectedNote && data.length) setSelectedNote(data[0]);
    } catch (err) {
      console.error("Failed to load notes", err);
    }
  };

  useEffect(() => {
    loadNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Called from Editor when saving a new or existing note
  const handleSave = async (noteLike: { id?: number; content: string; color: NoteDto["color"] }) => {
    try {
      if (noteLike.id) {
        const updated = await updateNote(noteLike.id, { content: noteLike.content, color: noteLike.color });
        setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
        setSelectedNote(updated);
      } else {
        const created = await createNote({ content: noteLike.content, color: noteLike.color });
        setNotes((prev) => [created, ...prev]);
        setSelectedNote(created);
      }
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
      if (selectedNote?.id === id) setSelectedNote(notes.length > 1 ? notes.find(n => n.id !== id) ?? null : null);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="notes-container">
      <Sidebar
        notes={notes}
        onSelect={(n) => setSelectedNote(n)}
        onAdd={() =>
          setSelectedNote({
            id: -1, // temporary marker for "new"
            content: "",
            color: "gold",
          } as NoteDto)
        }
        onDelete={handleDelete}
        selectedNoteId={selectedNote?.id ?? null}
      />
      <Editor note={selectedNote} onSave={handleSave} />
    </div>
  );
};

export default NotesPage;
