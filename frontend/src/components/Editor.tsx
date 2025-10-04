import React, { useState } from "react";
import EditorFooter from "./EditorFooter";

const Editor: React.FC = () => {
  const [color, setColor] = useState<"gold" | "skyblue" | "pink" | "lightgreen">("gold");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
      }}
    >
      {/* Editor Header */}
      <div
        className="editor-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: color, // header matches selected color
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
      <textarea
        className="editor-content"
        placeholder="Write your note here..."
        style={{
          width: "100%",
          flexGrow: 1,
          marginTop: "10px",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          resize: "vertical",
          backgroundColor: "#444",
          color: "white",
          outline: "none",
        }}
      ></textarea>

      <EditorFooter />
    </div>
  );
};

export default Editor;
