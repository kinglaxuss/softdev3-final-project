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
      await onSave(note && note.id > 0 ? { id: note.id, content, color } : { content, color });
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  return (
    <div className="editor" style={{ backgroundColor: color }}>
      <div className="editor-header">
        <div className="menu-dots" onClick={toggleMenu}>● ● ●</div>
        <div style={{ marginLeft: "auto" }}>
          <button onClick={handleSave} style={{ marginRight: 8 }}>Save</button>
        </div>
      </div>

      {menuOpen && (
        <div className="menu-dropdown">
          <div style={{ display: "flex", gap: "5px", marginBottom: "8px" }}>
            {["gold", "skyblue", "pink", "lightgreen"].map((c) => (
              <div key={c}
                   onClick={() => setColor(c as Color)}
                   style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: c, cursor: "pointer", border: color === c ? "2px solid black" : "1px solid gray" }} />
            ))}
          </div>
        </div>
      )}

      <div ref={editorRef} contentEditable className="editor-content"></div>

      <EditorFooter formatText={formatText} />
    </div>
  );
};

export default Editor;
