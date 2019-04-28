import { Map, fromJS } from 'immutable'

export default function reducer (state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return resetVote(setState(state, fromJS(action.state)))
    case 'VOTE':
      return vote(state, action.selection)
    case 'SET_CLIENT_ID':
      return state.set('clientId', action.clientId)
  }
  return state
}

// helper functions

function setState(state, newState) {
  return state.merge(newState)
}

function vote(state, selection) {
  const currentRound = state.getIn(['vote', 'round'])
  const currentPair = state.getIn(['vote', 'pair'])
  if (currentPair && currentPair.includes(selection)) {
    return state.set('myVote', Map({
      round: currentRound,
      selection
    }))
  } else return state
}

function resetVote(state) {
  const votedRound = state.getIn(['myVote', 'round'])
  const currentRound = state.getIn(['vote', 'round'])
  if (votedRound !== currentRound) {
    return state.remove('myVote')
  } else {
    return state
  }
}