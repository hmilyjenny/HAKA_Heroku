import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Table, Panel, ButtonGroup, Button, Glyphicon} from "react-bootstrap";
import * as projectActions from '../../../actions/projectActions';
import SearchProjectPage from './searchprojectspage';
import LoadingIndicatior from '../../../components/LoadingIndicator';

var ProjectsPage = React.createClass({
    getInitialState: function () {
        return {
            isSaving: false,
            loading: false,
            projectsList: []
        }
    },
    componentWillMount: function () {
        this.props.getProjectsListInfoActions("");
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            projectsList: nextProps.projectsList,
            isExecing: nextProps.isExecing,
            loading: nextProps.loading
        });
    },
    removeProject: function (e) {
        if (confirm('你确认要删除当前项目(包括项目中的图片与音频文件)?')) {
            let id = e.currentTarget.firstChild.innerText;
            this.props.removeProjectActions(id);
        }
    },
    redirectProject: function (e) {
        let id = e.currentTarget.firstChild.innerText;
        this.props.getProjectByIdActions(id);
    },
    render: function () {
        let _this = this;
        if (this.state.loading) {
            return <LoadingIndicatior />
        } else {
            var projectsItems = this.props.projectsList.map((project, index)=> {
                return (
                    <tr key={project._id}>
                        <td>{index + 1}</td>
                        <td>{project.name}</td>
                        <td>{project.createdAt}</td>
                        <td>{project.state}</td>
                        <td>
                            <ButtonGroup>
                                <Button bsStyle="primary" bsSize="xsmall" onClick={_this.redirectProject}
                                        disabled={_this.state.isSaving}>
                                    <label hidden>{project._id}</label>
                                    <Glyphicon glyph="pencil"/>
                                </Button>
                                <Button bsStyle="danger" bsSize="xsmall" onClick={_this.removeProject}
                                        disabled={_this.state.isSaving}>
                                    <label hidden>{project._id}</label>
                                    <Glyphicon glyph="trash"/>
                                </Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                )
            });
        }
        return (
            <div>
                <Panel header='项目管理'>
                    <SearchProjectPage pState={this.props}/>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>项目名称</th>
                            <th>创建时间</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projectsItems}
                        </tbody>
                    </Table>
                </Panel>
            </div>
        )
    }
});

const mapStateToProps = (state) => ({
    loading: state.project.loading,
    isSaving: state.project.isSaving,
    projectsList: state.project.projectsList,
    statusText: state.project.statusText
});

const mapDispatchToProps = (dispatch) => ({
    getProjectsListInfoActions: bindActionCreators(projectActions.getProjectsListInfo, dispatch),
    getProjectByIdActions: bindActionCreators(projectActions.getProjectById, dispatch),
    removeProjectActions: bindActionCreators(projectActions.removeProject, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);
