import React, { Component } from 'react';
import { SViewer } from './Viewer';
import { SEditor } from './Editor';
import { SInputFileForm } from './InputFileForm';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/theme/monokai.css';

class DeepSpeech extends Component {
  constructor() {
    super();
    this.state = {
      input:
        '# Headline\n\n## sub-title\n\n* option\n  * sub-option1\n  * sub-option2\n\n> tip\n>\n> tipe contents\n\n\n```\ntest conetnts\n\ntest input\n\n```',
    };
  }

  handleBeforeChange = (editor, data, value) => {
    this.setState({ input: value });
  };

  handleSubmit = () => {
    var complete = api.deepSpeech(this.state.file);
    console.log('submit');
  };

  handleChangeFile = e => {
    this.setState({
      file: e.target.files[0],
    });
   // console.log('file: ' + this.state.file);
  };

  handleFileSubmit = () => {
	  
    const formData = new FormData();
    formData.append("audiofile", this.state.file);
    const headers = {
	    headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data"
	    }
    };
    this.props.fileSubmit(formData,headers);
  }
  
  render() {
    return (
      <div>
        <SEditor
          input={this.state.input}
          onBeforeChange={this.handleBeforeChange}
        />
        <SInputFileForm input={this.state.input} />

        <SViewer input={this.state.input} />
        <div>
          <button onClick={this.handleSubmit}>Save</button>
        </div>
      </div>
    );
  }
}

export { DeepSpeech };
