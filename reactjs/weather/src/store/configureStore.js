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

const citiesFromLocalStorage = JSON.parse((localStorage.getItem(STORAGE_KEY)))
const initialCities = citiesFromLocalStorage && citiesFromLocalStorage.length !== 0 ? citiesFromLocalStorage : [524901, 703448, 2643743]
const url = `http://api.openweathermap.org/data/2.5/group?id=${initialCities.join()}&units=metric&appid=${APPID}`
store.dispatch(getWeather(url))

/* Save to LocalStorage */
store.subscribe(() => {
    const selectedCitiesId = store.getState().weather.cities.map(city => city.id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedCitiesId))
})