import React from 'react';
import { connect } from 'react-redux'
import { getDailyForecast } from '../store/dailyForecast/actions'
import DailyForecastPage from '../pages/DailyForecastPage'

const DailyForecastContainer = (props) => {
    const { getDailyForecast, cityName, dailyForecast, isFetching, error } = props
    return (
        <DailyForecastPage
            getDailyForecast={getDailyForecast}
            cityName={cityName}
            dailyForecast={dailyForecast}
            isFetching={isFetching}
            error={error}
        />
    )
}

const mapStateToProps = (store) => {
    return {
        cityName: store.dailyForecast.cityName,
        dailyForecast: store.dailyForecast.dailyForecast,
        isFetching: store.dailyForecast.isFetching,
        error: store.dailyForecast.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getDailyForecast: (cityID) => dispatch(getDailyForecast(cityID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DailyForecastContainer)