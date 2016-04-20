import React from 'react';
import {Button,Input,Panel,Well} from "react-bootstrap";

var ChannelSelect = React.createClass({
  render:function(){
    return(
      <div>
        <Panel header="选择渠道">
          <Well>
            <Input type="select" label="渠道选择" placeholder="select" multiple>
              <option value="select">渠道一</option>
              <option value="other">渠道二</option>
            </Input>
          </Well>
          <Button onClick={this.props.submitChannelSelect}>下一步</Button>
        </Panel>
      </div>
    )
  }
})

export default ChannelSelect
