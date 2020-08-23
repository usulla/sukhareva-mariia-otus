import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherContainer from '../containers/WeatherContainer';

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
            <Route component={WeatherContainer} path='/' exact />
          </Switch>
        </Wrapper>
      </BrowserRouter>
    </>
  )
}
