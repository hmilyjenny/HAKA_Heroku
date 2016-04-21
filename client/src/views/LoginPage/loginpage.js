import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import CSSModules from 'react-css-modules';
//import reactMixin from 'react-mixin';
import { Grid,Row,Col,Panel,form,Input,Button,Glyphicon } from 'react-bootstrap';
import styles from './css/login-page.css';

var LoginPage = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function(){
    //const redirectRoute =  '/login';
    return {
      email: '',
      password: '',
      //redirectTo:redirectRoute,
      isAuthenticating:false,
      statusText:''
    };
  },
  componentWillReceiveProps:function(nextProps){
    if((nextProps.auth.isAuthenticating!=this.props.auth.isAuthenticating)||(nextProps.auth.statusText!=this.props.auth.statusText))
    {
      this.setState({
        isAuthenticating:nextProps.auth.isAuthenticating,
        statusText:nextProps.auth.statusText,
        email:'',
        password:''
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
     this.props.login(this.state.email, this.state.password);
  },
  render:function(){
    const mailGlyphicon = <Glyphicon glyph="envelope" />;
    const lockGlyphicon = <Glyphicon glyph="lock" />
    var emailValueLink = this.linkState('email');
    var passwordValueLink = this.linkState('password');
    var emailHandleChange = function(e) {
      emailValueLink.requestChange(e.target.value);
    };
    var passwordHandleChange = function(e) {
      passwordValueLink.requestChange(e.target.value);
    };
    return(
        <Grid styleName="login-box">
          <Row>
            <Col md={12} >
            <div styleName="text-center">
              <h1 styleName="login-brand-text">看理想</h1>
            </div>
            <Panel header={<h3>请登录</h3>} styleName="login-panel">
              <form>
                <fieldset>
                  <Input placeholder="Email"  bsStyle={this.validationEmailState()} hasFeedback
                    type="email" autofocus=""  value={emailValueLink.value} addonBefore={mailGlyphicon} onChange={emailHandleChange}/>
                  <Input placeholder="Password" type="password"  bsStyle={this.validationPasswordState()} hasFeedback
                    value={passwordValueLink.value} addonBefore={lockGlyphicon} onChange={passwordHandleChange} />
                  <Input type="checkbox" label="记住我" />
                  <Button onClick={this.onSubmitEvent} bsSize="large" bsStyle="primary" disabled={this.state.isAuthenticating} block>登 录</Button>
                  <br/>
                  <div styleName="text-center">
                    <p>-或-</p>
                    <Button bsStyle="success" block>用 微 信 登 录</Button>
                    <Button bsStyle="danger" block>用 微 博 登 录</Button>
                  </div>
                </fieldset>
              </form>
              <br/>
              <div styleName="text-right">
                <a href="#">忘了密码</a><br/>
                <a href="/register" className="text-center">注册新用户</a>
              </div>
              { this.state.statusText ? <p > {this.state.statusText}</p> : null }
            </Panel>
            </Col>
          </Row>
        </Grid>
    )
  }
});
const option = {
  'allowMultiple': true
};
export default CSSModules(LoginPage, styles, option);
