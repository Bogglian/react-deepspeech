import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import styled from 'styled-components';

class Editor extends Component {
  render() {
    const { input, onBeforeChange } = this.props;
    const options = {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: false,
      scrollBarStyle: null,
      viewportMargin: Infinity,
      lineWrapping: true,
      tabSize: 4,
    };

    return (
      <div>
        <CodeMirror
          width="100%"
          value={input}
          onBeforeChange={onBeforeChange}
          options={options}
        />
      </div>
    );
  }
}

const SEditor = styled(Editor)``;

export { SEditor };
