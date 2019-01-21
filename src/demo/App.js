import React, { Component } from 'react';
import { DeepSpeech } from '../lib';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: `
      This block of Markdown contains <a href="https://en.wikipedia.org/wiki/HTML">HTML</a>, and will require the <code>html-parser</code> AST plugin to be loaded, in addition to setting the <code class="prop">escapeHtml</code> property to false.
      `,
      styles: {
        width: '100%',
        height: '100%',
        theme: 'black',
      },
    };
  }

  handleChangeInput = e => {
    this.setState({
      input: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <DeepSpeech
          input={this.state.input}
          styles={this.state.styles}
          onChangeInpurt={this.handleChangeInput}
        />
      </div>
    );
  }
}

export default App;
