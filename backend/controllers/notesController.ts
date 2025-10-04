import { Request, Response } from "express";
import { Note } from "../models/note";

// In-memory notes array
let notes: Note[] = [
  { id: 1, content: "First note", color: "gold" },
  { id: 2, content: "Second note", color: "pink" },
];

// GET all notes
export const getNotes = (req: Request, res: Response) => {
  res.json(notes);
};

// CREATE a note
export const createNote = (req: Request, res: Response) => {
  const { content, color } = req.body;
  const newNote: Note = {
    id: notes.length ? notes[notes.length - 1].id + 1 : 1,
    content,
    color,
  };
  notes.push(newNote);
  res.status(201).json(newNote);
};

// UPDATE a note
export const updateNote = (req: Request, res: Response) => {
  const { id } = req.params;
  const { content, color } = req.body;

  const noteIndex = notes.findIndex((note) => note.id === parseInt(id));
  if (noteIndex === -1) return res.status(404).json({ message: "Note not found" });

  notes[noteIndex] = { ...notes[noteIndex], content, color };
  res.json(notes[noteIndex]);
};

// DELETE a note
export const deleteNote = (req: Request, res: Response) => {
  const { id } = req.params;
  const noteIndex = notes.findIndex((note) => note.id === parseInt(id));
  if (noteIndex === -1) return res.status(404).json({ message: "Note not found" });

  const deletedNote = notes.splice(noteIndex, 1);
  res.json(deletedNote[0]);
};
