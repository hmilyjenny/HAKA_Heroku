import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginPage from './loginpage';
import * as actionCreators from '../../actions/authActions';

var LoginRoute = React.createClass({
    getInitialState:function(){
      return {
        redirectRoute:this.props.location.query.next||'/login'
      }
    },

    login:function(email,password){
      this.props.actions.loginUser(email,password,this.state.redirectRoute);
    },

    render:function(){
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
