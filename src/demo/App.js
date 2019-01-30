import React, { Component } from 'react';
import { DeepSpeech } from '../lib';
import { SInputFileForm } from '../lib/components/InputFileForm';
import * as api from '../lib/api';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input:
        '# Headline\n\n## sub-title\n\n* option\n  * sub-option1\n  * sub-option2\n\n> tip\n>\n> tipe contents\n\n\n```\ntest conetnts\n\ntest input\n\n```',
      file:''
    };
  }
  
  handleChangeFile = e => {
    this.setState({
      file: e.target.files[0],
    });
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
      this.handleAddResult("\n```\n"+result.data.ds+"\n```\n")
    });
  }
  
  handleAddResult = value => {
    this.setState(prevState => ({input: prevState.input + value}));
  }

  render() {
    return (
      <div>
        <DeepSpeech value={this.state.input} />
        <SInputFileForm handleChangeFile={this.handleChangeFile} />
        <button onClick={this.handleFileSubmit}>STT</button>
      </div>
    )
  }
}

export default App;
