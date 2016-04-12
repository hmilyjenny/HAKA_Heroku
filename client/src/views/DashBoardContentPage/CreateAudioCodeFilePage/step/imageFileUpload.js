import React from 'react';
import {Button} from "react-bootstrap";

var ImageFileUpload = React.createClass({
  render:function(){
    return(
      <div>
        <h1>上传图像文件</h1>
        <Button onClick={this.props.submitImageFileUpload}>sumbit</Button>
      </div>
    )
  }
})

export default ImageFileUpload
