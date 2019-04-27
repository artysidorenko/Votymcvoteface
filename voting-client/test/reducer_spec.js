import { List, Map, fromJS } from 'immutable'
import { expect } from 'chai'

import reducer from '../src/reducer'

describe('reducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map()
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Romania', 'United Kingdom'),
          results: Map({ Romania: 1 })
        })
      })
    }
    const nextState = reducer(initialState, action)
    
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Romania', 'United Kingdom'],
        results: { Romania: 1 }        
      }
    }))
  })

  it('accepts plain JS Object for SET_STATE', () => {
    const initialState = Map()
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Romania', 'United Kingdom'],
          results: { Romania: 1 }
        }
      }
    }
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Romania', 'United Kingdom'],
        results: { Romania: 1 }
      }
    }))
  })

  it('initialises SET_STATE from no state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Romania', 'United Kingdom'],
          results: { Romania: 1 }
        }
      }
    }
    const nextState = reducer(undefined, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Romania', 'United Kingdom'],
        results: { Romania: 1 }
      }
    }))
  })

  it('handles VOTE and sets hasVoted variable', () => {
    const state = fromJS({
      vote: {
        pair: ['Romania', 'United Kingdom'],
        results: { Romania: 1 }
      }
    })
    const action = { type: 'VOTE', selection: 'Romania' }
    const nextState = reducer(state, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Romania', 'United Kingdom'],
        results: { Romania: 1 }
      },
      hasVoted: 'Romania'
    }))
  })

  it('ignores VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['Romania', 'United Kingdom'],
        results: { Romania: 1 }
      }
    });
    const action = { type: 'VOTE', selection: 'SomeFakeCountry' };
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Romania', 'United Kingdom'],
        results: { Romania: 1 }
      }
    }));
  })

  it('removes hasVoted on SET_STATE on pair change', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Romania', 'United Kingdom'],
        results: { Romania: 1 }
      },
      hasVoted: 'Romania'
    })
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['France', 'Israel']
        }
      }
    }
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['France', 'Israel']
      }
    }))
  })

})