import { createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
// import logger from 'redux-logger'
import rootReducer from '../reducers'

export default function appStore(reducerState) {
    return createStore(
        rootReducer,
        reducerState,
        applyMiddleware(thunk)
    )
}