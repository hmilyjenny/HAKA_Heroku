import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import {Button, Input, Panel} from "react-bootstrap";
import * as actionCreators from '../../../../actions/projectActions';

var ProjectNameCreate = React.createClass({
    mixins: [LinkedStateMixin],
    getInitialState: function () {
        return {
            projectName: ''
            // isSaving:false,
            // statusText:''
        }
    },
    componentWillMount: function () {

    },
    submit: function () {
        this.props.actions.createProjectName(this.state.projectName, 1, this.props.token);
    },
    render: function () {
        var projectNameValueLink = this.linkState('projectName');
        var handleChange = function (e) {
            projectNameValueLink.requestChange(e.target.value);
        };
        return (
            <div>
                <Panel header="建立项目名称">
                    <Input type="text" bsSize="large" placeholder="项目名称" label="项目名称"
                           value={projectNameValueLink.value} onChange={handleChange}/>
                    <Button onClick={this.submit} disabled={this.props.isSaving}>下一步</Button>
                </Panel>
            </div>
        )
    }
})
const mapStateToProps = (state) => ({
    projectName: state.project.projectName,
    isSaving: state.project.isSaving,
    //statusText      : state.project.statusText,
    //currentStep:       state.project.step
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(ProjectNameCreate)
