import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Label, Panel, Grid, Row, Col, ButtonGroup, ButtonToolbar, Button} from "react-bootstrap";
import ProjectNameCreate from './step/createProjectName';
import CategorySelect from './step/categorySelect';
import ChannelSelect from './step/channelSelect';
import AudioFileUpload from './step/audioFileUpload';
import ImageFileUpload from './step/imageFileUpload';
import EditAudioCodeFilePage from '../EditAudioCodeFilePage/editAudioCodeFilePage';
import * as actionCreators from '../../../actions/projectActions';
//import LoadingIndicatior from '../../../components/LoadingIndicator';
//import AlertAutoDismissable from '../../Alert/alert';

//没有完成错误报告机制，目标为主界面下部中心位置淡出错误提示
var CreateAudioCodeFilePage = React.createClass({
    getInitialState: function () {
        return {
            showErrMsg: false,
            step: 1,
            stepOneStyle: 'warning',
            stepTwoStyle: 'default',
            stepTreeStyle: 'default',
            stepFourStyle: 'default',
            setpFiveStyle: 'default',
            setpSixStyle: 'default'
        }
    },
    componentWillMount: function () {
        if (!this.props.projectID) {
            this.setComponentsState(1);
        }
        else {
            this.props.actions.getProjectById(this.props.projectID);
            this.setComponentsState(this.props.currentStep);
        }
    },
    componentWillReceiveProps: function (nextProps) {
        //console.log('step 1')
        //如果步骤改变进行渲染
        if (nextProps.currentStep != this.props.currentStep) {
            this.setComponentsState(nextProps.currentStep);
        }
        else if (nextProps.currentStep == this.props.currentStep) {
            this.setState({
                showErrMsg: true
            })
        }
    },
    setComponentsState: function (currentStep) {
        switch (currentStep) {
            case 1:
                this.setState(
                    {
                        stepOneStyle: 'warning',
                        step: currentStep
                    }
                )
                break;
                break;
            case 2:
                this.setState(
                    {
                        stepOneStyle: 'success',
                        stepTwoStyle: 'warning',
                        // stepOneFinished:true,
                        step: currentStep
                    }
                )
                break;
            case 3:
                this.setState(
                    {
                        stepOneStyle: 'success',
                        stepTwoStyle: 'success',
                        stepTreeStyle: 'warning',
                        // stepTwoFinished:true,
                        step: currentStep
                    }
                )
                break;
            case 4:
                this.setState(
                    {
                        stepOneStyle: 'success',
                        stepTwoStyle: 'success',
                        stepTreeStyle: 'success',
                        stepFourStyle: 'warning',
                        // stepTreeFinished:true,
                        step: currentStep
                    }
                )
                break;
            case 5:
                this.setState(
                    {
                        stepOneStyle: 'success',
                        stepTwoStyle: 'success',
                        stepTreeStyle: 'success',
                        stepFourStyle: 'success',
                        stepFiveStyle: 'warning',
                        // stepFourFinished:true,
                        step: currentStep
                    }
                )
            case 6:
                this.setState(
                    {
                        stepOneStyle: 'success',
                        stepTwoStyle: 'success',
                        stepTreeStyle: 'success',
                        stepFourStyle: 'success',
                        stepFiveStyle: 'success',
                        setpSixStyle: 'warning',
                        step: currentStep
                    }
                )
                break;
        }
    },
    showStep: function () {
        switch (this.state.step) {
            case 1:
                return <ProjectNameCreate {...this.props}  />
            case 2:
                return <CategorySelect {...this.props} />
            case 3:
                return <ChannelSelect {...this.props}  />
            case 4:
                return <AudioFileUpload {...this.props}  />
            case 5:
                return <ImageFileUpload {...this.props} />
            case 6:
                return <EditAudioCodeFilePage {...this.props} />
        }
    },
    render: function () {
        return (
            <div>
                <Panel header='创建音码文件向导'>
                    <Grid>
                        <Row>
                            <Col md={2} mdOffset={1}>
                                <h3><Label bsStyle={this.state.stepOneStyle}>步骤一</Label></h3>
                            </Col>
                            <Col md={2}>
                                <h3><Label bsStyle={this.state.stepTwoStyle}>步骤二</Label></h3>
                            </Col>
                            <Col md={2}>
                                <h3><Label bsStyle={this.state.stepTreeStyle}>步骤三</Label></h3>
                            </Col>
                            <Col md={2}>
                                <h3><Label bsStyle={this.state.stepFourStyle}>步骤四</Label></h3>
                            </Col>
                            <Col md={2}>
                                <h3><Label bsStyle={this.state.stepFiveStyle}>步骤五</Label></h3>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col md={9} mdOffset={1}>
                                {this.showStep()}
                            </Col>
                        </Row>
                    </Grid>
                </Panel>
            </div>
        )
    }
});
const mapStateToProps = (state) => ({
    // projectName   : state.project.projectName,
    // category :  state.project.category,
    // channels:  state.project.channels,
    // audioFile:  state.project.audioFile,
    // imageFiles: state.project.imageFiles,
    // isSaving: state.project.isSaving,
    // statusText      : state.project.statusText,
    currentStep: state.project.step,
    projectID: state.project.projectId
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAudioCodeFilePage);
