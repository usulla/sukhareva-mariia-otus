import React from 'react';
import { connect } from 'react-redux'
import { createList, deleteList } from '../store/weather/actions'
import WeatherPage from '../pages/WeatherPage.tsx'

const WeatherContainer = (props) => {
    const { weather, isFetching, error, createList, deleteList } = props
    return (
        <WeatherPage
            createList={createList}
            deleteList={deleteList}
            weather={weather} 
            isFetching={isFetching} 
            error={error} 
        />
    )
}

const mapStateToProps = (store) => {
    return {
        weather: store.weather.cities,
        isFetching: store.weather.isFetching,
        error: store.weather.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createList: (newList) => dispatch(createList(newList)),
        deleteList: (idList) => dispatch(deleteList(idList))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer)