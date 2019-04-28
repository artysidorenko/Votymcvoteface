import React from 'react'
import PropTypes from 'prop-types'

import style from './Winner_style'

export default class Winner extends React.PureComponent {
  static propTypes = {
    winner: PropTypes.string.isRequired,
  }

  render () {
    return (
      <div>
        <div className={`${style.winner} winner`}>
          The Final Winner is {this.props.winner}!
        </div>
      </div>
    )
  }
}
