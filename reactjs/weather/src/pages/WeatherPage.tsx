import React from 'react';
import { ITodo } from '../interfaces';
import ListsContext from '../ListsContext'
import Weather from '../components/Weather/Weather';
import styled from 'styled-components'
import Button from '@material-ui/core/Button';

const Title = styled.h1`
  color:#000000;
  text-align:center;
  width:100%;
  font-size:2rem;
  padding-top: 20px;
`;

const WeatherPage: React.FC<any> = (props) => {
    const {  weather, isFetching, error, lists, createList, deleteTodo, completedTodo, addTodo, deleteList, renameList } = props
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
            <Title>weather {weather}</Title>
            <div>{weather}</div>
            <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addList}>
                    Add city
                </Button>
            </div>
            {(lists.length === 0) &&
                <p className="center">While there is no cities</p>
            }
            {lists.map(list => {
                return (
                    <ListsContext.Provider
                        key={list.id}
                        value={{
                            list: list,
                            deleteItem: deleteTodo,
                            completeItem: completedTodo
                        }}>
                        <Weather idList={list.id}
                            title={list.title}
                            addTodo={addTodo}
                            deleteList={deleteList}
                            renameList={renameList} />
                    </ListsContext.Provider>
                )
            })}
        </>
    )
}

export default WeatherPage;
