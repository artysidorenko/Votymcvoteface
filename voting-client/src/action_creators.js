/**
 * This module is useful for centralising all the actions
 * that are possible within the client application
 * (instead of locally declaring actions via object literals) 
 */

export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  }
}

export function vote(selection) {
  return {
    meta: { remote: true },
    type: 'VOTE',
    selection
  }
}

export function next() {
  return {
    meta: { remote: true },
    type: 'NEXT'
  };
}