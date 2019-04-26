import { setEntries, nextPair, vote, INITIAL_STATE } from './core'

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries)
    case 'NEXT':
      return nextPair(state)
    case 'VOTE':
      return state.update('vote', voteState => vote(voteState, action.vote))
  }
  return state
}
