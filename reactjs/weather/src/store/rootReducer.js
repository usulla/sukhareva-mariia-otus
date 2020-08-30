import { combineReducers } from 'redux'
import { weatherReducer as weather } from './weather/reducer'
import { dailyForecastReducer as dailyForecast } from './dailyForecast/reducer'

export const rootReducer = combineReducers({
    weather, dailyForecast
})