import React, { Component } from 'react';
import Highlight from 'react-highlight';

class CodeBlock extends Component {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
  }

  setRef(el) {
    this.codeEl = el;
  }

  render() {
    return (
      <Highlight
        ref={this.setRef}
        className={`language-${this.props.language}`}
      >
        <pre>
          <code>{this.props.value}</code>
        </pre>
      </Highlight>
    );
  }
}

export { CodeBlock };
