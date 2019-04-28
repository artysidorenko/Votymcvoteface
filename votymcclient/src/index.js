import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { HashRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import io from 'socket.io-client'

import reducer from './reducer'
import { setState, setClientId } from './action_creators'
import getClientId from './client_id'
import actionToSocket from './action_to_socket'
import App from './components/App'

import './style'

const socket = io(`http//localhost:5000`)
socket.on('state', state => {
  store.dispatch(setState(state))
})

const createStoreWithMiddleware = applyMiddleware(
  actionToSocket(socket)
)(createStore)

const store = createStoreWithMiddleware(reducer)
store.dispatch(setClientId(getClientId()))

const routes = <Route component={App} />

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
