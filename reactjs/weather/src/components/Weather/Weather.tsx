import React, { useRef } from "react";
import RootRef from '@material-ui/core/RootRef';
import styled from 'styled-components'
// import styles from './styles.module.scss';
import HeaderList from './HeaderList/HeaderList'
import { TodoItems } from './TodoItems/TodoItems.js';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
// import Button from 'react-bootstrap/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { ITodo, T } from '../../interfaces';

type TodoListProps = {
  weather: any
  idList: string | number
  addTodo: (idList: number | string, todo: ITodo) => void
  deleteList: (idList: number | string) => void
  renameList: (idList: number | string, title: string) => void
}
const Row = styled.div`
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
    img {
        width: 30%;
    }
`;
const Temp = styled.div`
 font-size:3rem;
 font-weight:bold;
`;

const Detail = styled.ul`
 list-style:none;
 padding-left:0;
  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
      span {
        font-size:.8rem;
        }
 }
`;
const TodoList: React.FC<TodoListProps> = (props) => {
  const { weather, idList, addTodo, deleteList, renameList } = props
  const taskInput = useRef<HTMLInputElement>(null);

  const addItem = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (taskInput.current!.value !== "") {
      /* Create new entry */
      const newItem: any = {
        id: Date.now(),
        text: taskInput.current!.value,
        completed: false
      }
      addTodo(idList, newItem)
      /* Clear input for new task*/
      taskInput.current!.value = "";
    }
  }
  return (
    <Card style={{ background: 'rgba(255, 255, 255, .7)', margin: '35px 40px', maxWidth: '320px', width: '320px' }}>
      <CardContent>
        <HeaderList idList={idList} title={weather.name}
          deleteList={() => deleteList(idList)}
          saveTitleList={(idList, title) => renameList(idList, title)}
        />
        <Row>
          <Temp>
            {Math.round(weather.main.temp)}°C
        </Temp>
          <img src={`//openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${weather.weather[0].icon}.png`} />
        </Row>
        <div className="details">
          <hr />
          <h6>Details</h6>
          <Detail>
            <li>
              <span>Feels like:</span>
              {weather.main.feels_like}°C
            </li>
            <li>
              <span>Wind:</span>
              {weather.wind.speed}m/s
            </li>
            <li>
              <span>Humidity:</span>
              {weather.main.humidity}%
            </li>
            <li>
              <span>Pressure:</span>
              {weather.main.pressure}hPa
            </li>
          </Detail>
        </div>
        {/* <Form onSubmit={addItem.bind(this, idList, taskInput)}> */}
        {/* <Form onSubmit={(event: any): void => addItem(event)}>
          <FormGroup controlId="formAddItem">
            <InputGroup className="mb-3">
              <>
                <RootRef rootRef={taskInput}>
                  <FormControl
                    placeholder="enter task"
                  />
                </RootRef>
                <InputGroup.Append>
                  <Button type="submit" variant="contained" color="primary">
                    Add
                  </Button>
                </InputGroup.Append>
              </>
            </InputGroup>
          </FormGroup>
        </Form> */}
        {/* <TodoItems /> */}
      </CardContent>
    </Card>
  );
}

export default TodoList;