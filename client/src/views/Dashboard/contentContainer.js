import React from 'react';
import ProjectsPage from '../../views/DashBoardContentPage/ProjectsPage/projectspage'
import CreateAudioCodeFilePage from '../../views/DashBoardContentPage/CreateAudioCodeFilePage/createaudiocodefile'

var ContentContainer = React.createClass({
    getInitialState: function(){
    return{
      loadComponent:''
    }
  },
  componentWillMount:function(){
    this.setState(
      {
        loadComponent:'ProjectsPage'
      }
    );
  },
  bundle:function(location){
    this.setState({
      loadComponent:location
    })

    //this.constructor.loadedComponent = require('../../views/ProjectsPage/projectspage');
  },
  render:function(){
    var component=null;
    if(this.state.loadComponent=='ProjectsPage')
    {
      component=<ProjectsPage {...this.props} />
    }
    else if(this.state.loadComponent=='CreateAudioCodeFilePage')
    {
      component=<CreateAudioCodeFilePage {...this.props} />
    }
    return(
      <div>{component}</div>

    )
  },
});

export default ContentContainer;
