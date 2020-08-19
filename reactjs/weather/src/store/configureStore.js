import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { rootReducer } from './rootReducer'
import { STORAGE_KEY } from './types'
import { APPID } from './types'
import { getWeather } from './weather/actions'

export const store = createStore(rootReducer,
    compose(applyMiddleware(thunk, logger), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)
/* Save to LocalStorage */
store.subscribe(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().weather))
})

const citiesId = [524901, 703448, 2643743]
const url = `http://api.openweathermap.org/data/2.5/group?id=${citiesId.join(',')}&units=metric&appid=${APPID}`
// const url = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${APPID}`
store.dispatch(getWeather(url)) 