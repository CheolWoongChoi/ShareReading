import React, { Component } from 'react';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from './reducers';

import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import MyPage from './components/mypage';
import Test from './components/test';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class App extends Component {
  render() {
    return (
      <div>
      <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/home' component={Home} />
            <Route path='/mypage' component={MyPage} />
            <Route path='/test' component={Test} />
            <Route path='/' component={Login} />
          </Switch>
        </BrowserRouter>
      </Provider>
      </div>
    );
  }
}

export default App;
