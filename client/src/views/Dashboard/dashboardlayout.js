import React from "react";
import $ from 'jquery';
import {Link} from 'react-router';
import {
    Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon,
    Grid, Row, Col, Collapse
} from "react-bootstrap";
import CSSModules from 'react-css-modules';
import ContentContainer from './contentContainer';
import styles from "./css/dashboard.css";

var DashBoardLayout = React.createClass({
    getInitialState: function () {
        return {
            isOpenSubItem: false
        }
    },
    componentWillMount: function () {
        this.setState({Height: $(window).height()});
    },
    componentWillUnmount: function () {
        $(window).unbind('resize', this.adjustResize);
    },
    //选择所需渲染的组件
    handleSelect(selectedKey) {
        if (selectedKey == 1) {
            this.refs.cc.bundle('ProjectsPage');
        } else if (selectedKey == 2) {
            this.refs.cc.bundle('CreateAudioCodeFilePage');
        } else if (selectedKey == 5) {
            this.refs.cc.bundle('CreateChannelsPage');
        } else if (selectedKey == 7) {
            this.refs.cc.bundle('EditAudioCodeFilePage');
        }
    },
    headerBarHandleSelect(event, selectedKey){
        alert(selectedKey);
        if (selectedKey == 'userLogoutAction') {
            this.props.logout();
        }
    },
    collapseSubItem: function () {
        this.setState({isOpenSubItem: !this.state.isOpenSubItem})
    },
    render: function () {
        let userGlyph = <Glyphicon glyph="user"/>;
        let envelopeGlyph = <Glyphicon glyph="envelope"/>
        return (
            <div styleName="wrapper">
                <Navbar >
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">理 想 国</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav pullRight onSelect={this.headerBarHandleSelect}>
                        <NavDropdown title={envelopeGlyph} id="nav-dropdown-message">
                            <MenuItem eventKey="header-message-item-all">
                                <strong>读所有信息</strong> <Glyphicon glyph="menu-right"/>
                            </MenuItem>
                        </NavDropdown>
                        <NavDropdown title={userGlyph} id="nav-dropdown-user">
                            <MenuItem eventKey="1">{userGlyph}
                                &nbsp;用户信息
                            </MenuItem>
                            <MenuItem eventKey="2"><Glyphicon glyph="cog"/>
                                &nbsp;设置
                            </MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey="userLogoutAction"><Glyphicon glyph="log-out"/>
                                &nbsp;退出
                            </MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar>
                <Grid fluid={true}>
                    <Row className="show-grid">
                        <Col xs={2}>
                            <div styleName="sidebar-nav">
                                <Nav bsStyle="pills" stacked onSelect={this.handleSelect}>
                                    <NavItem eventKey={1} title="Item"><Glyphicon glyph="dashboard"/>&nbsp;
                                        项目列表</NavItem>
                                    <NavItem eventKey={2} title="Item"><Glyphicon glyph="edit"/>&nbsp;创建音码文件</NavItem>
                                    <NavItem eventKey={3} title="Item"><Glyphicon glyph="list-alt"/>&nbsp;统计报表</NavItem>
                                    <NavItem eventKey={7} title="Item"><Glyphicon glyph="list-alt"/>&nbsp;
                                        编辑音码</NavItem>
                                    <NavItem eventKey={4} title="Item" onClick={this.collapseSubItem}><Glyphicon
                                        glyph="wrench"/>&nbsp;项目共有信息设定<Glyphicon glyph="chevron-right"/></NavItem>
                                    <Collapse in={this.state.isOpenSubItem}>
                                        <div>
                                            <NavItem eventKey={5} title="Item" onSelect={this.handleSelect}><Glyphicon
                                                glyph="bookmark"/>&nbsp;&nbsp;&nbsp;渠道</NavItem>
                                        </div>
                                    </Collapse>
                                </Nav>
                            </div>
                        </Col>
                        <Col xs={10}>
                            <div style={{minHeight: this.state.Height}} styleName="page-content-wrapper">
                                <ContentContainer ref={'cc'} {...this.props} />
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
});
const option = {
    'allowMultiple': true
};
export default CSSModules(DashBoardLayout, styles, option);
