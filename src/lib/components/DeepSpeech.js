import React, { Component } from 'react';
import { SViewer } from './Viewer';
import { SEditor } from './Editor';
import { SInputFileForm } from './InputFileForm';
import * as api from '../api';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/theme/monokai.css';

class DeepSpeech extends Component {
  constructor() {
    super();
    this.state = {
      input:
        '# Headline\n\n## sub-title\n\n* option\n  * sub-option1\n  * sub-option2\n\n> tip\n>\n> tipe contents\n\n\n```\ntest conetnts\n\ntest input\n\n```',
      file:''
    };
  }

  handleBeforeChange = (editor, data, value) => {
    this.setState({ input: value });
  };

  handleChangeFile = e => {
    this.setState({
      file: e.target.files[0],
    });
   console.log('file: ' + this.state.file);
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
     api.dsFile(formData, headers).then(result => {
      this.handleBeforeChange(null,null,result.data.ds)
    });
  }
  
  render() {
    return (
      <div>
        <SEditor
          input={this.state.input}
          onBeforeChange={this.handleBeforeChange}
        />
        <SInputFileForm handleChangeFile={this.handleChangeFile} />

        <SViewer input={this.state.input} />
        <div>
          <button onClick={this.handleFileSubmit}>Save</button>
        </div>
      </div>
    );
  }
}

export { DeepSpeech };
