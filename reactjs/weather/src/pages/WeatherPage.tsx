import React from 'react';
import { ITodo } from '../interfaces';
import ListsContext from '../ListsContext'
import Weather from '../components/Weather/Weather';
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import { Loading } from 'components/Loading';

const Title = styled.h1`
  color:#000000;
  text-align:center;
  width:100%;
  font-size:2rem;
  padding-top: 20px;
`;

const WeatherPage: React.FC<any> = (props) => {
    const { weather, isFetching, error, lists, createList, deleteList} = props
    const addList = (): void => {
        const newList: ITodo = {
            id: Date.now(),
            title: '',
            todos: []
        }
        createList(newList)
    }
    return (
        <>
            <Title>weather</Title>
            <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addList}>
                    Add city
                </Button>
            </div>
            {isFetching &&
                <Loading />
            }
            {error &&
                <div>{error}</div>
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
                            <Weather idList={list.id}
                                weather={list}
                                deleteList={deleteList}/>
                        </ListsContext.Provider>
                    )
                })
            }
        </>
    )
}

export default WeatherPage;
