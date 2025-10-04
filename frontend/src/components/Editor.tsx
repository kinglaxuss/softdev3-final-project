import React from "react";
import EditorFooter from "./EditorFooter";

const Editor: React.FC = () => {
  return (
    <div className="editor">
      <div className="editor-header yellow">
        <div className="menu-dots">● ● ●</div>
      </div>
      <textarea className="editor-content" placeholder="Write your note here..."></textarea>
      <EditorFooter />
    </div>
  );
};

export default Editor;
