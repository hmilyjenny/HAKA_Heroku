import React from 'react';
import {Button} from "react-bootstrap";

var ProjectNameCreate = React.createClass({
  render:function(){
    return(
      <div>
        <h1>ProjectNameCreate</h1>
        <Button onClick={this.props.submitProjectName}>sumbit</Button>
      </div>
    )
  }
})
export default ProjectNameCreate
