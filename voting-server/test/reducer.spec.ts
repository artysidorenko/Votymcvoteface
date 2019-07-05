/* eslint-disable no-undef */
import { Map, fromJS, List } from "immutable"
import { expect } from "chai"

import reducer from "../src/reducer"
import { State, SET_COUNTRY, SetCountryAction, NextAction, VoteAction, ResetAction, ServerAction } from "../src/types"
import initialcontestants from "../entries.json";

describe("reducer", (): void => {
    it("processes SET_COUNTRY", (): void => {
        const initialState: State = fromJS({})
        const action: SetCountryAction = {
            type: "SET_COUNTRY",
            contestants: List.of("Romania"),
            meta: { remote: false }
        }
        const nextState: State = reducer(initialState, action)

        expect(nextState).to.equal(
            fromJS({
                contestants: ["Romania"]
            })
        )
    })

    it("processes NEXT", (): void => {
        const initialState: State = fromJS({
            contestants: ["Romania", "United Kingdom"]
        })
        const action: NextAction = {
            type: "NEXT",
            meta: { remote: true }
        }
        const nextState: State = reducer(initialState, action)

        expect(nextState).to.equal(
            fromJS({
                vote: {
                    pair: ["Romania", "United Kingdom"],
                    round: 1
                },
                contestants: []
            })
        )
    })

    it("processes VOTE", (): void => {
        const initialState: State = fromJS({
            vote: {
                pair: ["Romania", "United Kingdom"]
            },
            contestants: []
        })
        const action: VoteAction = {
            type: "VOTE",
            selection: "Romania",
            clientId: "client1",
            meta: { remote: true }
        }
        const nextState: State = reducer(initialState, action)

        expect(nextState).to.equal(
            fromJS({
                vote: {
                    pair: ["Romania", "United Kingdom"],
                    results: {
                        Romania: 1
                    },
                    votes: {
                        client1: "Romania"
                    }
                },
                contestants: []
            })
        )
    })

    it("processes RESET", (): void => {
        const initialState: State = fromJS({
            vote: {
                pair: ["Romania", "United Kingdom"]
            },
            contestants: ["France", "Israel"]
        })
        const action: ResetAction = {
            type: "RESET",
            meta: { remote: true }
        }
        const nextState: State = reducer(initialState, action)

        expect(nextState).to.equal(
            fromJS({
                vote: {
                    pair: [initialcontestants[0], initialcontestants[1]],
                    round: 1
                },
                contestants: initialcontestants.slice(2),
                winner: null
            })
        )
    })

    it("has an initial state", (): void => {
        const action: SetCountryAction = { type: "SET_COUNTRY", contestants: List.of("Romania"), meta: {remote: true} }
        const nextState: State = reducer(undefined, action)
        expect(nextState).to.equal(
            fromJS({
                contestants: ["Romania"]
            })
        )
    })

    it("can be used with reduce array method", (): void => {
        const actions: ServerAction[] = [
            { type: "SET_COUNTRY", contestants: List.of("Romania", "United Kingdom"), meta: {remote: false} },
            { type: "NEXT", meta: {remote: true} },
            { type: "VOTE", selection: "Romania", meta: {remote: true}, clientId: 'testClient' },
            { type: "VOTE", selection: "United Kingdom", meta: {remote: true}, clientId: 'testClient2'  },
            { type: "VOTE", selection: "Romania", meta: {remote: true}, clientId: 'testClient3' },
            { type: "NEXT", meta: {remote: true} }
        ]
        const finalState = actions.reduce(reducer, fromJS({}))

        expect(finalState).to.equal(
            fromJS({
                winner: "Romania"
            })
        )
    })
})
