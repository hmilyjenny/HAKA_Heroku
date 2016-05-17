import React from 'react';
import {Button, Glyphicon} from "react-bootstrap";

var SearchProjectPage = React.createClass({
    getInitialState: function () {
        return {
            queryTXT: ''
        }
    },
    queryhandleChange: function (e) {
        console.log(this.state.queryTXT);
        this.setState({
            queryTXT: e.target.value
        });
    },
    btnSearch: function () {
        let queryStr = "";
        if (this.state.queryTXT.length > 0) {
            queryStr = '{"query":{"query":[{"field":"name","value":"' + this.state.queryTXT + '"}]}}';
        }
        this.props.pState.getProjectsListInfoActions(queryStr);
    },
    render: function () {
        return (
            <div className="input-group">
                <input type="text" className="form-control" placeholder="请填写项目名称" onChange={this.queryhandleChange}/>
	            <span className="input-group-btn">
		            <Button bsStyle="primary" onClick={this.btnSearch} disabled={this.props.pState.isSaving}>
                        <Glyphicon glyph="search"/>
                            查询
                        </Button>
	            </span>
            </div>
        )
    }
});

export default SearchProjectPage;