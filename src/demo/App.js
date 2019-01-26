import React, { Component } from 'react';
import {Controlled as Editor} from 'react-codemirror2'
import * as Viewer from 'react-markdown';
import { DeepSpeech} from '../lib';
import * as api from "../lib/api";
import './App.css'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/shell/shell';
import 'codemirror/theme/monokai.css';

const TRUE=1;
const FALSE=0;
const options = {
  mode: "markdown",
  theme: 'monokai',
  lineNumbers: FALSE,
  scrollBarStyle: null,
  viewportMargin: Infinity,
  lineWrapping: true,
  tabSize: 4
};

// const DeepSpeechStyles={
//   width: '100%',
//   height: '10%',
//   theme: 'black',
//   bottom: '0px',
//   position: 'fixed'
// };
// const ViewerStyles={
//   width:'50%',
//   height:'600px',
//   float:'right'
// };
// const EditorStyles={
//   width:'50%',
//   height:'90%',
//   float:'left'
// };

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: ""
    }; 
  }

  fileSubmit = async(formData,headers) => {
    const result = api.dsFile(forData,headers);
    this.setState({
      input: result
    })
  };

  handleChangeInput = e => {
    this.setState({
      input: e.target.value
    });
  };

  handleSubmit = () => {
    console.log('submit');
  };
  
  
  render() {
    return (
      <div>
        <div className="editorStyles">
          <Editor
            value={this.state.input}
            onBeforeChange={(editor, data, value) => {
              this.setState({input:value});
            }}
            options={options}         
          />
        </div>       
        <div className="save-btn">
          <button onClick={this.handleSubmit}>
              Save
          </button>
        </div>
        <div className="deepSpeechStyles">
          <DeepSpeech 
            input={this.state.input}
            fileSubmit={this.fileSubmit}
          />
        </div>
        <div className="viewerStyles">
          <Viewer sourcePos={FALSE} source={this.state.input} escapeHtml={1} />
        </div>
      </div>
    );
  }
}

export default App;
