import { CREATE_LIST, DELETE_LIST, GET_WEATHER_REQUEST, GET_WEATHER_SUCCESS, GET_WEATHER_FAILURE  } from '../types.js'
// List
export const createList = (initialList) => {
    return {
        type: CREATE_LIST,
        payload: initialList
    }
}

export const deleteList = (id) => {
    return {
        type: DELETE_LIST,
        payload: id
    }
}

export const getWeather = (url) => {
    return dispatch => {
        dispatch({
            type: GET_WEATHER_REQUEST
        })
        try {
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    dispatch({
                        type: GET_WEATHER_SUCCESS,
                        payload: {
                            cities: json.list
                        }
                    })
                })
                // .catch(error =>
                //     dispatch({
                //         type: GET_WEATHER_FAILURE,
                //         payload: error
                //     })
                // )
        }
        catch (error) {
            dispatch({
                type: GET_WEATHER_FAILURE,
                payload: error
            })
        }
    }
}

