import { combineReducers } from 'redux'
import { weatherReducer as weather } from './weather/reducer'

export const rootReducer = combineReducers({
    weather
})