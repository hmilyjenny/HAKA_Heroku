import React from 'react';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import Dropzone from 'react-dropzone'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {savaProjectImageFiles, setProjectStep} from '../../../../actions/projectActions';
//import '../css/filepicker.css';
//import '../css/dropzone.css'

var ImageFileUpload = React.createClass({
    getInitialState: function () {
        return {
            files: []
        };
    },
    onDrop: function (files) {
        this.setState({
            files: files
        });
    },
    onOpenClick: function () {
        this.refs.dropzone.open();
    },
    onRemoveClick: function (e) {
        let tmpindex = e.currentTarget.firstChild.innerText;
        let tmpfiles = this.state.files;
        tmpfiles.splice(tmpindex, 1);
        this.setState({
            files: tmpfiles
        });
    },
    nextStep: function (e) {
        e.preventDefault();
        if (!this.state.files || this.state.files.length === 0)return;
        this.props.savaProjectImageFiles(this.props.currentStep, this.state.files);
    },
    EditAudio: function (e) {
        e.preventDefault();
        this.props.setProjectStepActions(this.props.currentStep);
    },
    render: function () {
        let imageContent = this.state.files.map((file, index)=> {
            return (
                <div key={index} style={{height:"120px",width:"120px",display:"table",textAlign:"center",float:"left"}}>
                    <span style={{display:"table-cell",verticalAlign:"middle"}}>
                        <a onClick={this.onRemoveClick} title={"点击删除:"+file.name} href="javascript:;">
                            <label hidden>{index}</label>
                            <img src={file.preview} style={{maxHeight:"120px",width:"auto",maxWidth:"120px"}}/>
                        </a>
                    </span>
                </div>
            );
        });
        let imageItems;
        if (this.state.files && this.state.files.length > 0) {
            imageItems = <div
                style={{height:"200px",width:"560px",overflow:"auto",border:"1px solid #E0E0E0"}}>{imageContent}</div>;
        }
        else {
            imageItems = null;
        }
        //按图片分三行
        // var showImageRows = function(){
        //   var i,j,chunk = 3;
        //   var sets = [];
        //   for (i=0,j=this.state.files.length; i<j; i+=chunk) {
        //     sets.push(this.state.files.slice(i,i+chunk));
        //   }
        //   var imageRows=sets.map(function(imageFiles){
        //     return(
        //       <Row>
        //         imageFiles.map(function(file) {
        //           return(
        //             <Col md={2}>
        //                <Thumbnail src={file.preview} />
        //             </Col>
        //           )
        //         })
        //       </Row>
        //     )
        //   });
        //   return imageRows
        // };
        let nextStepEle = null;
        if (this.props.currentStep === 5 && this.props.imageFiles && this.props.imageFiles.length > 0)
            nextStepEle = (<Button bsStyle="primary" onClick={this.EditAudio}>编辑音码文件</Button>);
        else
            nextStepEle = null;
        return (
            <Grid>
                <Row>
                    <Col md={3}>
                        <Dropzone ref="dropzone" onDrop={this.onDrop} multiple={true} accept="image/*">
                            <div>拖拽文件入内</div>
                        </Dropzone>
                    </Col>
                    <Col md={3}>
                        <Grid>
                            <Row>
                                {imageItems}
                            </Row>
                        </Grid>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Button onClick={this.nextStep}>上传</Button>
                        {nextStepEle}
                    </Col>
                </Row>
            </Grid>
        );
    }
});

const mapDispatchToProps = (dispatch) => ({
    savaProjectImageFiles: bindActionCreators(savaProjectImageFiles, dispatch),
    setProjectStepActions: bindActionCreators(setProjectStep, dispatch)
});
export default connect(null, mapDispatchToProps)(ImageFileUpload);
