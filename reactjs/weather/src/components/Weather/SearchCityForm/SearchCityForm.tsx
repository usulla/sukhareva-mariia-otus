import React, { useRef, useState, useEffect } from "react"
import RootRef from '@material-ui/core/RootRef'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import styles from './styles.module.scss';

const FormWrap = styled.div`
  width:320px;
  margin: 0 auto;
  position:relative;
    input {
        background: rgba(255, 255, 255, 0.7);
        border: none;
  }
`;


export const SearchCityForm = ({ addList }) => {
    const cityInput = useRef<HTMLInputElement>(null);

    const [list, setList] = useState([]);
    const [citiesList, setCitiesList] = useState(0);


    useEffect(() => {
        async function fetchCities() {
            const endpoint = '/json/city.json';
            // const endpoint = '/json/city.list.min.json';
            const response = await fetch(endpoint)
            const json = await response.json()
            setCitiesList(json)
        }
        fetchCities();
    }, [citiesList])

    const searchCity = (e) => {
        e.preventDefault()

        function findMatches(wordToMatch, cities) {
            const regex = new RegExp(wordToMatch, 'gi')
            return cities.filter(place => {
                return place.name.match(regex)
            })
        }
        // const searchInput = document.querySelector('.search');
        // const suggestions = document.querySelector('.suggestions');

        function displayMatches() {
            const matchArray = findMatches(cityInput.current!.value, citiesList)
            const cytiesList = matchArray.map(city => {
                const regex = new RegExp(cityInput.current!.value, 'gi');
                const cityName = city.name.replace(regex, `<span className="hl2">${cityInput.current!.value}</span>`);
                return city.id
            })
            setList(cytiesList)
        }
        displayMatches()



        // if (cityInput.current!.value !== "") {
        //     /* Create new entry */
        //     const newCity: string = cityInput.current!.value
        //     addList(newCity)
        //     /* Clear input for new city*/
        //     cityInput.current!.value = "";
        // }
    }
    const selectCity = (city) => {
        console.log(city)
    }
    return (
        <FormWrap>
            <Form onSubmit={(e: any): void => searchCity(e)}>
                <FormGroup controlId="formAddItem">
                    <InputGroup className="mb-3" >
                        <>
                            <RootRef rootRef={cityInput}>
                                <FormControl
                                    placeholder="London"
                                    autoComplete="off"
                                    onChange={(e: any): void => searchCity(e)} />
                            </RootRef>
                            <InputGroup.Append>
                                <Button type="submit" variant="contained" color="primary">
                                    Search
                            </Button>
                            </InputGroup.Append>
                        </>
                    </InputGroup>
                </FormGroup>
                <div className={styles.suggestions}>
                    {list.length !== 0 &&
                        <ul>
                            {list.map(city => {
                                return (
                                    <li onClick={(): void => selectCity(city)}>
                                        <span className="city_name" dangerouslySetInnerHTML={{ __html: `${city}` }} />
                                    </li>
                                )
                            })
                            }
                        </ul>
                    }
                </div>
            </Form>
        </FormWrap>
    )
}