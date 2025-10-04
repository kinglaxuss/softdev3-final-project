import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import notesRoutes from "./routes/notesRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/notes", notesRoutes);

export default app;
