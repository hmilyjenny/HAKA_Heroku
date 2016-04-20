import React from 'react';
import {Alert,Fade,Button} from "react-bootstrap";
import './css/alert.css'

const AlertAutoDismissable = React.createClass({
  getInitialState() {
    return {
      alertVisible: true
    };
  },

  render() {
    if (this.state.alertVisible) {
      return (
        <div className="alert">
        <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss} dismissAfter={3000} >
          <h4>Oh snap! You got an error!</h4>
          <p>But this will hide after 2 seconds.</p>
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
