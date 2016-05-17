import React from 'react';
import CSSModules from 'react-css-modules';
import {
    Button
} from "react-bootstrap";
import styles from "./css/preview-page.css";

//var loadObj=[];

var PreviewConentPage = React.createClass({
    getInitialState: function() {
        return {
            currentAudio: {},
            currentImgs: [],
            currentTimePoints: [],
            currentIndex: 0,
            disableNextBtn: false,
            disablePreviousBtn: true
        }
    },
    componentWillMount: function() {
        this.setState({
            currentAudio: {type:"mp3",url:"api/project/getProjectAudioFileByAudioFileId?audioId=57359998ac54e28c1a47c419"},
            currentImgs: [
                {type:"img",url:'http://lorempixel.com/600/800/food'},
                {type:"img",url:'http://lorempixel.com/578/1059/abstract'},
                {type:"img",url:'http://lorempixel.com/578/1059/city'},
                {type:"img",url:'http://lorempixel.com/578/1059/people'},
                {type:"img",url:'http://lorempixel.com/578/1059/sports'},
                {type:"img",url:'http://lorempixel.com/578/1059/business'}
            ],
            currentTimePoints: [0, 10, 20, 30, 40, 50],
            currentIndex: 0
        });
    },
    componentDidMount:function(){

    },
    onPreload: function(ResourceList) {
        let ListObj = [];
        ResourceList.map((file) => {
            if (file.type === "mp3") {
                let audioEle = new Audio();
                audioEle.src = file.url;
                ListObj.push(audioEle);
            } else {
                let imgEle = new Image();
                console.log(imgEle.complete);
                imgEle.src = file.url;
                imgEle.styleName = "showImg-img";
                ListObj.push(imgEle);
            }
        });
        return ListObj;
    },
    onNextClick: function() {
        if (this.state.currentIndex < this.state.currentImgs.length - 1) {
            this.setState({
                currentIndex: this.state.currentIndex + 1,
                disableNextBtn: false,
                disablePreviousBtn: false
            });
            if ((this.state.currentIndex + 1) === this.state.currentImgs.length - 1) {
                this.setState({
                    disableNextBtn: true,
                    disablePreviousBtn: false
                });
            }
        } else {
            this.setState({
                disableNextBtn: true,
                disablePreviousBtn: false
            });
        }
    },
    onPreviousClick: function() {
        if (this.state.currentIndex > 0) {
            this.setState({
                currentIndex: this.state.currentIndex - 1,
                disableNextBtn: false,
                disablePreviousBtn: false
            });
            if ((this.state.currentIndex - 1) === 0) {
                this.setState({
                    disableNextBtn: false,
                    disablePreviousBtn: true
                });
            }
        } else {
            this.setState({
                disableNextBtn: false,
                disablePreviousBtn: true
            });
        }
    },
    render: function() {
        let loadAudio=this.state.currentAudio.url;
        let showImg = this.state.currentImgs[this.state.currentIndex].url;
        let playPoint = this.state.currentTimePoints[this.state.currentIndex];
        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                            <audio id="bgMusic" src={loadAudio}  controls="controls" autoplay="autoplay"></audio>
                        </td>
                        <td>
                            <div styleName="myPhone">
                                <div styleName="myPhoneScreen">
                                    <section id="loader" class="loader">
                                        <div class="loader__bar">
                                            <div class="loader__progress-bg"></div>
                                            <div id="loader__progress" class="loader__progress"></div>
                                            <div id="loader__info" class="loader__info">Loading 0%</div>
                                        </div>
                                    </section>
                                    <section>
                                        <div styleName="shiwImg-div">
                                            <span styleName="showImg-span">
                                                <img styleName="showImg-img" src={showImg}/>
                                            </span>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </td>
                        <td>
                            <Button onClick={this.onPreviousClick} disabled={this.state.disablePreviousBtn}>上一张</Button>
                            <Button onClick={this.onNextClick} disabled={this.state.disableNextBtn}>下一张</Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
})

const option = {
    'allowMultiple': true
};

export default CSSModules(PreviewConentPage, styles, option);