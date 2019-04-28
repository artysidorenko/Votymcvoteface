import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'

import Winner from './Winner'
import * as actionCreators from '../action_creators'

export class Results extends React.PureComponent {
  static propTypes = {
    pair: ImmutablePropTypes.list,
    results: ImmutablePropTypes.map,
    winner: PropTypes.string,
    next: PropTypes.func.isRequired,
    round: PropTypes.number,
    resetVote: PropTypes.func.isRequired
  }

  getPair () {
    return this.props.pair
  }

  getVotes (entry) {
    if (this.props.results.has(entry)) {
      return this.props.results.get(entry)
    } else return 0
  }

  render () {
    return this.props.winner?
      <Winner winner={this.props.winner} /> :
      (
        <div className="results">
          <div className="display">
            Round: {this.props.round}
            {this.getPair() && this.getPair().map(entry =>
              <div key={entry} className="entry">
                <h1>{entry}</h1>
                <div className="voteCount">
                  {this.props.results && this.getVotes(entry)}
                </div>
              </div>
            )}
          </div>
          <div className="admin">
              <button
                className="nextBtn"
                onClick={this.props.next}
              >
                Next Round
              </button>
              <button
                className="resetBtn"
                onClick={this.props.resetVote}
              >
                Reset To Round 1
              </button>
          </div>
        </div>
      )
  }
}

function mapStateToProps (state) {
  return {
    pair: fromJS(state.getIn(['vote', 'pair'])),
    results: fromJS(state.getIn(['vote', 'results'])),
    winner: state.get('winner'),
    round: state.getIn(['vote', 'round'])
  }
}

export const ResultsContainer = connect(
  mapStateToProps,
  actionCreators
)(Results)