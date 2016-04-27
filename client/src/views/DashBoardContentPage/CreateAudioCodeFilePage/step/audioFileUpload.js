import React from 'react';
import {Button,Input,Glyphicon} from "react-bootstrap";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { savaProjectAudioFile } from '../../../../actions/projectActions';
import '../css/create-audiocode.css';

var AudioFileUpload = React.createClass({
  getInitialState: function() {
          return {
              file:null
          }
  },
  nextStep:function(e){
    e.preventDefault();
    //console.log(this.state.file);
    this.props.savaProjectAudioFile(this.props.currentStep,this.state.file);
  },
  changeSelection:function(e){
    this.setState({
      file:e.target.files[0]
    });
  },
  render:function(){
    const glyphFile = <Button><Glyphicon glyph="folder-open" /></Button>
    const uploadLabel =<i><Glyphicon glyph="folder-open" />上传音频文件</i>
    return(
      <div className="audioUpload">
        <br/>
        <form>
        <Input name="file" type="file" accept=".mp3" bsSize="large" label={uploadLabel} onChange={this.changeSelection} ></Input>
        <br/>
        <Button type="submit" onClick={this.nextStep}>上传</Button>
        </form>
      </div>
    )
  }
});
const mapDispatchToProps = (dispatch) => ({
  savaProjectAudioFile : bindActionCreators(savaProjectAudioFile,dispatch)
});

export default connect(null, mapDispatchToProps)(AudioFileUpload);
