import React from 'react';
import SoundProgressComponent from './components/soundProgressComponent';
import SoundPlayButton from './components/soundPlayButton';

var Howl = require('howler').Howl;

var EditAudioCodeFilePage = React.createClass({
  getInitialState:function(){
    return {
      isLoading: false,
      isPlaying:false,
      isPause:false,
      currentSongIndex: 0,
      duration:0
    }
  },
  componentWillMount:function(){
    //this.initSoundObject();
  },
  componentDidUpdate: function(prevProps, prevState, prevContext) {
    console.log('prevState.currentSongIndex' +prevState.currentSongIndex);
    console.log('this.state.currentSongIndex' +this.state.currentSongIndex);
    console.log('duration' +this.state.duration);
		if (this.state.isPlaying && this.state.currentSongIndex != prevState.currentSongIndex) {
			this.initSoundObject();
		}
	},
  initSoundObject:function(){
    this.clearSoundObject();
		this.setState({ isLoading: true });
    console.log('start load');
		this.howler = new Howl({
			src: ['/api/project/getProjectAudioFileByAudioFileId?audioId=57246940c8593204ee3ce837'],
      ext: ['mp3'],
      html5: true,
			onload: this.initSoundObjectCompleted
		});
  },
  clearSoundObject: function() {
 		if (this.howler) {
			this.howler.stop();
			this.howler = null;
		}
 	},
  initSoundObjectCompleted:function(){
    console.log('play');
      this.howler.play();
    this.setState({
			duration: this.howler.duration(),
			isLoading: false
		});
  },
  render:function(){
    return(
      <div>
        <SoundPlayButton isPlaying={this.state.isPlaying} isPause={this.state.isPause}
          isLoading={this.state.isLoading} onPlayBtnClick={this.onPlayBtnClick} onPauseBtnClick={this.onPauseBtnClick}/>
      </div>
    )
  },

  onPlayBtnClick:function(){
    if (this.state.isPlaying && !this.state.isPause) {
			return;
		};
    this.setState({ isPlaying: true, isPause: false });
    if (!this.howler) {
			this.initSoundObject();
		}
    else{
      this.howler.play();
    }
  },
  onPauseBtnClick:function(){
    var isPause = !this.state.isPause;
		this.setState({ isPause: isPause });
    this.howler.pause();
  },
});
export default EditAudioCodeFilePage;
