import React from 'react';
import {Button, ButtonGroup, Glyphicon} from 'react-bootstrap';

var SoundPlayButton = React.createClass({
    render: function () {
        var isPlaying = this.props.isPlaying;
        var isPause = this.props.isPause;
        var isLoading = this.props.isLoading;
        var isShowPlayBtn = !isPlaying || isPause;
        var buttonClickHandler = isShowPlayBtn ? this.props.onPlayBtnClick : this.props.onPauseBtnClick;
        var iconName;
        var iconClasses = "";
        if (isLoading) {
            iconName = "refresh";
        } else {
            iconName = isShowPlayBtn ? "play" : "pause";
        }
        return (
            <ButtonGroup >
                <Button bsSize="small" onClick={buttonClickHandler}>
                    <Glyphicon glyph={iconName}/>
                </Button>
            </ButtonGroup>
        );
    },
});

export default SoundPlayButton
