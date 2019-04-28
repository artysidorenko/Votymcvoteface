import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'

import Winner from './Winner'
import * as actionCreators from '../action_creators'

import style from './Results.module'

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

  reset = () => {
    return this.props.resetVote
  }

  render () {
    return this.props.winner?
      <div>
        <Winner winner={this.props.winner} reset={this.reset} />
        <button
          className={style.resetBtn}
          onClick={this.props.resetVote}
        >
          Reset To Round 1
        </button>
      </div>
      :
      (
        <div className={style.results}>
          <div className={style.display}>
            <h4 className={style.round}>Round {this.props.round}</h4>
            <div className={style.countBox}>
              {this.getPair() && this.getPair().map(entry =>
                <div key={entry} className={`${style.entry} entry`}>
                  <span className={style.voteName}>{entry}</span>
                  <span className={style.voteCount}>
                    {this.props.results && this.getVotes(entry)}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className={style.admin}>
              <button
                className={`${style.nextBtn} nextBtn`}
                onClick={this.props.next}
              >
                Next Round
              </button>
              <button
                className={`${style.resetBtn} resetBtn`}
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