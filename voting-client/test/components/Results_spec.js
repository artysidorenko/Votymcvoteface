import React from 'react'
import ReactDOM from 'react-dom'
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  findRenderedDOMComponentWithClass,
  Simulate
} from 'react-dom/test-utils'
import { List, Map } from 'immutable'
import { Results } from '../../src/components/Results'
import { expect } from 'chai'

describe('Results', () => {

  it('renders entries with # of votes or zero', () => {
    const pair = List.of('Romania', 'United Kingdom')
    const results = Map({ 'Romania': 5 })
    const component = renderIntoDocument(
      <Results pair={pair} results={results} />
    )

    const entries = scryRenderedDOMComponentsWithClass(component, 'entry')
    const [ RO, UK ] = entries.map(e => e.textContent)

    expect(entries.length).to.equal(2)
    expect(RO).to.contain('Romania')
    expect(RO).to.contain('5')
    expect(UK).to.contain('United Kingdom')
    expect(UK).to.contain('0')
  })

  it('invokes nextPair() when the Next button is clicked', () => {
    let nextClicked = false
    const next = () => nextClicked = true

    const pair = List.of('Romania', 'United Kingdom')
    const component = renderIntoDocument(
      <Results
        pair={pair}
        results={Map()}
        next={next}
      />
    )
    Simulate.click(findRenderedDOMComponentWithClass(component, 'nextBtn'))
    
    expect(nextClicked).to.equal(true)
  })

  it('displays the winner once there is a winner', () => {
    const component = renderIntoDocument(
      <Results
        winner="Romania"
        pair={['Romania', 'United Kingdom']}
        results={Map()}
      />
    )
    const winner = findRenderedDOMComponentWithClass(component, 'winner')
    expect(winner).to.be.ok
    expect(winner.textContent).to.equal('The Final Winner is Romania!')
  })
})