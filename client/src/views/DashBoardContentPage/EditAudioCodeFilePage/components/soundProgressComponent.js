import React from 'react';


const container ={
  top :'10px',
  width: '100%',
  height: '10px',
  position: 'relative',
  cursor: 'default'
};
const slideBar = {
  width: '100%',
  height: '10px',
  boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.74)',
  borderRadius: '10px',
  position: 'absolute'
};
const slideBarFill={
  backgroundColor: 'rgb(216, 216, 216)',
  boxShadow: 'none',
  height: '10px',
  width: '60%',
  borderRadius: '20px',
  transition: 'width 0.1s ease-in-out'
};
const slideBarHandle={
  border: '1px solid #ccc',
  width: '20px',
	height: '20px',
	borderRadius: '20px',
  position: 'absolute',
  display: 'inline-block',
  cursor: 'pointer',
	top: '-5px'
};
var SoundProgressComponent = React.createClass({
  getInitialState:function(){
    return{
      fillWidth: 30,
      value: 0,
      mouseX: 0,
      mouseDown: false
    }
  },
  handleClick(e) {
          let rect = this.refs.container.getBoundingClientRect();
          let ratio = (e.pageX - rect.left) / rect.width;
          //console.log(ratio);
          this.setState({
              fillWidth: 100 * ratio
          });
  },
  render:function(){
    return(
      <div style={container} ref="container" onClick={this.handleClick}>
        <div style={slideBar}></div>
        <div style={slideBar,slideBarFill,{width: this.state.fillWidth + '%',borderRadius: '20px',transition: 'width 0.1s ease-in-out',
              height: '10px',backgroundColor: '#104E8B',boxShadow: 'none'}}></div>
        <div style={slideBarHandle} />
      </div>
    )
  }
});
export default SoundProgressComponent;
