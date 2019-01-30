import React, { Component } from 'react';
import { SViewer } from './Viewer';
import { SEditor } from './Editor';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/theme/monokai.css';

class DeepSpeech extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: this.props.value
    };
  }

  componentWillReceiveProps(nextProps){
    if(this.props.value!==nextProps.value){
      this.handleBeforeChange(null,null,nextProps.value)
    }
  }


  handleBeforeChange = (editor, data, value) => {
    this.setState({ input: value });
  };
  
  render() {
    return (
      <div>
        <SEditor
          input={this.state.input}
          onBeforeChange={this.handleBeforeChange}
        />
        <SViewer input={this.state.input} />
      </div>
    );
  }
}

export { DeepSpeech };
