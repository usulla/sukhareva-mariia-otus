import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { rootReducer } from './rootReducer'
import { STORAGE_KEY } from './types'

export const store = createStore(rootReducer,
    compose(applyMiddleware(thunk, logger), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)
/* Save to LocaStorage */
store.subscribe(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().lists.lists))
})