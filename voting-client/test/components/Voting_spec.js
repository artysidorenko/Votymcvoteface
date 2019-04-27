import React from 'react'
import ReactDOM from 'react-dom'
// previously imported from 'react-addons-test-utils' - changed with update
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  findRenderedDOMComponentWithClass,
  Simulate
} from 'react-dom/test-utils'
import { expect } from 'chai'
import { List } from 'immutable'

import { Voting } from '../../src/components/Voting'

describe('Voting', () => {

  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting
        pair={['Romania', 'United Kingdom']}
      />
    )
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button')

    expect(buttons.length).to.equal(2)
    expect(buttons[0].textContent).to.equal('Romania')
    expect(buttons[1].textContent).to.equal('United Kingdom')
  })

  it('calls a callback function when button is clicked', () => {
    let selection
    const vote = (entry) => selection = entry

    const component = renderIntoDocument(
      <Voting
        pair={['Romania', 'United Kingdom']}
        vote={vote}
      />
    )
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button')
    Simulate.click(buttons[0])

    expect(selection).to.equal('Romania')
  })

  it('disables buttons once user has submitted their vote', () => {
    const component = renderIntoDocument(
      <Voting
        pair={['Romania', 'United Kingdom']}
        hasVoted="Romania"
      />
    )
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button')

    expect(buttons.length).to.equal(2)
    expect(buttons[0].hasAttribute('disabled')).to.equal(true)
    expect(buttons[1].hasAttribute('disabled')).to.equal(true)
  })

  it('marks vote selection with a label', () => {
    const component = renderIntoDocument(
      <Voting
        pair={['Romania', 'United Kingdom']}
        hasVoted="Romania"
      />
    )
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button')

    expect(buttons.length).to.equal(2)
    expect(buttons[0].textContent).to.contain('Voted')
  })

  it('should replace buttons with winner when there is a winner', () => {
    const component = renderIntoDocument(
      <Voting winner="Romania" />
    )
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button')
    expect(buttons.length).to.equal(0)

    const winner = findRenderedDOMComponentWithClass(component, 'winner')
    expect(winner).to.be.ok
    expect(winner.textContent).to.contain('Romania')

  })

  it('behaves as a pure component, NOT re-rendering with mutated props', () => {
    const pair = ['Romania', 'United Kingdom']
    const container = document.createElement('div')
    // In future should replace with react test renderer?
    // eslint-disable-next-line react/no-render-return-value
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    )

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0]
    expect(firstButton.textContent).to.equal('Romania')

    pair[0] = 'Some Other Country'
    component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0]
    expect(firstButton.textContent).to.equal('Romania')
  })

  it('behaves as a pure component, re-rendering with NEW props', () => {
    const pair = List.of('Romania', 'United Kingdom')
    const container = document.createElement('div')
    // In future should replace with react test renderer?
    // eslint-disable-next-line react/no-render-return-value
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    )

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0]
    expect(firstButton.textContent).to.equal('Romania')

    const newPair = pair.set(0, 'Some Other Country')
    component = ReactDOM.render(
      <Voting pair={newPair} />,
      container
    );
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0]
    expect(firstButton.textContent).to.equal('Some Other Country')
  })
})