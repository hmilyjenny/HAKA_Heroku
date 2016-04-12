import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/App';
import {requireAuthentication} from './components/AuthenticatedComponent';
import LandingPage from './views/LandingPage/landingpage';
import LoginRoute from './views/LoginPage/loginroute';
import RegisterRoute from './views/RegisterPage/registerroute';
import DashBoardRoute from './views/Dashboard/dashboardroute';

export default(
    <Route  component={App}>
        <Route path='/' component={LandingPage} />
        <Route path="/login" component={LoginRoute}/>
        <Route path="/register" component={RegisterRoute} />
        <Route path="/dashboard" component={requireAuthentication(DashBoardRoute)} />
    </Route>
);
