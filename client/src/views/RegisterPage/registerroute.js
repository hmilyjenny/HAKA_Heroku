import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RegisterPage from './registerpage';
import * as actionCreators from '../../actions/authActions';

var RegisterRoute = React.createClass({
    register:function(email,password,inviteCode,redirectRoute){
      this.props.actions.register(email,password,inviteCode,redirectRoute);
    },
    render:function(){
     const redirectRoute = '/login';
      return(
        <RegisterPage auth={this.props} register={this.register}/>
      )
    }
});

const mapStateToProps = (state) => ({
  isRegistering   : state.auth.isRegistering,
  statusText         : state.auth.statusText
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterRoute);
