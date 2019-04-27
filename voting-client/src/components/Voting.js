import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import Vote from './Vote'
import Winner from './Winner'

export class Voting extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  
  static propTypes = {
    winner: PropTypes.string,
    pair: ImmutablePropTypes.list
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
    pair: state.getIn(['vote', 'pair']),
    winner: state.get('winner')
  }
}

export const VotingContainer = connect(mapStateToProps)(Voting)