import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducer'
import App from './components/App'

const store = createStore(reducer)
store.dispatch({
  type: 'SET_STATE',
  state: {
    vote: {
      pair: ['France', 'Spain'],
      results: { France: 1 }
    }
  }
})

const routes = <Route component={App} />

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
)