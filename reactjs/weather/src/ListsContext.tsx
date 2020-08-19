import React from 'react';
import { ITodo } from './interfaces';

const initialTodos: any = [{
  id: Date.now(),
  title: 'Москва',
  todos: [
    {
      id: Date.now(),
      text: 'Ветер',
      completed: false
    }]
}];

const ListsContext = React.createContext(initialTodos);

export default ListsContext;