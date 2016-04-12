import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/App';
import LandingPage from './views/LandingPage/landingpage';
//import LoginRoute from './views/LoginPage/loginroute';

export default(
    <Route  component={App}>
        <Route path='/' component={LandingPage} />
        {/*<Route path="/login" component={LoginRoute}/>
        <Route path="/register" component={RegisterRoute} />
        <Route path="/dashboard" component={DashBoardRoute} />*/}
    </Route>
);
