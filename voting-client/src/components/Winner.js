import React from 'react'
import PropTypes from 'prop-types'

export default class Winner extends React.PureComponent {
  static propTypes = {
    winner: PropTypes.string
  }

  render () {
    return (
      <div className="winner">
        The Final Winner is {this.props.winner}!
      </div>
    )
  }
}