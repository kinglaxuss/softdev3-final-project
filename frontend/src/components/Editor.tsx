import React, { useState, useRef } from "react";
import EditorFooter from "./EditorFooter";

const Editor: React.FC = () => {
  const [color, setColor] = useState<"gold" | "skyblue" | "pink" | "lightgreen">("gold");
  const [menuOpen, setMenuOpen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const formatText = (command: string) => {
    document.execCommand(command, false);
    editorRef.current?.focus();
  };

  return (
    <div
      className="editor"
      style={{
        backgroundColor: color,
        position: "relative",
        padding: "10px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Editor Header */}
      <div
        className="editor-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: color,
          padding: "0.5rem 1rem",
          borderRadius: "6px",
        }}
      >
        <div className="menu-dots" style={{ cursor: "pointer" }} onClick={toggleMenu}>
          ● ● ●
        </div>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div
          className="menu-dropdown"
          style={{
            position: "absolute",
            top: "40px",
            right: "10px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "10px",
            zIndex: 10,
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            minWidth: "120px",
          }}
        >
          {/* Color options */}
          <div style={{ display: "flex", gap: "5px", marginBottom: "8px" }}>
            {["gold", "skyblue", "pink", "lightgreen"].map((c) => (
              <div
                key={c}
                onClick={() => setColor(c as any)}
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: c,
                  cursor: "pointer",
                  border: color === c ? "2px solid black" : "1px solid gray",
                }}
              ></div>
            ))}
          </div>
          {/* Delete Note placeholder */}
          <div style={{ cursor: "pointer", color: "red" }}>Delete Note</div>
        </div>
      )}

      {/* Editor Content */}
      <div
        ref={editorRef}
        contentEditable
        className="editor-content"
        style={{
          flexGrow: 1,
          marginTop: "10px",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          backgroundColor: "#444",
          color: "white",
          outline: "none",
          overflowY: "auto",
        }}
      ></div>

      {/* Editor Footer */}
      <EditorFooter formatText={formatText} />
    </div>
  );
};

export default Editor;
