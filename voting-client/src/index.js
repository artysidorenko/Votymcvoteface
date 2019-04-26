import React from 'react'
import ReactDOM from 'react-dom'
import Voting from './components/Voting'

const pair = ['Romania', 'United Kingdom']

ReactDOM.render(
  <Voting pair={pair} hasVoted="Romania" winner="Romania"/>,
  document.getElementById('app')
)