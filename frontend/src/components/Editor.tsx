import React, { useEffect, useRef, useState } from "react";
import EditorFooter from "./EditorFooter";

type Color = "gold" | "skyblue" | "pink" | "lightgreen";

interface NoteProp {
  id: number;
  content: string;
  color: Color;
}

interface Props {
  note: NoteProp | null;
  onSave: (n: { id?: number; content: string; color: Color }) => Promise<void>;
}

const Editor: React.FC<Props> = ({ note, onSave }) => {
  const [color, setColor] = useState<Color>("gold");
  const [menuOpen, setMenuOpen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (note) {
      setColor(note.color ?? "gold");
      if (editorRef.current) editorRef.current.innerHTML = note.content ?? "";
    } else {
      if (editorRef.current) editorRef.current.innerHTML = "";
      setColor("gold");
    }
  }, [note]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const formatText = (command: string) => {
    document.execCommand(command, false);
    editorRef.current?.focus();
  };

  const handleSave = async () => {
    const content = editorRef.current?.innerHTML ?? "";
    try {
      await onSave(
        note && note.id > 0 ? { id: note.id, content, color } : { content, color }
      );
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  return (
    <div
      className="editor"
      style={{
        backgroundColor: color, // colored border/background like sticky note
        borderRadius: "10px",
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Header (colored) */}
      <div
        className="editor-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "6px 10px",
        }}
      >
        <div
          className="menu-dots"
          onClick={toggleMenu}
          style={{ cursor: "pointer", fontWeight: "bold" }}
        >
          ● ● ●
        </div>
        <button
          onClick={handleSave}
          style={{
            background: "#333",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "4px 10px",
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </div>

      {/* Color dropdown */}
      {menuOpen && (
        <div
          className="menu-dropdown"
          style={{
            background: "#fff",
            padding: "10px",
            borderRadius: "8px",
            margin: "8px",
          }}
        >
          <div style={{ display: "flex", gap: "5px" }}>
            {["gold", "skyblue", "pink", "lightgreen"].map((c) => (
              <div
                key={c}
                onClick={() => setColor(c as Color)}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: c,
                  cursor: "pointer",
                  border: color === c ? "2px solid black" : "1px solid gray",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Content area (dark grey, NOT colored) */}
      <div
        ref={editorRef}
        contentEditable
        className="editor-content"
        style={{
          flexGrow: 1,
          backgroundColor: "#2f2f2f", // fixed dark gray background
          color: "white",
          borderRadius: "6px",
          padding: "12px",
          marginTop: "6px",
          marginBottom: "6px",
          overflowY: "auto",
        }}
      ></div>

      {/* Footer stays dark */}
      <EditorFooter formatText={formatText} />
    </div>
  );
};

export default Editor;
