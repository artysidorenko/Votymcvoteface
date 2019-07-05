import { setContestants, nextPair, resetVote, vote, INITIAL_STATE } from './core'
import { ServerAction, State, SET_COUNTRY, NEXT, RESET, VOTE, Vote } from './types'
import { fromJS } from 'immutable';


export default function reducer(state: State = INITIAL_STATE, action: ServerAction): State {
    switch (action.type) {
        case SET_COUNTRY:
            return setContestants(state, action.contestants)
        case NEXT:
            return nextPair(state)
        case RESET:
            return resetVote()
        case VOTE:
            return state.update('vote', (voteState): Vote => vote(fromJS(voteState), action.selection, action.clientId))
    }
    return state
}
