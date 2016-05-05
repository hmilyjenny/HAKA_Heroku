import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Panel, Button, Glyphicon, Modal, Input} from "react-bootstrap";

var ThumbnailsImgsPage = React.createClass({
    getInitialState: function () {
        return {
            showModal: false,
            imageAccessURL: "",
            description: ""
        }
    },
    btnClose: function () {
        this.setState({showModal: false});
    },
    btnOpen: function (e) {
        let accessURL = e.currentTarget.childNodes[0].src;
        accessURL = accessURL.replace("getFileThumbnails", "getFileImage")
        this.setState({showModal: true, imageAccessURL: accessURL});
    },
    handleChange:function(e){
        this.setState({description: e.target.value});
    },
    render: function () {
        let imgList = this.props.imglist.map((img)=> {
            // let blob = new Blob(img.imageBuffer.data,{ "type" : "image\/png" });
            // {window.URL.createObjectURL(blob)}
            let tmpimgurl = "http://localhost:8000/api/projectnotoken/getFileThumbnails/" + this.props.projectID + "/" + img._id;
            return (
                <div key={img.imageId} style={{height:"80px",width:"80px",float:"left"}}>
                    <a href="javascript:;" onClick={this.btnOpen}>
                        <img src={tmpimgurl}/>
                    </a>
                </div>
            );
        });
        return (
            <div style={{height:"98px",overflow:"auto",border:"1px solid #E0E0E0"}}>
                {imgList}
                <Modal
                    show={this.state.showModal} onHide={this.btnClose} container={this}
                    aria-labelledby="contained-modal-title" bsSize="large">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">设置图片</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{height:"400px",border:"0px solid #E0E0E0"}}>
                            <div style={{height:"400px",width:"560px",border:"0px solid red",float:"left"}}>
                                <img src={this.state.imageAccessURL} style={{height:"390px",width:"550px"}}/>
                            </div>
                            <div style={{height:"400px",width:"300px",border:"0px solid blue",float:"left"}}>
                                请填写图片文字说明:
                                <Input placeholder="" type="textarea" style={{height:"300px",resize:"none"}} onChange={this.handleChange}/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.btnClose}>关闭</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
});

const mapStateToProps = (state) => ({
    imglist: state.project.imageFiles,
    projectID: state.project.projectId
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ThumbnailsImgsPage);