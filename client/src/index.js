import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router,browserHistory } from 'react-router';
import DevTools from './containers/DevTools/DevTools';
import routes from './routes';
import configureStore from './store';
import { loginUserSuccess } from './actions/authActions';
import '../static/scss/_bootstrap.scss';
import '../static/css/app.css';
import {polyfill} from 'es6-promise';
polyfill();//无论如何都会用插件提供的promise，不管浏览器有没有提供promise的实现，所以不好。

const store = configureStore();
let token = localStorage.getItem('token');
if (token !== null) {
    store.dispatch(loginUserSuccess(token));
}

render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory} routes={routes} />
      <DevTools/>
    </div>
  </Provider>, document.getElementById('app')
);
