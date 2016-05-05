import React from 'react'
import Rcslider from 'rc-slider'

var SoundProgressComponent = React.createClass({
  getInitialState:function(){
    return{
      value:0,
      marks:{},
    }
  },
  componentWillReceiveProps:function(nextProps){

  },
  setCurrentValue(value){
    this.setState({
      value:value
    })
  },
  addMark(mark){
    this.setState({
      marks:this.marks.mark=''
    });
  },
  deleteMark(mark){
    let marks = this.state.marks;
    delete marks.mark;
    this.setState({
      marks:marks
    });
  },
  // onSliderChange:function(value){
  //   let onSeekTrack = this.props.onSeekTrack;
  //   let sound = this.props.sound;
  //   let duration = this.props.duration;
  //   if(sound){
  //     sound.pause();
  //     var seek = duration * value*0.01;
  //     sound.seek(seek)
  //   }
  //   onSeekTrack(value);
  // },
  render:function(){
    return(
      <Rcslider marks={this.props.marks} value={this.props.seek} included={false} onChange={this.props.onSliderChange}/>
    )
  }
});

export default SoundProgressComponent;
