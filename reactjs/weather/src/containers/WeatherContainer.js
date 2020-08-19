import React from 'react';
import { connect } from 'react-redux'
import { createList, deleteList, deleteTodo, renameList, completedTodo, addTodo } from '../store/todos/actions'
import WeatherPage from '../pages/WeatherPage.tsx'

const WeatherContainer = (props) => {
    const { weather, isFetching, error, lists, createList, deleteTodo, completedTodo, addTodo, deleteList, renameList } = props
    return (
        <WeatherPage
            lists={lists}
            createList={createList}
            deleteTodo={deleteTodo}
            completedTodo={completedTodo}
            addTodo={addTodo}
            deleteList={deleteList}
            renameList={renameList}
            weather={weather} 
            isFetching={isFetching} 
            error={error} 
        />
    )
}

const mapStateToProps = (store) => {
    return {
        lists: store.lists.lists,
        weather: store.lists.weather,
        isFetching: store.lists.isFetching,
        error: store.lists.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createList: (newList) => dispatch(createList(newList)),
        deleteTodo: (idList, idTodo) => dispatch(deleteTodo(idList, idTodo)),
        completedTodo: (idList, idTodo) => dispatch(completedTodo(idList, idTodo)),
        addTodo: (idList, todo) => dispatch(addTodo(idList, todo)),
        deleteList: (idList) => dispatch(deleteList(idList)),
        renameList: (idList, title) => dispatch(renameList(idList, title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer)