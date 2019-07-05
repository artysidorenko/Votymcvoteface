import { createStore, Store } from 'redux'
import reducer from './reducer'

export default function makeStore (): Store {
    return createStore(reducer)
}
