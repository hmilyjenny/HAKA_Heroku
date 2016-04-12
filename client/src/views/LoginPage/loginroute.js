import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginPage from './loginpage';
import * as actionCreators from '../../actions/authActions';

var LoginRoute = React.createClass({
    login:function(email,password,redirectRoute){
      this.props.actions.loginUser(email,password,redirectRoute);
    },
    render:function(){
     const redirectRoute = this.props.location.query.next || '/login';
      return(
        <LoginPage auth={this.props} login={this.login}/>
      )
    }
});

const mapStateToProps = (state) => ({
  isAuthenticating   : state.auth.isAuthenticating,
  statusText         : state.auth.statusText
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginRoute);
