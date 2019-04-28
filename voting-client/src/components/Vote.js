import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import style from './Vote_style'

export default class Vote extends React.PureComponent {
  static propTypes = {
    pair: ImmutablePropTypes.list,
    hasVoted: PropTypes.string,
    vote: PropTypes.func,
    round: PropTypes.number
  }

  getPair () {
    return this.props.pair || []
  }
  hasVotedFor (entry) {
    return this.props.hasVoted === entry
  }

  render () {
    return (
      <div className={style.voting}>
        Round: {this.props.round}
        {this.getPair().map(entry =>
          <button
            key={entry}
            onClick={() => this.props.vote(entry)}
          >
            <h1>{entry}</h1>
            {this.hasVotedFor(entry) && (
              <div className="label">Voted</div>
            )}
          </button>
        )}
      </div>
    )
  }
}
