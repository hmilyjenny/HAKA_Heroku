import React from 'react';
import {Button} from "react-bootstrap";

var ChannelSelect = React.createClass({
  render:function(){
    return(
      <div>
        <h1>选择渠道与品类</h1>
        <Button onClick={this.props.submitChannelSelect}>sumbit</Button>
      </div>
    )
  }
})

export default ChannelSelect
