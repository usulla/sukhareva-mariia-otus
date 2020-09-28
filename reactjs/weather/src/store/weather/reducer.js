import { DELETE_LIST, GET_WEATHER_REQUEST, GET_WEATHER_SUCCESS, GET_WEATHER_FAILURE, MATCH_CITIES } from '../types.js'

const initialState = {
    isFetching: false,
    error: '',
    cities: [],
    citiesSearchMatch: []
}

export const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
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
        case MATCH_CITIES:
            return { ...state, citiesSearchMatch: action.payload }
        default: return state
    }
}