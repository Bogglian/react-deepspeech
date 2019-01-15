import React, { Component } from "react";
import "./deepspeech.css";

class DeepSpeech extends Component {
  render() {
    const {
      content = "default",
      file,
      title = "default",
      onChangeFile,
      onChangeInput
    } = this.props;
    return (
      <form>
        <div className="deepSpeech-title">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={onChangeInput}
          />
        </div>
        <div className="deepSpeech-content">
          <textarea
            type="text"
            name="content"
            placeholder="Leave a comment"
            value={content}
            onChange={onChangeInput}
          />
        </div>
        <div className="deepSpeech-upload">
          <input
            className="file-name"
            value={file ? file.name : "select file"}
            disabled="disabled"
          />
          <label for="fileUpload">UPLOAD</label>
          <input
            type="file"
            name="fileUpload"
            id="fileUpload"
            onChange={onChangeFile}
            accept=".wav, .raw, .mp3, .mp4, .flex, .m4a"
          />
        </div>
      </form>
    );
  }
}

export default DeepSpeech;
