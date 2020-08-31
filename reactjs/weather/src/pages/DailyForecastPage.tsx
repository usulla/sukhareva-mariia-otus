import React, { FC } from 'react'
import WeatherCard from '../components/ WeatherCard/WeatherCard'
import styled from 'styled-components'
import { Loading } from 'components/Loading'

const Title = styled.h1`
  color:#000000;
  text-align:center;
  width:100%; 
  font-size:2rem;
  padding-top: 20px;
`;

const DailyForecastPage: FC<any> = (props) => {
    const { cityName, dailyForecast, isFetching, error } = props
    return (
        <>
            <Title>Daily Forecast for 5 days in {cityName}</Title>
            {(isFetching || error) &&
                isFetching ? <Loading /> : <div>{error}</div>
            }
            {(!isFetching && !error) &&
                (dailyForecast.length === 0) &&
                <p className="center">While there is no cities</p>
            }
            {(!isFetching && !error) &&
                (dailyForecast.length !== 0) &&
                dailyForecast.map(list => {
                    return (
                        <WeatherCard idList={list.id}
                            weather={list} key={list.id}
                        />
                    )
                })
            }
        </>
    )
}

export default DailyForecastPage