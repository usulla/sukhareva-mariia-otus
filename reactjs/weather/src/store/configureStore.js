import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { rootReducer } from './rootReducer'
import { STORAGE_KEY } from './types'
import { APPID } from './types'
import { getWeather } from './todos/actions'

export const store = createStore(rootReducer,
    compose(applyMiddleware(thunk, logger), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)
/* Save to LocaStorage */
store.subscribe(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().lists.lists))
})

const cityId = 2172797
const url = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${APPID}`
store.dispatch(getWeather(url)) 