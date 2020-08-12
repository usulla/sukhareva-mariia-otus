import { combineReducers } from 'redux'
import { listsReducer as lists } from './todos/reducer'

export const rootReducer = combineReducers({
    lists
})