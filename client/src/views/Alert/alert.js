import React from 'react';
import {Alert,Fade,Button} from "react-bootstrap";
import './css/alert.css'

var AlertAutoDismissable = React.createClass({
  getInitialState:function() {
    return {
      alertVisible: true,
      msg:'',
      style:'danger'
    };
  },
  componentWillReceiveProps:function(nextProps){
    // this.setState({
    //   alertVisible:nextProps.isShow,
    //   msg:nextProps.msg,
    //   style:nextProps.style||'danger'
    // });
  },
  render:function(){
    if (this.state.alertVisible) {
      return (
        <div>
        <Alert bsStyle={this.state.style} onDismiss={this.handleAlertDismiss} dismissAfter={3000} >
          <h4>提示!</h4>
          <p>{this.state.msg}</p>
        </Alert>
        </div>
      );
    }
  },

  handleAlertDismiss() {
    this.setState({alertVisible: false});
  },

  handleAlertShow() {
    this.setState({alertVisible: true});
  }
});
export default AlertAutoDismissable;
