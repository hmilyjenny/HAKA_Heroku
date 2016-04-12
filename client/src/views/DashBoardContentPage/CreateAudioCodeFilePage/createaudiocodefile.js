import React from 'react';
import {Label,Panel,Grid,Row,Col,ButtonGroup,ButtonToolbar,Button} from "react-bootstrap";
import ProjectNameCreate from './step/createProjectName';
import ChannelSelect from './step/channelSelect';
import AudioFileUpload from './step/audioFileUpload';
import ImageFileUpload from './step/imageFileUpload';

var CreateAudioCodeFilePage = React.createClass({
  getInitialState: function() {
    return {
      step : 1,

      stepOneStyle:'warning',
      stepTwoStyle:'default',
      stepTreeStyle:'default',
      stepFourStyle:'default',

      stepOneFinished:false,
      stepTwoFinished:false,
      stepTreeFinished:false,
      stepFourFinished:false
    }
  },
  submitProjectName:function(){
    this.setState(
      {
        stepOneStyle:'success',
        stepTwoStyle:'warning',
        stepOneFinished:true,
        step:2
      }
    )
  },
  submitChannelSelect:function(){
    this.setState(
      {
        stepTwoStyle:'success',
        stepTreeStyle:'warning',
        stepTwoFinished:true,
        step:3
      }
    )
  },
  submitAudioFileUpload:function(){
    this.setState(
      {
        stepTreeStyle:'success',
        stepFourStyle:'warning',
        stepTreeFinished:true,
        step:4
      }
    )
  },
  submitImageFileUpload:function(){
    this.setState(
      {
        stepFourStyle:'success',
        stepFourFinished:true
      }
    )
  },
  showStep: function() {
    switch (this.state.step) {
      case 1:
         return <ProjectNameCreate submitProjectName={this.submitProjectName} />
      case 2:
        return <ChannelSelect submitChannelSelect={this.submitChannelSelect} />
      case 3:
          return <AudioFileUpload submitAudioFileUpload={this.submitAudioFileUpload} />
       case 4:
          return <ImageFileUpload submitImageFileUpload={this.submitImageFileUpload} />
    }
  },
  render:function(){
    return(
      <Panel header='创建音码文件向导' >
        <Grid>
          <Row>
            <Col md={3}>
              <h3><Label bsStyle={this.state.stepOneStyle}>步骤一</Label></h3>
            </Col>
            <Col md={3}>
              <h3><Label bsStyle={this.state.stepTwoStyle}>步骤二</Label></h3>
            </Col>
            <Col md={3}>
              <h3><Label bsStyle={this.state.stepTreeStyle}>步骤三</Label></h3>
            </Col>
            <Col md={3}>
              <h3><Label bsStyle={this.state.stepFourStyle}>步骤四</Label></h3>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
               {this.showStep()}
            </Col>
          </Row>
        </Grid>
      </Panel>
    )
  }
});
export default CreateAudioCodeFilePage;
