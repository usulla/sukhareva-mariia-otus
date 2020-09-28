import { GET_DAILY_FORECAST_REQUEST, GET_DAILY_FORECAST_SUCCESS, GET_DAILY_FORECAST_FAILURE } from '../types.js'

const initialState = {
    isFetching: false,
    error: '',
    dailyForecast: [],
    cityName: ''
}

export const dailyForecastReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DAILY_FORECAST_REQUEST:
            return { ...state, isFetching: true }
        case GET_DAILY_FORECAST_SUCCESS:
            return { ...state, isFetching: false, dailyForecast: action.payload.dailyForecast, cityName: action.payload.cityName}
        case GET_DAILY_FORECAST_FAILURE:
            return { ...state, isFetching: false, error: action.payload }
        default: return state
    }
}