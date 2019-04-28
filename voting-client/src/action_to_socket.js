import objectAssign from 'object-assign' // <-- polyfill for Object.assign

// eslint-disable-next-line no-unused-vars
export default socket => store => next => action => {
  // only emit actions that are relevant to the server (i.e. not SET_STATE)
  if (action.meta && action.meta.remote) {
    const clientId = store.getState().get('clientId')
    socket.emit('action', objectAssign({}, action, {clientId}))
  }
  return next(action)
}