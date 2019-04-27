import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'

import Vote from './Vote'
import Winner from './Winner'
import * as actionCreators from '../action_creators'

export class Voting extends React.PureComponent {
  static propTypes = {
    winner: PropTypes.string,
    hasVoted: PropTypes.string,
    pair: ImmutablePropTypes.list,
    vote: PropTypes.func
  }

  render () {
    return (
      <div>
        {this.props.winner && 
          <Winner winner={this.props.winner}/>
        }
        {(!this.props.winner) &&
          <Vote {...this.props} />
        }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    pair: fromJS(state.getIn(['vote', 'pair'])),
    hasVoted: state.get('hasVoted'),
    winner: state.get('winner')
  }
}

export const VotingContainer = connect(
  mapStateToProps,
  actionCreators
)(Voting)