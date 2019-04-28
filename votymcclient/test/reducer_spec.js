import { List, Map, fromJS } from 'immutable'
import { expect } from 'chai'

import reducer from '../src/reducer'
import { next } from '../src/action_creators';

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

  it('handles VOTE and sets myVote variable', () => {
    const state = fromJS({
      vote: {
        pair: ['Romania', 'United Kingdom'],
        results: { Romania: 1 },
        round: 5
      }
    })
    const action = { type: 'VOTE', selection: 'Romania' }
    const nextState = reducer(state, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Romania', 'United Kingdom'],
        results: { Romania: 1 },
        round: 5
      },
      myVote: {
        selection: 'Romania',
        round: 5
      }
    }))
  })

  it('ignores VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['Romania', 'United Kingdom'],
        results: { Romania: 1 },
        round: 7
      }
    });
    const action = { type: 'VOTE', selection: 'SomeFakeCountry' };
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Romania', 'United Kingdom'],
        results: { Romania: 1 },
        round: 7
      }
    }));
  })

  it('removes myVote on SET_STATE on pair change', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Romania', 'United Kingdom'],
        results: { Romania: 1 },
        round: 5
      },
      myVote: {
        selection: 'Romania',
        round: 5
      }
    })
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['France', 'Israel'],
          round: 6
        }
      }
    }
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['France', 'Israel'],
        round: 6
      }
    }))
  })

  it('handles SET_CLIENT_ID', () => {
    const initialState = Map()
    const action = {
      type: 'SET_CLIENT_ID',
      clientId: '0000'
    }
    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      clientId: '0000'
    }))
  })

})