/* eslint-disable no-undef */
import { List, Map, fromJS } from "immutable"
import { expect } from "chai"

import { setContestants, resetVote, nextPair, vote } from "../src/core"
import { State, Vote } from "../src/types"
import initialcontestants from "../entries.json"

describe("App logic", (): void => {
    describe("setContestants", (): void => {
        it("add contestants to application state", (): void => {
            const state: State = fromJS({})
            const contestants = List.of("Romania", "United Kingdom")
            const nextState = setContestants(state, contestants)
            expect(nextState).to.equal(
                Map({
                    contestants: List.of("Romania", "United Kingdom")
                })
            )
        })

        it("accepts regular array and converts to immutable", (): void => {
            const state: State = fromJS({})
            const contestants: List<string> = List.of("Romania", "United Kingdom")
            const nextState = setContestants(state, contestants)
            expect(nextState).to.equal(
                Map({
                    contestants: List.of("Romania", "United Kingdom")
                })
            )
        })
    })

    describe("nextPair", (): void => {
        it("moves first two items from contestants to pair and initialises round 1", (): void => {
            const contestants = List.of("Romania", "United Kingdom", "Spain");
            const state: State = fromJS({
                contestants: contestants
            });
            const nextState = nextPair(state);
            expect(nextState).to.equal(
                Map({
                    vote: Map({
                        pair: List.of("Romania", "United Kingdom"),
                        round: 1
                    }),
                    contestants: List.of("Spain")
                })
            );
        });

        it("returns winner of vote back into list of contestants and increments round", (): void => {
            const state: State = fromJS({
                vote: Map({
                    pair: List.of("Romania", "United Kingdom"),
                    round: 1,
                    results: Map({
                        Romania: 3,
                        "United Kingdom": 2
                    })
                }),
                contestants: List.of("Spain", "Israel", "France")
            });
            const nextState = nextPair(state);
            expect(nextState).to.equal(
                Map({
                    vote: Map({
                        pair: List.of("Spain", "Israel"),
                        round: 2
                    }),
                    contestants: List.of("France", "Romania")
                })
            );
        });

        it("return both items from pair to contestants in the event of a tie and increments round", (): void => {
            const state: State = fromJS({
                vote: Map({
                    pair: List.of("Romania", "United Kingdom"),
                    round: 2,
                    results: Map({
                        Romania: 3,
                        "United Kingdom": 3
                    })
                }),
                contestants: List.of("Spain", "Israel", "France")
            });
            const nextState: State = nextPair(state);
            expect(nextState).to.equal(
                Map({
                    vote: Map({
                        pair: List.of("Spain", "Israel"),
                        round: 3
                    }),
                    contestants: List.of("France", "Romania", "United Kingdom")
                })
            );
        });

        it("returns the winning entry when there is no pair left", (): void => {
            const state: State = fromJS({
                vote: Map({
                    pair: List.of("Romania", "United Kingdom"),
                    results: Map({
                        Romania: 3,
                        "United Kingdom": 2
                    })
                }),
                contestants: List()
            });
            const nextState: State = nextPair(state);
            expect(nextState).to.equal(
                Map({
                    winner: "Romania"
                })
            );
        });

        it("erases client vote tracker on next round", (): void => {
            const state: State = fromJS({
                vote: Map({
                    pair: List.of("Romania", "United Kingdom"),
                    round: 1,
                    results: Map({
                        Romania: 3,
                        "United Kingdom": 2
                    }),
                    votes: Map({
                        client1: "Romania"
                    })
                }),
                contestants: List.of("Spain", "Israel", "France")
            });
            const nextState: State = nextPair(state);
            expect(nextState).to.equal(
                Map({
                    vote: Map({
                        pair: List.of("Spain", "Israel"),
                        round: 2
                    }),
                    contestants: List.of("France", "Romania")
                })
            );
        });
    });

    describe("resetVote", (): void => {
        it("resets contestants to original set and restarts vote", (): void => {
            const nextState: State = resetVote()
            expect(nextState).to.equal(
                fromJS({
                    vote: {
                        pair: [initialcontestants[0], initialcontestants[1]],
                        round: 1
                    },
                    contestants: initialcontestants.slice(2),
                    winner: null
                })
            );
        });
    });
    

    describe("vote", (): void => {
        it("initialises vote result for the voted entry", (): void => {
            const state: Vote = fromJS({
                pair: List.of("Romania", "United Kingdom")
            });
            const nextState: Vote = vote(state, "Romania", "client1")
            expect(nextState).to.equal(
                Map({
                    pair: List.of("Romania", "United Kingdom"),
                    results: Map({
                        Romania: 1
                    }),
                    votes: Map({
                        client1: "Romania"
                    })
                })
            );
        });
        
        it("increments existing vote result for the voted entry", (): void => {
            const state: Vote = fromJS({
                pair: List.of("Romania", "United Kingdom"),
                results: Map({
                    Romania: 2,
                    "United Kingdom": 3
                })
            });
            const nextState: Vote = vote(state, "Romania", "client1")
            expect(nextState).to.equal(
                Map({
                    pair: List.of("Romania", "United Kingdom"),
                    results: Map({
                        Romania: 3,
                        "United Kingdom": 3
                    }),
                    votes: Map({
                        client1: "Romania"
                    })
                })
            );
        });
        
        it("prevents from voting for entry not included in current pair", (): void => {
            const state: Vote = fromJS({
                pair: List.of("Romania", "United Kingdom"),
                results: Map({
                    Romania: 2,
                    "United Kingdom": 3
                })
            });
            const nextState: Vote = vote(state, "France", "client1")
            expect(nextState).to.equal(
                Map({
                    pair: List.of("Romania", "United Kingdom"),
                    results: Map({
                        Romania: 2,
                        "United Kingdom": 3
                    })
                })
            );
        });
        
        it("changes existing vote when client has already voted", (): void => {
            const state: Vote = fromJS({
                pair: List.of("Romania", "United Kingdom"),
                results: Map({
                    Romania: 2,
                    "United Kingdom": 3
                }),
                votes: Map({
                    client1: "Romania"
                })
            });
            const nextState: Vote = vote(state, "United Kingdom", "client1")
            expect(nextState).to.equal(
                Map({
                    pair: List.of("Romania", "United Kingdom"),
                    results: Map({
                        Romania: 1,
                        "United Kingdom": 4
                    }),
                    votes: Map({
                        client1: "United Kingdom"
                    })
                })
            );
        })
    })
})
