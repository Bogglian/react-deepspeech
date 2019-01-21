import React, { Component } from 'react';
import { Editor } from './Editor';
import * as api from '../../DeepSpeechModule.js';

class DeepSpeech extends Component {
  handleChangeFile = e => {
    this.setState({
      file: e.target.files[0],
    });
    console.log('file: ' + this.state.file);
  };

  handleSubmit = () => {
    var complete = api.deepSpeech(this.state.file);
    console.log('submit');
  };

  render() {
    const { input, styles, onChangeInpurt } = this.props;
    return (
      <div styles={JSON.stringify(styles)}>
        <Editor
          input={input}
          onChange={onChangeInpurt}
          onSubmit={this.handleSubmit}
        />
        <form>
          <div>
            <label for="fileUpload">UPLOAD</label>
            <input
              type="file"
              name="upload"
              id="fileUpload"
              onChange={this.handleChangeFile}
              accept=".wav, .raw, .mp3, .mp4, .flex, .m4a"
            />
          </div>
        </form>
      </div>
    );
  }
}

export { DeepSpeech };
