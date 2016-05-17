import React from 'react';
import {connect} from 'react-redux';
import ProjectsPage from '../../views/DashBoardContentPage/ProjectsPage/projectspage';
import CreateAudioCodeFilePage from '../../views/DashBoardContentPage/CreateAudioCodeFilePage/createaudiocodefile';
import EditAudioCodeFilePage from '../../views/DashBoardContentPage/EditAudioCodeFilePage/editaudiocodefile';
import CreateChannelsPage from '../../views/DashBoardContentPage/CreateChannelsPage/createchannelspage';
import PreviewPage from "../../views/PreviewPage/previewpage";

var ContentContainer = React.createClass({
    getInitialState: function () {
        return {
            loadComponent: '',
            redirectPage: ''
        }
    },
    componentWillMount: function () {
        this.setState(
            {
                loadComponent: 'ProjectsPage',
                redirectPage: ''
            }
        )
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.redirectPage === "CreateAudioCodeFilePage") {
            this.setState({loadComponent: nextProps.redirectPage});
        }
        this.setState({redirectPage: nextProps.redirectPage});
    },
    //根据组件名称渲染不同组件
    bundle: function (location) {
        this.setState({
            loadComponent: location,
            redirectPage: ''
        })
    },
    render: function () {
        var component = null;
        if (this.state.loadComponent == 'ProjectsPage') {
            component = <ProjectsPage {...this.props} />
        }
        else if (this.state.loadComponent == 'CreateAudioCodeFilePage') {
            component = <CreateAudioCodeFilePage {...this.props} newP="1"/>
        }
        else if (this.state.loadComponent == 'CreateChannelsPage') {
            component = <CreateChannelsPage {...this.props} />
        }
        else if (this.state.loadComponent == 'PreviewPage') {
            component = <PreviewPage {...this.props} />
        }
        else if(this.state.loadComponent=='EditAudioCodeFilePage')
        {
            component=<EditAudioCodeFilePage {...this.props} />
        }
        if (this.state.redirectPage == 'CreateAudioCodeFilePage') {
            component = <CreateAudioCodeFilePage {...this.props} />
        }
        return (
            <div>{component}</div>
        )
    }
});

const mapStateToProps = (state) => ({
    redirectPage: state.project.redirectPage
});

export default connect(mapStateToProps, null, null, {withRef: true})(ContentContainer);
