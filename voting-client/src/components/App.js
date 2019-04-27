import React from 'react'
import { Route } from 'react-router-dom'

import { VotingContainer } from './Voting'
import { ResultsContainer } from './Results'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Route path='/results' component={ResultsContainer} />
        <Route path='/' component={VotingContainer} />
      </div>
    )
  }
}