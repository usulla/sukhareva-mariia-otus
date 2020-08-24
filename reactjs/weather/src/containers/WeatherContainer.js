import React from 'react';
import { connect } from 'react-redux'
import { createList, deleteList, searchCitiesMatch } from '../store/weather/actions'
import WeatherPage from '../pages/WeatherPage.tsx'

const WeatherContainer = (props) => {
    const { weather, isFetching, error, citiesSearchMatch, searchCitiesMatch, createList, deleteList } = props
    return (
        <WeatherPage
            createList={createList}
            deleteList={deleteList}
            searchCitiesMatch={searchCitiesMatch}
            citiesSearchMatch={citiesSearchMatch}
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
        error: store.weather.error,
        citiesSearchMatch:store.weather.citiesSearchMatch
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createList: (newList) => dispatch(createList(newList)),
        deleteList: (idList) => dispatch(deleteList(idList)),
        searchCitiesMatch: (citiesList) => dispatch(searchCitiesMatch(citiesList))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer)