import React from 'react';
import {Carousel,Grid,Row,Col,ProgressBar} from 'react-bootstrap';
import SoundProgressComponent from './components/soundProgressComponent';
import SoundPlayButton from './components/soundPlayButton';
import ThumbnailsImgsPage from '../../ImagesListPage/thumbnailsimgspage';

var Howl = require('howler').Howl;

var EditAudioCodeFilePage = React.createClass({
  getInitialState:function(){
    return {
      isLoading: false,
      isPlaying:false,
      isPause:false,
      currentSongIndex:0,
      duration:0
    }
  },
  componentWillMount:function(){

  },
  componentDidUpdate: function(prevProps, prevState, prevContext) {
    //console.log('duration' +this.state.duration);
		if (this.state.isPlaying && this.state.currentSongIndex != prevState.currentSongIndex) {
			this.initSoundObject();
      //console.log('test initSoundObject');
		}
	},
  initSoundObject:function(){
    this.clearSoundObject();
		this.setState({ isLoading: true });
    //console.log('start init');
		this.howler = new Howl({
			src: ['/api/project/getProjectAudioFileByAudioFileId?audioId=57246940c8593204ee3ce837'],
      ext: ['mp3'],
      html5: true,
			onload: this.initSoundObjectCompleted
		});
    this.howler.play();
    //this.howler.pause();
  },
  clearSoundObject: function() {
 		if (this.howler) {
			this.howler.stop();
			this.howler = null;
		}
 	},
  initSoundObjectCompleted:function(){
    //console.log('play');
    this.howler.play();
    this.setState({
			duration: this.howler.duration(),
			isLoading: false
		});
  },
  onPlayBtnClick: function () {
      //console.log('isplay: '+this.state.isPlaying);
      if (this.state.isPlaying && !this.state.isPause) {
        //console.log('return')
          return;
      }
      this.setState({isPlaying: true, isPause: false});
      if (!this.howler) {
          this.initSoundObject();
      }
      else {
          this.howler.play();
          this.stopUpdateCurrentDuration();
          this.updateCurrentDuration();
          this.interval = setInterval(this.updateCurrentDuration, 1000);
          //console.log('onPlayBtnClick');
      }
  },
  onPauseBtnClick: function () {
      //console.log('start pause');
      var isPause = !this.state.isPause;
      this.setState({isPause: isPause});
      this.howler.pause();
      this.stopUpdateCurrentDuration();
  },
  updateCurrentDuration: function() {
    console.log('updateCurrentDuration'+this.howler.seek());
		this.setState({ seek: this.howler.seek() });
	},

	stopUpdateCurrentDuration: function() {
		clearInterval(this.interval);
	},
  render:function(){
    var percent = 0;
		if (this.state.seek && this.state.duration) {
			percent = this.state.seek / this.state.duration;
		}
    console.log(percent);
    return(
      <div>
      <Carousel slide={false} indicators={false}>
        <Carousel.Item>
          <img width={500} height={300}  src=""/>
        </Carousel.Item>
     </Carousel>
     <br/>
     <br/>
     <Grid>
      <Row>
        <Col md={8}>
        <SoundProgressComponent />
          </Col>
        <Col md={1}>
        <SoundPlayButton isPlaying={this.state.isPlaying} isPause={this.state.isPause}
          isLoading={this.state.isLoading} onPlayBtnClick={this.onPlayBtnClick} onPauseBtnClick={this.onPauseBtnClick}/>
        </Col>
        <Col md={2}></Col>
      </Row>
      <Row>
      </Row>
     </Grid>

      </div>
    )
  },

});
export default EditAudioCodeFilePage
