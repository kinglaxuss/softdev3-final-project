import React from "react";

interface EditorFooterProps {
  formatText: (command: string) => void;
}

const EditorFooter: React.FC<EditorFooterProps> = ({ formatText }) => {
  return (
    <div
      className="editor-footer"
      style={{
        display: "flex",
        gap: "10px",
        padding: "0.5rem 1rem",
        background: "#333", // stays dark
        borderTop: "1px solid #222",
      }}
    >
      <button onClick={() => formatText("bold")}><b>B</b></button>
      <button onClick={() => formatText("italic")}><i>I</i></button>
      <button onClick={() => formatText("underline")}>U</button>
      <button onClick={() => formatText("insertUnorderedList")}>≡</button>
    </div>
  );
};

export default EditorFooter;
