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

  it('processes NEXT', () => {
    const initialState = fromJS({
      entries: ['Romania', 'United Kingdom']
    })
    const action = {
      type: 'NEXT'
    }
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Romania', 'United Kingdom'],
        round: 1
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
      selection: 'Romania',
      clientId: 'client1'
    }
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Romania', 'United Kingdom'],
        results: {
          Romania: 1
        },
        votes: {
          client1: 'Romania'
        }
      },
      entries: []
    }))
  })

  it('processes RESET', () => {
    const initialEntries = [
      'Romania',
      'United Kingdom',
      'France',
      'Israel',
      'Russia',
      'Spain',
      'Portugal',
      'Italy',
      'Germany',
      'Belgium',
      'Sweden'
    ]
    const initialState = fromJS({
      vote: {
        pair: ['Romania', 'United Kingdom']
      },
      entries: ['France', 'Israel']
    })
    const action = {
      type: 'RESET'
    }
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: [initialEntries[0], initialEntries[1]],
        round: 1
      },
      entries: initialEntries.slice(2),
      winner: null
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
      { type: 'NEXT' },
      { type: 'VOTE', selection: 'Romania' },
      { type: 'VOTE', selection: 'United Kingdom' },
      { type: 'VOTE', selection: 'Romania' },
      { type: 'NEXT' }
    ]
    const finalState = actions.reduce(reducer, Map())

    expect(finalState).to.equal(fromJS({
      winner: 'Romania'
    }))
  })
})
