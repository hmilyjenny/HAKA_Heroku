import React from 'react';
import {Button,Input,Panel,Well} from "react-bootstrap";

var CategorySelect = React.createClass({
  render:function(){
    return(
      <div>
        <Panel header="选择品类">
          <Well>
             <Input type="radio" label="品类A"  />
             <Input type="radio" label="品类B"  />
             <Input type="radio" label="品类C"  />
          </Well>
          <Button onClick={this.props.submitChannelSelect}>下一步</Button>
        </Panel>
      </div>
    )
  }
})

export default CategorySelect
