import React from 'react';
import {Button} from "react-bootstrap";

var ImageFileUpload = React.createClass({
  render:function(){
    return(
      <div>
        <h1>ImageFileUpload</h1>
        <Button onClick={this.props.submitImageFileUpload}>sumbit</Button>
      </div>
    )
  }
})

export default ImageFileUpload
