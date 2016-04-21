import React,{PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import { Navbar,Nav,NavItem,Grid,Row,Col,NavDropdown,Glyphicon} from 'react-bootstrap';
import {Link} from 'react-router';
import styles from './css/landing-page.css';
import ipadImg from './img/ipad.png';
import dogImg from './img/dog.png';
import phoneImg from './img/phones.png';


var LandingPage = React.createClass({
  componentDidMount: function() {
  },
  render:function(){
    return(
      <div styleName ="landing-page">
        {/*navbar*/}
        <Navbar fixedTop={true} styleName="topnav">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#" >理想国</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Nav pullRight>
          {/*<NavItem href="/login">论坛</NavItem>*/}
            <li><Link to="#">论坛</Link></li>
            <li><Link to="/dashboard">控制面板</Link></li>
          </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/*header*/}
        <div styleName="intro-header">
          <Grid>
              <Row>
                  <Col lg={12}>
                      <div styleName="intro-message">
                          <h1>Landing Page</h1>
                          <h3>A Template by Start Bootstrap</h3>
                          <hr styleName="intro-divider" />
                      </div>
                  </Col>
              </Row>
          </Grid>
        </div>

        {/*Page Content*/}
        <div styleName="content-section-a">
          <Grid>
            <Row>
              <Col lg={5} sm={6}>
                <hr styleName="section-heading-spacer" />
                <h2 styleName="section-heading">
                  Death to the Stock Photo:
                  <br />Special Thanks
                </h2>
                <p styleName="lead">
                  A special thanks to
                  <a target="_blank" href="#">
                    Death to the Stock Photo
                  </a>
                    for providing the photographs that you see in this template. Visit their website to become a member.
                </p>
              </Col>
              <Col lg={5} lgOffset={2} sm={6}>
                  <img  src={ipadImg} alt="" responsive />
              </Col>
            </Row>
          </Grid>
        </div>
        <div styleName="content-section-b">
          <Grid>
              <Row>
                  <Col lg={5} lgOffset={1} smPush={6} sm={6}>
                      <hr styleName="section-heading-spacer" />
                      <h2 styleName="section-heading">3D Device Mockups<br />by PSDCovers</h2>
                      <p styleName="lead">
                        Turn your 2D designs into high quality, 3D product shots in seconds using free Photoshop actions by PSDCovers! Visit their website to download some of their awesome, free photoshop actions!
                      </p>
                  </Col>
                  <Col lg={5} smPull={6} sm={6} >
                      <img src={dogImg} alt="" responsive />
                  </Col>
              </Row>
          </Grid>
        </div>
        <div styleName="content-section-a">
          <Grid>
              <Row>
                  <Col lg={5} sm={5}>
                      <hr styleName="section-heading-spacer" />
                      <h2 styleName="section-heading">Google Web Fonts and<br />Font Awesome Icons</h2>
                      <p styleName="lead">
                        This template features the 'Lato' font, part of the Google Web Font library, as well as icons from Font Awesome.
                      </p>
                  </Col>
                  <Col lg={5} lgOffset={2} sm={6} >
                      <img  src={phoneImg} alt="" responsive/>
                  </Col>
              </Row>
          </Grid>
        </div>
        <div styleName="banner">
          <Grid>
              <Row>
                  <Col lg={6} >
                      <h2>Connect to Start Bootstrap:</h2>
                  </Col>
                  <Col lg={6}>
                  </Col>
              </Row>
          </Grid>
        </div>
        {/*footer*/}
        <footer>
          <Grid>
              <Row>
                <Col lg={12} >
                    <ul>
                        <li>&sdot;</li>
                        <li>
                            <a href="#">关于</a>
                        </li>
                        <li >&sdot;</li>
                        <li>
                            <a href="#">服务</a>
                        </li>
                        <li>&sdot;</li>
                        <li>
                            <a href="#">联系我们</a>
                        </li>
                    </ul>
                    <p styleName="copyright">Copyright &copy; Your Company 2016. All Rights Reserved</p>
                </Col>
              </Row>
          </Grid>
        </footer>
      </div>
    )
  }
});
const option = {
  'allowMultiple': true
};
export default CSSModules(LandingPage, styles, option);
