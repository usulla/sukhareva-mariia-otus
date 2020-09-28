import React, { FC } from 'react';
import WeatherCard from '../components/ WeatherCard/WeatherCard';
import styled from 'styled-components'
import { Loading } from 'components/Loading';
import SearchCityForm from '../components/SearchCityForm/SearchCityForm';

const Title = styled.h1`
  color:#000000;
  text-align:center;
  width:100%;
  font-size:2rem;
  padding-top: 20px;
`;

const WeatherPage: FC<any> = (props) => {
    const { weather, isFetching, error, citiesSearchMatch, createList, deleteList, searchCitiesMatch, getDailyForecast } = props
    return (
        <>
            <Title>weather</Title>
            <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                <SearchCityForm addList={createList} citiesSearchMatch={citiesSearchMatch} searchCitiesMatch={searchCitiesMatch} />
            </div>
            {(isFetching || error) &&
                isFetching ? <Loading /> : <div>{error}</div>
            }
            {(!isFetching && !error) &&
                (weather.length === 0) &&
                <p className="center">While there is no cities</p>
            }
            {(!isFetching && !error) &&
                (weather.length !== 0) &&
                weather.map(list => {
                    return (
                            <WeatherCard idList={list.id}
                                weather={list}
                                deleteList={deleteList}
                                getDailyForecast={getDailyForecast}
                                key={list.id} />
                    )
                })
            }
        </>
    )
}

export default WeatherPage;
