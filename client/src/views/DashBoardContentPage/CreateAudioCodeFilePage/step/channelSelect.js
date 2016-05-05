import React from 'react';
import {bindActionCreators} from 'redux';
//import LinkedStateMixin from 'react-addons-linked-state-mixin';
import {connect} from 'react-redux';
import {Button, Input, Panel, Well, Form, Radio} from "react-bootstrap";
import {savaProjectChannels} from '../../../../actions/projectActions';
import {getChannelsAll} from '../../../../actions/channelsActions';
//import LoadingIndicatior from '../../../../components/LoadingIndicator';


var ChannelSelect = React.createClass({
    getInitialState: function () {
        return {
            selectChannels: []
        }
    },
    componentWillMount: function () {
        if (this.props.channels.length === 0)
            this.props.getchannelsDataActions("");
    },
    changeSelection: function (e) {
        if (e.target.checked) {
            var selectChannel = JSON.parse(e.target.value);
            this.setState({
                selectChannels: this.state.selectChannels.concat(selectChannel)
            });
        }
        else {
            var unSelectChannel = JSON.parse(e.target.value);
            this.setState({
                selectChannels: this.state.selectChannels.filter(function (channel) {
                    return channel._id != unSelectChannel._id;
                })
            });
        }
    },
    nextStep: function () {
        //console.log(this.state.selectChannels);
        this.props.savaProjectChannels(this.props.currentStep, this.state.selectChannels);
    },
    render: function () {
        var _this = this;
        var channelItems = _this.props.channels.map(function (channel) {
            return (<Input name='channel' type="checkbox" label={channel.channelName}
                           value={JSON.stringify(channel)} key={channel._id} onChange={_this.changeSelection}/>)
        });
        return (
            <div>
                <Panel header="选择渠道">
                    <Well>
                        {channelItems}
                    </Well>
                    <Button onClick={_this.nextStep}>下一步</Button>
                </Panel>
            </div>
        )
    }
});
const mapStateToProps = (state) => ({
    channels: state.channels.channelsData
});
const mapDispatchToProps = (dispatch) => ({
    savaProjectChannels: bindActionCreators(savaProjectChannels, dispatch),
    getchannelsDataActions: bindActionCreators(getChannelsAll, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelSelect);
