import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import TodosContainer from '../containers/TodosContainer';

/* TODO: 
- 1. добавить сворачивание списка
+ 2. добавить удаление списка
+ 3. добавить переименование списка
- 4. сделать теги
+ 5. добавить фон
- 6. фон из flickr или живые обои
- 7. добавить иконку
*/
const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap:wrap;
`;

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Wrapper>
          <Switch>
            <Route component={TodosContainer} path='/' exact />
          </Switch>
        </Wrapper>
      </BrowserRouter>
    </>
  )
}
