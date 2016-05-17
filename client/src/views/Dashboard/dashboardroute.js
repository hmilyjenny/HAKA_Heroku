import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DashBoardLayout from './dashboardlayout';
import * as actionCreators from '../../actions/authActions';


var DashBoardRoute = React.createClass({
    logout: function () {
        this.props.actions.logoutAndRedirect();
    },
    render: function () {
        return (
            <DashBoardLayout {...this.props} logout={this.logout}/>
        )
    }
});

const mapStateToProps = (state) => ({
    role: state.auth.role,
    token: state.auth.token
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(DashBoardRoute);
