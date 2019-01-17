import React, { Component } from "react";
import "./deepspeech.css";
import * as api from "./DeepSpeechModule.js";

class DeepSpeech extends Component {
  state ={
    file:'',
    result:''
  }
  onChangeFile=(e)=>{
    this.setState({
      file: e.target.files[0]
    })
    console.log('asdf'+this.state.file)
  }
  submit=()=>{
    var complete = api.deepSpeech(this.state.file);
    console.log('submit')
  }
  
  render() {
    return (
      <form>
        <div>
	
          <label for="fileUpload">UPLOAD</label>
          <input
            type="file"
            name="fileUpload"
            id="fileUpload"
            onChange={this.onChangeFile}
            accept=".wav, .raw, .mp3, .mp4, .flex, .m4a"
          />
          <button type="submit" onClick={this.submit}>
                Submit
          </button>
        </div>
      </form>
    );
  }
}

export { DeepSpeech };
