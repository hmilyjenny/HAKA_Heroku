import React from 'react';
import {Button,Input,Glyphicon} from "react-bootstrap";
import '../css/create-audiocode.css';

var AudioFileUpload = React.createClass({
  handleFile:function(e){
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(upload) {
      self.setState({
        data_uri: upload.target.result,
      });
    }

    reader.readAsDataURL(file);
  },
  render:function(){
    const glyphFile = <Button><Glyphicon glyph="folder-open" /></Button>
    const uploadLabel =<i><Glyphicon glyph="folder-open" />上传音频文件</i>
    return(
      <div className="audioUpload">
        <br/>
        <Input type="file" bsSize="large" label={uploadLabel} ></Input>
        <br/>
        <Button onClick={this.props.submitAudioFileUpload}><h5>上&nbsp;传</h5></Button>
      </div>
    )
  }
})

export default AudioFileUpload
