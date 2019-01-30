import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

import { CodeBlock } from './CodeBlock';

class Viewer extends Component {
  render() {
    const { input } = this.props;

    return (
      <div>
        <ReactMarkdown
          sourcePos={false}
          source={input}
          skipHtml
          escapeHtml
          renderers={{ code: CodeBlock }}
        />
      </div>
    );
  }
}

const SViewer = styled(Viewer)``;

export { SViewer };
