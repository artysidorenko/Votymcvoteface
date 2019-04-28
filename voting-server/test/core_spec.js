/* eslint-disable no-undef */
import { List, Map, fromJS } from 'immutable'
import { expect } from 'chai'

import { setEntries, resetVote, nextPair, vote } from '../src/core'

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
    it('moves first two items from entries to pair and initialises round 1', () => {
      const entries = List.of('Romania', 'United Kingdom', 'Spain')
      const state = Map({
        entries: entries
      })
      const nextState = nextPair(state)
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Romania', 'United Kingdom'),
          round: 1
        }),
        entries: List.of('Spain')
      }))
    })

    it('returns winner of vote back into list of entries and increments round', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Romania', 'United Kingdom'),
          round: 1,
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
          pair: List.of('Spain', 'Israel'),
          round: 2
        }),
        entries: List.of('France', 'Romania')
      }))
    })

    it('return both items from pair to entries in the event of a tie and increments round', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Romania', 'United Kingdom'),
          round: 2,
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
          pair: List.of('Spain', 'Israel'),
          round: 3
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

    it('erases client vote tracker on next round', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Romania', 'United Kingdom'),
          round: 1,
          results: Map({
            Romania: 3,
            'United Kingdom': 2
          }),
          votes: Map({
            client1: 'Romania'
          })
        }),
        entries: List.of('Spain', 'Israel', 'France')
      })
      const nextState = nextPair(state)
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Spain', 'Israel'),
          round: 2
        }),
        entries: List.of('France', 'Romania')
      }))
    })
  })

  describe('resetVote', () => {
    it('resets entries to original set and restarts vote', () => {
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
      const nextState = resetVote(initialState)

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: [initialEntries[0], initialEntries[1]],
          round: 1
        },
        entries: initialEntries.slice(2),
        winner: null
      }))
    })
  })

  describe('vote', () => {
    it('initialises vote result for the voted entry', () => {
      const state = Map({
        pair: List.of('Romania', 'United Kingdom')
      })
      const nextState = vote(state, 'Romania', 'client1')
      expect(nextState).to.equal(Map({
        pair: List.of('Romania', 'United Kingdom'),
        results: Map({
          'Romania': 1
        }),
        votes: Map({
          client1: 'Romania'
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
      const nextState = vote(state, 'Romania', 'client1')
      expect(nextState).to.equal(Map({
        pair: List.of('Romania', 'United Kingdom'),
        results: Map({
          Romania: 3,
          'United Kingdom': 3
        }),
        votes: Map({
          client1: 'Romania'
        })
      }))
    })

    it('prevents from voting for entry not included in current pair', () => {
      const state = Map({
        pair: List.of('Romania', 'United Kingdom'),
        results: Map({
          Romania: 2,
          'United Kingdom': 3
        })
      })
      const nextState = vote(state, 'France', 'client1')
      expect(nextState).to.equal(Map({
        pair: List.of('Romania', 'United Kingdom'),
        results: Map({
          Romania: 2,
          'United Kingdom': 3
        })
      }))
    })

    it('changes existing vote when client has already voted', () => {
      const state = Map({
        pair: List.of('Romania', 'United Kingdom'),
        results: Map({
          Romania: 2,
          'United Kingdom': 3
        }),
        votes: Map({
          client1: 'Romania'
        })
      })
      const nextState = vote(state, 'United Kingdom', 'client1')
      expect(nextState).to.equal(Map({
        pair: List.of('Romania', 'United Kingdom'),
        results: Map({
          Romania: 1,
          'United Kingdom': 4
        }),
        votes: Map({
          client1: 'United Kingdom'
        })
      }))
    })
  })
})
