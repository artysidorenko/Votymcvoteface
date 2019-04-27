import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

export default class Vote extends React.PureComponent {
  static propTypes = {
    pair: PropTypes.oneOfType([
      ImmutablePropTypes.list,
      PropTypes.array
    ]),
    hasVoted: PropTypes.string,
    vote: PropTypes.func
  }

  getPair () {
    return this.props.pair || []
  }
  isDisabled () {
    return !!this.props.hasVoted
  }
  hasVotedFor (entry) {
    return this.props.hasVoted === entry
  }

  render () {
    console.log(this.props)
    return (
      <div className="voting">
        {this.getPair().map(entry =>
          <button
            key={entry}
            disabled={this.isDisabled()}
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
