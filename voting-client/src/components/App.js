import React from 'react'
import { Route, Link } from 'react-router-dom'

import { VotingContainer } from './Voting'
import { ResultsContainer } from './Results'

import style from './App_style'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVoteYea } from '@fortawesome/free-solid-svg-icons'

library.add(faVoteYea)

export default class App extends React.Component {
  render () {
    return (
      <div className={style.App}>
        <h1 className={style.App__heading}>Welcome to VotyMcVoteFace <FontAwesomeIcon icon="vote-yea" /></h1>
        <h3 className={style.App__description}>This WebApp enables you to run a series of head-to-head votes from a set of entries in order to reach a final winner</h3>
        <div className={style.Instructions__container}>
          <h2 className={style.Instructions__heading}>Instructions:</h2>
          <p className={style.Instructions__paragraph}>If {`you're`} reading this, {`you've`} successfully connected to the app server, with at least one browser instance.</p>
          <p className={style.Instructions__paragraph}>There are two routes you need to know about - /voting and /results - accessible via the links below.</p>
          <p className={style.Instructions__paragraph}>If {`you're`} the admin, proceed to the results page in order to monitor the results of each vote and control when to move to the next head-to-head.</p>
          <p className={style.Instructions__paragraph}>All other participants should proceed to the voting page, where they will be presented with each head-to-head vote as controlled by the admin.</p>
        </div>
        <div className={style.App__linkBox}>
          <Link className={style.App__link} to='/results'>Results</Link>
          <Link className={style.App__link} to='/voting'>Voting</Link>
        </div>
        <Route path='/results' component={ResultsContainer} />
        <Route path='/voting' component={VotingContainer} />
      </div>
    )
  }
}