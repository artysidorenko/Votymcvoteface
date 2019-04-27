import React from 'react'
// import { List, Map } from 'immutable'
import { Route } from 'react-router-dom'

import { VotingContainer } from './Voting'
import { ResultsContainer } from './Results'

// const pair = List.of('Romania', 'United Kingdom')
// const results = Map({Romania: 3, 'United Kingdom': 2})
// const results = Map({ Romania: 3 })
// const props = {
//   pair: pair,
//   results: results,
//   vote: () => {console.log('clicked on vote button')}
// }

export default class App extends React.Component {
  render () {
    return (
      <div>
        {/* <Route path='/results' component={Results} /> */}
        {/* <Route path='/' component={Voting} /> */}
        <Route path='/results' component={ResultsContainer}
          // render={() => <ResultsContainer {...props}/>}
        />
        <Route path='/' component={VotingContainer}
          // render={() => <VotingContainer {...props}/>}
        />
      </div>
    )
  }
}