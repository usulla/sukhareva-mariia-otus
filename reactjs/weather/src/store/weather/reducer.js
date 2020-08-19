import { APPID, STORAGE_KEY, CREATE_LIST, DELETE_LIST, GET_WEATHER_REQUEST, GET_WEATHER_SUCCESS, GET_WEATHER_FAILURE } from '../types.js'
import { getWeather } from './actions'

const initialCities = {
    isFetching: false,
    error: '',
    cities: ''
}
// const citiesId = [524901, 703448, 2643743]
// const url = `http://api.openweathermap.org/data/2.5/group?id=${citiesId.join(',')}&units=metric&appid=${APPID}`
// initialCities.cities = getWeather(url)
const stateFromLocalStorage = JSON.parse((localStorage.getItem(STORAGE_KEY)))
const initialState = stateFromLocalStorage ? { cities: stateFromLocalStorage } : initialCities

// const url = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${APPID}`

export const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_LIST:
            return {
                ...state,
                // ...state.concat([action.payload])
                cities: state.cities.concat([action.payload])
            }
        case DELETE_LIST:
            return {
                ...state,
                cities: state.cities.filter(city => city.id !== action.payload)
            }
        case GET_WEATHER_REQUEST:
            return { ...state, isFetching: true }
        case GET_WEATHER_SUCCESS:
            return { ...state, isFetching: false, cities: action.payload.cities }
        case GET_WEATHER_FAILURE:
            return { ...state, isFetching: false, error: action.payload }

        default: return state
    }
}