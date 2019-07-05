import { List, Map, fromJS } from "immutable";
import { State, Vote } from "./types/index.js";



export const INITIAL_STATE: State = fromJS({
    // vote: null,
    // contestants: null,
    // winner: null,
    // votes: null
})

// utility function
function getWinners(vote: Vote): string[] {
    if (!vote) return [];
    // const [a, b] = vote.get("pair");
    const [a, b] = vote.get("pair");
    const aVotes = vote.getIn(["results", a], 0);
    const bVotes = vote.getIn(["results", b], 0);
    if (aVotes > bVotes) return [a];
    else if (aVotes < bVotes) return [b];
    else return [a, b];
}

export function setContestants(state: State, contestants: List<string>): State {
    return state.set("contestants", List(contestants));
}

export function nextPair(state: State): State {
    const contestants: List<string> = fromJS([...state.get("contestants"), ...getWinners(fromJS(state.get("vote")))])
    if (contestants.size === 1) {
        return state
            .remove("vote")
            .remove("contestants")
            .set("winner", contestants.first())
    } else {
        return fromJS(state.merge({
            vote: Map({
                pair: contestants.take(2),
                round: state.getIn(["vote", "round"], 0) + 1
            }),
            contestants: contestants.skip(2)
        }))
    }
}

export function resetVote(): State {
    const contestants = List(require("../entries.json"));
    return fromJS({
        vote: fromJS({
            pair: contestants.take(2),
            round: 1
        }),
        contestants: fromJS(contestants.skip(2)),
        winner: null
    })
}

export function vote(voteState: Vote, selection: string, clientId: string): Vote {
    const pair = fromJS(voteState.get("pair"));
    if (pair.includes(selection)) {
        let voteStateReset = voteState;
        const previousVote = voteState.getIn(["votes", clientId]);
        if (previousVote) {
            voteStateReset = voteState
                .updateIn(["results", previousVote], (result): number => result - 1)
                .removeIn(["votes", clientId]);
        }
        return voteStateReset
            .updateIn(["results", selection], 0, (result): number => result + 1)
            .setIn(["votes", clientId], selection);
    } else {
        return voteState;
    }
}
