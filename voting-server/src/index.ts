import makeStore from './store'
import startServer from './server'

export const store = makeStore()
startServer(store)

store.dispatch({
    type: 'SET_COUNTRY',
    contestants: require('../entries.json')
})
store.dispatch({ type: 'NEXT' })
