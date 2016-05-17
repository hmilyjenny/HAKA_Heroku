import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Input, Glyphicon} from "react-bootstrap";

var SearchChannelsPage = React.createClass({
    getInitialState: function () {
        return {
            queryTXT: ''
        }
    },
    queryhandleChange: function (e) {
        this.setState({
            queryTXT: e.target.value
        });
    },
    btnSearch: function () {
        let queryStr = this.state.queryTXT;
        this.props.pState.getchannelsDataActions(queryStr);
    },
    render: function () {
        return (
            <div className="input-group">
                <input type="text" className="form-control" placeholder="请填写渠道名称或编码" onChange={this.queryhandleChange}/>
	            <span className="input-group-btn">
		            <Button bsStyle="primary" onClick={this.btnSearch} disabled={this.props.pState.isExecing}>
                        <Glyphicon glyph="search"/>
                            查询
                        </Button>
	            </span>
            </div>
        )
    }
});

export default SearchChannelsPage;