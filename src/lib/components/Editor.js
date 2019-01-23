import React from 'react';
import ReactMarkdown from 'react-markdown';

const Editor = ({ input, escapeHtml, onChange, onSubmit }) => (
  <div>
    <div>
      <ReactMarkdown source={input} escapeHtml={1} />
      <button className="save-btn" onClick={onSubmit}>
        Save
      </button>
    </div>
  </div>
);

export { Editor };
