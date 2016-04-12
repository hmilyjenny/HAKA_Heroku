import React from 'react';
import {Button} from "react-bootstrap";

var ChannelSelect = React.createClass({
  render:function(){
    return(
      <div>
        <h1>ChannelSelect</h1>
        <Button onClick={this.props.submitChannelSelect}>sumbit</Button>
      </div>
    )
  }
})

export default ChannelSelect
