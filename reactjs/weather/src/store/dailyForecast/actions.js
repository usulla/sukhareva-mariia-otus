import { APPID, GET_DAILY_FORECAST_REQUEST, GET_DAILY_FORECAST_SUCCESS, GET_DAILY_FORECAST_FAILURE } from '../types.js'

export const getDailyForecast = (cityID) => {
    const url = `//api.openweathermap.org/data/2.5/forecast?id=${cityID}&appid=${APPID}`
    console.log(url)
    return dispatch => {
        dispatch({
            type: GET_DAILY_FORECAST_REQUEST
        })
        try {
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    dispatch({
                        type: GET_DAILY_FORECAST_SUCCESS,
                        payload: {
                            dailyForecast: json.list,
                            cityName: json.city.name
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
                type: GET_DAILY_FORECAST_FAILURE,
                payload: error
            })
        }
    }
}

