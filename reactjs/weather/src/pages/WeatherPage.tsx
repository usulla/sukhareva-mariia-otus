import React from 'react';
import ListsContext from '../ListsContext'
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

const WeatherPage: React.FC<any> = (props) => {
    const { weather, isFetching, error, citiesSearchMatch, createList, deleteList, searchCitiesMatch } = props
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
                        <ListsContext.Provider
                            key={list.id}
                            value={{
                                list: list
                            }}>
                            <WeatherCard idList={list.id}
                                weather={list}
                                deleteList={deleteList} />
                        </ListsContext.Provider>
                    )
                })
            }
        </>
    )
}

export default WeatherPage;
