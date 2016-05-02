import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Panel, Table, Button, Glyphicon, Modal, Input, FormGroup, InputGroup, FormControl} from "react-bootstrap";
import * as channelsActions from '../../../actions/channelsActions';
import LoadingIndicatior from '../../../components/LoadingIndicator';

var CreateChannelsPage = React.createClass({
    getInitialState: function () {
        return {
            code: "",
            name: "",
            showModal: false,
            channelsData: [],
            isExecing: false,
            loading: false
        }
    },
    componentWillMount: function () {
        this.props.getchannelsDataActions();
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            channelsData: nextProps.channelsData,
            isExecing: nextProps.isExecing,
            loading: nextProps.loading
        });
    },
    removeChannels: function (e) {
        let id = e.currentTarget.firstChild.innerText;
        this.props.removechannelsActions(id);
    },
    createChannels: function () {
        let code = this.state.code;
        let name = this.state.name;
        this.props.createchannelsActions(code, name);
        this.setState({showModal: false});
    },
    btnClose: function () {
        this.setState({showModal: false});
    },
    btnOpen: function () {
        this.setState({showModal: true});
    },
    getCodeValidationState: function () {
        let length = this.state.code.length;
        if (length > 0) return 'success';
        else return 'error';
    },
    getNameValidationState: function () {
        let length = this.state.name.length;
        if (length > 0) return 'success';
        else return 'error';
    },
    codehandleChange: function (e) {
        this.setState({code: e.target.value});
    },
    namehandleChange: function (e) {
        this.setState({name: e.target.value});
    },
    render: function () {
        let _this = this;
        if (this.state.loading) {
            return <LoadingIndicatior />
        } else {
            var channelsItems = this.props.channelsData.map(function (channels, index) {
                return (
                    <tr key={channels._id}>
                        <td>{index + 1}</td>
                        <td>{channels.channelCode}</td>
                        <td>{channels.channelName}</td>
                        <td>
                            <Button bsStyle="danger" bsSize="xsmall" onClick={_this.removeChannels}
                                    disabled={_this.state.isExecing}>
                                <label hidden>{channels._id}</label>
                                <Glyphicon glyph="trash"/>
                            </Button>
                        </td>
                    </tr>
                )
            });
        }
        return (
            <div>
                <Panel header='渠道管理'>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>渠道编码</th>
                            <th>渠道名称</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {channelsItems}
                        </tbody>
                    </Table>
                    <Button bsStyle="primary" onClick={this.btnOpen}><Glyphicon glyph="plus"/>添加</Button>
                    <Modal
                        show={this.state.showModal} onHide={this.btnClose} container={this}
                        aria-labelledby="contained-modal-title">
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">添加渠道</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label>渠道编码与名称不可重复</label>
                            <Input placeholder="请填写渠道编码  如:0001" bsStyle={this.getCodeValidationState()} hasFeedback
                                   type="text" autofocus="" onChange={this.codehandleChange}/>
                            <Input placeholder="请填写渠道名称 如:我的渠道" bsStyle={this.getNameValidationState()} hasFeedback
                                   type="text" onChange={this.namehandleChange}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="primary" onClick={this.createChannels}
                                    disabled={this.state.isExecing}>提交</Button>
                            <Button bsStyle="primary" onClick={this.btnClose}>关闭</Button>
                        </Modal.Footer>
                    </Modal>
                </Panel>
            </div>
        )
    }
});

const mapStateToProps = (state) => ({
    loading: state.channels.loading,
    isExecing: state.channels.isExecing,
    channelsData: state.channels.channelsData,
    statusText: state.channels.statusText
});

const mapDispatchToProps = (dispatch) => ({
    getchannelsDataActions: bindActionCreators(channelsActions.getChannelsAll, dispatch),
    createchannelsActions: bindActionCreators(channelsActions.createChannels, dispatch),
    removechannelsActions: bindActionCreators(channelsActions.removeChannels, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannelsPage);