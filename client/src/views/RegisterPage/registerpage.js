import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import CSSModules from 'react-css-modules';
//import reactMixin from 'react-mixin';
import { Grid,Row,Col,Panel,form,Input,Button,Glyphicon } from 'react-bootstrap';
import styles from './css/register-page.css';

var RegisterPage = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function(){
    const redirectRoute = '/login';
    return {
      email: '',
      password: '',
      inviteCode:'',
      phone:'',
      redirectTo:redirectRoute,
      isRegistering:false,
      statusText:''
    };
  },
  componentWillReceiveProps:function(nextProps){
    if((nextProps.auth.isRegistering!=this.props.auth.isRegistering)||
      (nextProps.auth.statusText!=this.props.auth.statusText))
    {
      this.setState({
        isRegistering:nextProps.auth.isRegistering,
        statusText:nextProps.auth.statusText,
        email: '',
        password: '',
        inviteCode:'',
      });
    }
  },
  validationEmailState:function(){
    if(this.state.email.length>0)
    {
      var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if(re.test(this.state.email)){
        return 'success';
      }
      else{
        return 'error';
      }
    }
  },
  validationPasswordState:function(){
    if(this.state.password.length>0)
    {
      if(this.state.password.length<5){
        return 'error';
      }
      else {
        return 'success';
      }
    }
  },
  onSubmitEvent:function(event){
     event.preventDefault();
     this.props.register(this.state.email, this.state.password,this.state.inviteCode, this.state.redirectTo);
  },
  render:function(){
    const mailGlyphicon = <Glyphicon glyph="envelope" />;
    const lockGlyphicon = <Glyphicon glyph="lock" />;
    const grainGlyphicon = <Glyphicon glyph="grain" />;
    var emailValueLink = this.linkState('email');
    var passwordValueLink = this.linkState('password');
    var emailHandleChange = function(e) {
      emailValueLink.requestChange(e.target.value);
    };
    var passwordHandleChange = function(e) {
      passwordValueLink.requestChange(e.target.value);
    };
    return(
      <Grid styleName="register-box">
        <Row>
          <Col md={4} mdOffset={4}>
          <div styleName="text-center">
            <h1 styleName="register-brand-text">看理想</h1>
          </div>
          <Panel header={<h3>请注册</h3>} styleName="register-panel">
            <form>
              <fieldset>
                <Input placeholder="Email"  bsStyle={this.validationEmailState()} hasFeedback
                  type="email" autofocus=""  value={emailValueLink.value} addonBefore={mailGlyphicon} onChange={emailHandleChange}/>
                <Input placeholder="Password" type="password"  bsStyle={this.validationPasswordState()} hasFeedback
                  value={passwordValueLink.value} addonBefore={lockGlyphicon} onChange={passwordHandleChange} />
                <Input placeholder="邀请码" type="text" hasFeedback
                    valueLink={this.linkState('inviteCode')} addonBefore={grainGlyphicon}  />
                <Button onClick={this.onSubmitEvent} bsSize="large" bsStyle="primary" disabled={this.state.isRegistering} block>注 册</Button>
                <br/>
                <div styleName="text-center">
                  <p>-或-</p>
                  <Button bsStyle="success" block>用 微 信 注 册</Button>
                  <Button bsStyle="danger" block>用 微 博 注 册</Button>
                </div>
              </fieldset>
            </form>
            <br/>
            <div styleName="text-right">
              <a href="/login">已有用户</a><br/>
            </div>
            { this.state.statusText ? <p > {this.state.statusText}</p> : null }
          </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
})

const option = {
  'allowMultiple': true
};
export default CSSModules(RegisterPage, styles, option);
