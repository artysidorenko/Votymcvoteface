import { Map } from 'immutable'

export default function reducer (state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return resetVote(setState(state, action.state))
    case 'VOTE':
      return vote(state, action.selection)
  }
  return state
}

// helper functions

function setState(state, newState) {
  return state.merge(newState)
}

function vote(state, selection) {
  const currentPair = state.getIn(['vote', 'pair'])
  if (currentPair && currentPair.includes(selection)) {
    return state.set('hasVoted', selection)
  } else return state
}

function resetVote(state) {
  const hasVoted = state.get('hasVoted')
  const currentPair = state.getIn(['vote', 'pair'])
  const remainingEntries = state.get('entries')
  if (hasVoted && !currentPair.includes(hasVoted)) {
    return state.remove('hasVoted')
  } else if (remainingEntries && remainingEntries.length === 0) {
    return state.remove('hasVoted')
  } else return state
}