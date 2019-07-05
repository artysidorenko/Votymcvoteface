/* eslint-disable no-undef */
import { Map, fromJS } from "immutable"
import { expect } from "chai"

import makeStore from "../src/store"

describe("store", (): void => {
    it("is a Redux store configured with the correct reducer", (): void => {
        const store = makeStore()
        expect(store.getState()).to.equal(Map())

        store.dispatch({
            type: "SET_COUNTRY",
            contestants: ["Romania", "United Kingdom"]
        })
        expect(store.getState()).to.equal(
            fromJS({
                contestants: ["Romania", "United Kingdom"]
            })
        )
    })
})
