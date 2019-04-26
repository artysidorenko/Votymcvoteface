/* eslint-disable no-undef */
import { List, Map } from 'immutable'
import { expect } from 'chai'

import { setEntries, nextPair, vote } from '../src/core'

describe('App logic', () => {
  describe('setEntries', () => {
    it('add entries to application state', () => {
      const state = Map()
      const entries = List.of('Romania', 'United Kingdom')
      const nextState = setEntries(state, entries)
      expect(nextState).to.equal(Map({
        entries: List.of('Romania', 'United Kingdom')
      }))
    })

    it('accepts regular array and converts to immutable', () => {
      const state = Map()
      const entries = ['Romania', 'United Kingdom']
      const nextState = setEntries(state, entries)
      expect(nextState).to.equal(Map({
        entries: List.of('Romania', 'United Kingdom')
      }))
    })
  })

  describe('nextPair', () => {
    it('moves first two items from entries to pair', () => {
      const entries = List.of('Romania', 'United Kingdom', 'Spain')
      const state = Map({
        entries: entries
      })
      const nextState = nextPair(state)
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Romania', 'United Kingdom')
        }),
        entries: List.of('Spain')
      }))
    })

    it('returns winner of vote back into list of entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Romania', 'United Kingdom'),
          results: Map({
            Romania: 3,
            'United Kingdom': 2
          })
        }),
        entries: List.of('Spain', 'Israel', 'France')
      })
      const nextState = nextPair(state)
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Spain', 'Israel')
        }),
        entries: List.of('France', 'Romania')
      }))
    })

    it('return both items from pair to entries in the event of a tie', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Romania', 'United Kingdom'),
          results: Map({
            Romania: 3,
            'United Kingdom': 3
          })
        }),
        entries: List.of('Spain', 'Israel', 'France')
      })
      const nextState = nextPair(state)
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Spain', 'Israel')
        }),
        entries: List.of('France', 'Romania', 'United Kingdom')
      }))
    })

    it('returns the winning entry when there is no pair left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Romania', 'United Kingdom'),
          results: Map({
            Romania: 3,
            'United Kingdom': 2
          })
        }),
        entries: List()
      })
      const nextState = nextPair(state)
      expect(nextState).to.equal(Map({
        winner: 'Romania'
      }))
    })
  })

  describe('vote', () => {
    it('initialises vote result for the voted entry', () => {
      const state = Map({
        pair: List.of('Romania', 'United Kingdom')
      })
      const nextState = vote(state, 'Romania')
      expect(nextState).to.equal(Map({
        pair: List.of('Romania', 'United Kingdom'),
        results: Map({
          'Romania': 1
        })
      }))
    })

    it('increments existing vote result for the voted entry', () => {
      const state = Map({
        pair: List.of('Romania', 'United Kingdom'),
        results: Map({
          Romania: 2,
          'United Kingdom': 3
        })
      })
      const nextState = vote(state, 'Romania')
      expect(nextState).to.equal(Map({
        pair: List.of('Romania', 'United Kingdom'),
        results: Map({
          Romania: 3,
          'United Kingdom': 3
        })
      }))
    })
  })
})
