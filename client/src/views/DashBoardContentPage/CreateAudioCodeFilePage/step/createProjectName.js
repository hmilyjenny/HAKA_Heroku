import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import {Button,Input,Panel} from "react-bootstrap";

var ProjectNameCreate = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState:function(){
    return{
      projectName:''
    }
  },
  render:function(){
    var projectNameValueLink = this.linkState('projectName');
    var handleChange = function(e) {
      projectNameValueLink.requestChange(e.target.value);
    };
    return(
      <div>
        <Panel header="建立项目名称">
          <Input type="text" bsSize="large" placeholder="项目名称" label="项目名称" />
          <Button>下一步</Button>
        </Panel>
      </div>
    )
  }
})
export default ProjectNameCreate
