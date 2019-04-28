import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'

import Vote from './Vote'
import Winner from './Winner'
import * as actionCreators from '../action_creators'
import getClientId from '../client_id';

export class Voting extends React.PureComponent {
  static propTypes = {
    winner: PropTypes.string,
    hasVoted: PropTypes.string,
    pair: ImmutablePropTypes.list,
    vote: PropTypes.func,
    round: PropTypes.number
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
    hasVoted: state.getIn(['vote', 'votes', getClientId()]),
    winner: state.get('winner'),
    round: state.getIn(['vote', 'round'])
  }
}

export const VotingContainer = connect(
  mapStateToProps,
  actionCreators
)(Voting)