import React from 'react';
import {Button} from "react-bootstrap";

var AudioFileUpload = React.createClass({
  render:function(){
    return(
      <div>
        <h1>上传音频文件</h1>
        <Button onClick={this.props.submitAudioFileUpload}>sumbit</Button>
      </div>
    )
  }
})

export default AudioFileUpload
