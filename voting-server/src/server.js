import Server from 'socket.io'
import { store } from '..'

export default function startServer () {
  const io = new Server().attach(process.env.PORT || 5000)

  // NOTE: this will send the ENTIRE state
  // should optimise for more complex app to limit data transfer
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  )

  io.on('connection', (socket) => {
    // Emit state to any newly connected client
    socket.emit('state', store.getState().toJS())

    // Accept actions from connected clients
    // NOTE: could be a security risk in more complex apps
    // as we are accepting ANY actions from ANY client
    socket.on('action', store.dispatch.bind(store))
  })

  console.log('Server started')
}
