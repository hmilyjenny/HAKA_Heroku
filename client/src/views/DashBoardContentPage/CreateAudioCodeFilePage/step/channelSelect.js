import React from 'react';
import { bindActionCreators } from 'redux';
//import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { connect } from 'react-redux';
import {Button,Input,Panel,Well,Form,Radio} from "react-bootstrap";
import { getCategories }  from '../../../../actions/systemActions';
import { savaProjectCategory } from '../../../../actions/projectActions';
import LoadingIndicatior from '../../../../components/LoadingIndicator';


var ChannelSelect = React.createClass({
  getInitialState: function() {
          return {
              loading: true,
              selectChannels:null
          }
  },
  render:function(){
    var _this = this;
    // var channelItems = _this.props.channels.map(function(channel){
    //   return(<Input name='channel' type="checkbox" label={channel.name}
    //   value={channel.code} key={channel._id} />)
    // });
    return(
      <div>
        <Panel header="选择渠道">
          <Well>

          </Well>
          <Button>下一步</Button>
        </Panel>
      </div>
    )
  }
});
const mapStateToProps = (state) => ({
  channels   : state.auth.channels,
  //systemStatusText: state.system.statusText
  //statusText      : state.project.statusText,
  //currentStep:       state.project.step
});


export default ChannelSelect
