import { APPID, STORAGE_KEY, CREATE_LIST, DELETE_LIST, GET_WEATHER_REQUEST, GET_WEATHER_SUCCESS, GET_WEATHER_FAILURE } from '../types.js'
import { getWeather } from './actions'
import {store} from '../configureStore'

const initialState = {
    isFetching: false,
    error: '',
    cities: []
}

export const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        // case CREATE_LIST:
        //     return {
        //         ...state,
        //         // ...state.concat([action.payload])
        //         cities: state.cities.concat([action.payload])
        //     }
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