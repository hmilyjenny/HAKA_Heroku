import React from 'react';
import {Button} from "react-bootstrap";

var AudioFileUpload = React.createClass({
  render:function(){
    return(
      <div>
        <h1>AudioFileUpload</h1>
        <Button onClick={this.props.submitAudioFileUpload}>sumbit</Button>
      </div>
    )
  }
})

export default AudioFileUpload
