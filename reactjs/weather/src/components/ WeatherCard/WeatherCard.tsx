import React, { FC } from "react";
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

type CardListProps = {
  weather: any
  idList?: string | number | any
  deleteList?: (idList: number | string) => void
  getDailyForecast?: (cityId: number | string) => void
}
const Row = styled.div`
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
    img {
        width: 30%;
    }
    a {
      color:#000;
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

const WeatherCard: FC<CardListProps> = (props) => {
  const { weather, idList, deleteList, getDailyForecast } = props
  return (
    <Card style={{ background: 'rgba(255, 255, 255, .7)', margin: '35px 40px', maxWidth: '320px', width: '320px' }}>
      <CardContent>
        <Row>
          {weather.name &&
            <Link to={`${weather.id}`} onClick={() => getDailyForecast && getDailyForecast(weather.id)}>
              <Typography variant="h6" component="h2"> {weather.name}</Typography>
            </Link>
          }
          {weather.dt_txt &&
              <Typography variant="h6" component="h2">  {weather.dt_txt.slice(0, -3)}</Typography>
          }
          {deleteList &&
            <IconButton aria-label="delete" onClick={() => deleteList && deleteList(idList)}>
              <CloseIcon />
            </IconButton>
          }
        </Row>
        <Row>
          {/* If Kelvin when x-273.15 */}
          <Temp>
            {Math.round(weather.main.temp < 200 ? weather.main.temp : weather.main.temp - 273.15)}°C
          </Temp>
          <img src={`//openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${weather.weather[0].icon}.png`} alt="weather" />
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

export default WeatherCard;