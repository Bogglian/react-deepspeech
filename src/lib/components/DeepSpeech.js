import React, { Component } from 'react';
import * as api from '../../DeepSpeechModule.js';

class DeepSpeech extends Component {
  handleChangeFile = e => {
    this.setState({
      file: e.target.files[0],
    });
    console.log('file: ' + this.state.file);
  };

  
  render() {
    const { input, onChangeInpurt } = this.props;
    return (
      <div>
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
