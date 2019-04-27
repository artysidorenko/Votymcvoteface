import { List, Map } from 'immutable'

export function setEntries (state, entries) {
  return state.set('entries', List(entries))
}

export function nextPair (state) {
  console.log('next input state:\n', state)
  const entries = state.get('entries').concat(getWinners(state.get('vote')))
  if (entries.size === 1) {
    return state.remove('vote')
      .remove('entries')
      .set('winner', entries.first())
  } else {
    console.log('next output state w/o winner:\n', state.merge({
      vote: Map({
        pair: entries.take(2)
      }),
      entries: entries.skip(2)
    }))

    return state.merge({
      vote: Map({
        pair: entries.take(2)
      }),
      entries: entries.skip(2)
    })
  }
}

export function vote (voteState, selection) {
  console.log('vote output state:\n', voteState.updateIn(
    ['results', selection],
    0,
    results => results + 1
  ))
  return voteState.updateIn(
    ['results', selection],
    0,
    results => results + 1
  )
}

export const INITIAL_STATE = Map()

// utility function

function getWinners (vote) {
  if (!vote) return []
  const [ a, b ] = vote.get('pair')
  const aVotes = vote.getIn(['results', a], 0)
  const bVotes = vote.getIn(['results', b], 0)
  if (aVotes > bVotes) return [a]
  else if (aVotes < bVotes) return [b]
  else return [a, b]
}
