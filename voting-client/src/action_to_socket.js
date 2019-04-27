// eslint-disable-next-line no-unused-vars
export default socket => store => next => action => {
  // only emit actions that are relevant to the server (i.e. not SET_STATE)
  if (action.meta && action.meta.remote) {
    socket.emit('action', action)
    console.log('action emitted', action)
  }
  return next(action)
}