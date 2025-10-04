// Import dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 5000;

// Temporary in-memory storage for notes
let notes = [
  { id: 1, title: "First Note", content: "This is a sample note.", color: "yellow" },
];

// Routes
// Fetch all notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// Add a new note
app.post("/api/notes", (req, res) => {
  const { title, content, color } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  const newNote = {
    id: Date.now(),
    title,
    content,
    color: color || "yellow",
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// Delete a note by ID
app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = notes.length;
  notes = notes.filter((note) => note.id !== parseInt(id));

  if (notes.length === initialLength) {
    return res.status(404).json({ message: "Note not found." });
  }

  res.status(204).end();
});

// Root route
app.get("/", (req, res) => {
  res.send("Notes API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
