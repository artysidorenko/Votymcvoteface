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

})