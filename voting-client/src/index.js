import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import io from 'socket.io-client'

import reducer from './reducer'
import { setState } from './action_creators'
import actionToSocket from './action_to_socket'
import App from './components/App'

const socket = io(`${location.protocol}//${location.hostname}:5000`)
socket.on('state', state => {
  store.dispatch(setState(state))
})

const createStoreWithMiddleware = applyMiddleware(
  actionToSocket(socket)
)(createStore)

const store = createStoreWithMiddleware(reducer)

const routes = <Route component={App} />

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
)