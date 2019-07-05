import express from 'express'
import http from 'http'

import { Store } from 'redux'
import { Socket } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 5000

export default function startServer (store: Store): void {
    app.get('/', (req, res): void => {
        res.send(`
            <p>Welcome to VotyMcVoteFace. Server is on and listening to client requests</p>
            <p>To communicate with the app, go to client URL:</p>
            <p><a href="https://votymcclient.herokuapp.com">https://votymcclient.herokuapp.com</a></p>  
        `)
    })

    // NOTE: this will send the ENTIRE state
    // should optimise for more complex app to limit data transfer
    store.subscribe(
        (): void => {
            const state = store.getState().toJS()
            io.emit('state', state)
        }
    )

    io.on('connection', (socket: Socket): void => {
        // Emit state to any newly connected client
        const state = store.getState().toJS()

        socket.emit('state', state)

        // Accept actions from connected clients
        // NOTE: could be a security risk in more complex apps
        // as we are accepting ANY actions from ANY client
        socket.on('action', store.dispatch.bind(store))
    })

    server.listen(PORT, function (): void {
        // eslint-disable-next-line no-console
        console.log(`Server started on port ${PORT}`)
    })
}
