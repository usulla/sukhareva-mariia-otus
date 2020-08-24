import { APPID, STORAGE_KEY, DELETE_LIST, GET_WEATHER_REQUEST, GET_WEATHER_SUCCESS, GET_WEATHER_FAILURE, MATCH_CITIES } from '../types.js'
// List 
export const createList = (newCityId) => {
    const citiesFromLocalStorage = JSON.parse((localStorage.getItem(STORAGE_KEY)))
    const newCitiesId = citiesFromLocalStorage.concat(newCityId)
    const url = `http://api.openweathermap.org/data/2.5/group?id=${newCitiesId.join()}&units=metric&appid=${APPID}`
    return dispatch => {
        dispatch(getWeather(url))
    }
}

export const deleteList = (id) => {
    return {
        type: DELETE_LIST,
        payload: id
    }
}

export const searchCitiesMatch = (cytiesList) => {
    return {
        type: MATCH_CITIES,
        payload: cytiesList
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
                    console.log(url)
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

