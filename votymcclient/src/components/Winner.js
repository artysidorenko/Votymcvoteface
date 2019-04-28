import React from 'react'
import PropTypes from 'prop-types'

import style from './Winner.module'

export default class Winner extends React.PureComponent {
  static propTypes = {
    winner: PropTypes.string.isRequired,
  }

  render () {
    return (
      <div>
        <div className={`${style.title} winner`}>
          The Final Winner is {this.props.winner}!
        </div>
      </div>
    )
  }
}
