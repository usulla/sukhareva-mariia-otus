import React from "react";
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

type TodoListProps = {
  weather: any
  idList: string | number
  deleteList: (idList: number | string) => void
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
const Close = styled(CloseIcon)`
  
`;
const TodoList: React.FC<TodoListProps> = (props) => {
  const { weather, idList, deleteList} = props

  return (
    <Card style={{ background: 'rgba(255, 255, 255, .7)', margin: '35px 40px', maxWidth: '320px', width: '320px' }}>
      <CardContent>
        <Row>
          <Typography variant="h6" component="h2">
            {weather.name}
          </Typography>
          <IconButton aria-label="delete" onClick={() => deleteList(idList)}>
            <Close />
          </IconButton>
        </Row>
        <Row>
          <Temp>
            {Math.round(weather.main.temp)}°C
          </Temp>
          <img src={`//openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${weather.weather[0].icon}.png`} alt="weather"/>
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
      </CardContent>
    </Card>
  );
}

export default TodoList;