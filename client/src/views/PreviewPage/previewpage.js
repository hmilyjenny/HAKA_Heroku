import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import "./css/preview-page.css";
import PreviewContentPage from './previewconentpage';

var PreviewPage = React.createClass({
    render: function () {
        return (
            <div>
                <PreviewContentPage/>
            </div>
        );
    }
})

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewPage);