import React from 'react';
import {Button, Grid, Row, Col, Thumbnail, Image} from 'react-bootstrap';
import Dropzone from 'react-dropzone'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {savaProjectImageFiles} from '../../../../actions/projectActions';
//import '../css/filepicker.css';
//import '../css/dropzone.css'

var ImageFileUpload = React.createClass({
    getInitialState: function () {
        return {
            files: []
        };
    },

    onDrop: function (files) {
        console.log(files);
        this.setState({
            files: files
        });
    },

    onOpenClick: function () {
        this.refs.dropzone.open();
    },
    nextStep: function (e) {
        e.preventDefault();
        //console.log(this.state.file);
        this.props.savaProjectImageFiles(this.props.currentStep, this.state.files);
    },
    EditAudio: function () {
        
    },
    render: function () {
        var imageItems = this.state.files.map(function (file) {
            return (
                <Col md={2}>
                    <Thumbnail src={file.preview} key={file.lastModified}/>
                </Col>
            )
        });
        //按三图片一行
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
        return (
            <div>
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
                            <Button bsStyle="primary" onClick={this.EditAudio}>编辑音码文件</Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});
const mapDispatchToProps = (dispatch) => ({
    savaProjectImageFiles: bindActionCreators(savaProjectImageFiles, dispatch)
});
export default connect(null, mapDispatchToProps)(ImageFileUpload);
