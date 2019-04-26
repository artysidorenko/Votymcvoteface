/* eslint-disable no-undef */
import { Map, fromJS } from 'immutable'
import { expect } from 'chai'

import reducer from '../src/reducer'

describe('reducer', () => {
  it('processes SET_ENTRIES', () => {
    const initialState = Map()
    const action = {
      type: 'SET_ENTRIES',
      entries: ['Romania']
    }
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      entries: ['Romania']
    }))
  })

  it('processes NEXT_PAIR', () => {
    const initialState = fromJS({
      entries: ['Romania', 'United Kingdom']
    })
    const action = {
      type: 'NEXT_PAIR'
    }
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Romania', 'United Kingdom']
      },
      entries: []
    }))
  })

  it('processes VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Romania', 'United Kingdom']
      },
      entries: []
    })
    const action = {
      type: 'VOTE',
      vote: 'Romania'
    }
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Romania', 'United Kingdom'],
        results: {
          Romania: 1
        }
      },
      entries: []
    }))
  })

  it('has an initial state', () => {
    const action = { type: 'SET_ENTRIES', entries: ['Romania'] }
    const nextState = reducer(undefined, action)
    expect(nextState).to.equal(fromJS({
      entries: ['Romania']
    }))
  })

  it('can be used with reduce array method', () => {
    const actions = [
      { type: 'SET_ENTRIES', entries: ['Romania', 'United Kingdom'] },
      { type: 'NEXT_PAIR' },
      { type: 'VOTE', entry: 'Romania' },
      { type: 'VOTE', entry: 'United Kingdom' },
      { type: 'VOTE', entry: 'Romania' },
      { type: 'NEXT_PAIR' }
    ]
    const finalState = actions.reduce(reducer, Map())

    expect(finalState).to.equal(fromJS({
      winner: 'Romania'
    }))
  })
})
