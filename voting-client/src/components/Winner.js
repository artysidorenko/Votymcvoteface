import React from 'react'

export default class Winner extends React.PureComponent {


  render () {
    return (
      <div className="winner">
        The Final Winner is {this.props.winner}!
      </div>
    )
  }
}