import React, { Component } from 'react';

class DeepSpeech extends Component {
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
            <input type="button" onClick={this.fileSubmit} value="start STT" />
          </div>
        </form>
      </div>
    );
  }
}

export { DeepSpeech };
