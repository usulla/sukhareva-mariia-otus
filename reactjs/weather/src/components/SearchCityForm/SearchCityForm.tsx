import React, { Component } from "react"
import RootRef from '@material-ui/core/RootRef'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from '@material-ui/core/Button'
import withFetch from '../withFetch'
import styles from './styles.module.scss'
import styled from 'styled-components'
import { IStateSearch, IPropsSearch } from '../../interfaces';

const FormWrap = styled.div`
  width:320px;
  margin: 0 auto;
  position:relative;
    input {
        background: rgba(255, 255, 255, 0.7);
        border: none;
    }
`;

class SearchCityForm extends Component<IPropsSearch, IStateSearch> {
    private cityInput: React.RefObject<HTMLInputElement>
    constructor(props: IPropsSearch) {
        super(props);
        this.cityInput = React.createRef()
        this.searchCity = this.searchCity.bind(this)
        this.selectCity = this.selectCity.bind(this)
    }

    searchCity = (e) => {
        e.preventDefault()
        const findMatches = (wordToMatch, cities) => {
            const regex = new RegExp(wordToMatch, 'gi')
            return cities.filter(place => {
                return place.name.match(regex)
            })
        }

        const displayMatches = () => {
            const matchArray = findMatches(this.cityInput.current!.value, this.props.results)
            const cytiesList = matchArray.map(city => {
                const regex = new RegExp(this.cityInput.current!.value, 'gi');
                const cityName = city.name.replace(regex, `<span className="hl2">${this.cityInput.current!.value}</span>`);
                return { name: cityName, index: city.id }
            })
            this.props.searchCitiesMatch(cytiesList)
        }
        displayMatches()
    }
    selectCity = (index) => {
        this.props.addList(index)
        this.cityInput.current!.value = "";
        this.props.searchCitiesMatch([])
    }

    render() {
        const { citiesSearchMatch } = this.props
        return (
            <FormWrap>
                <Form onSubmit={(e: any): void => this.searchCity(e)}>
                    <FormGroup controlId="formAddItem">
                        <InputGroup className="mb-3" >
                            <>
                                <RootRef rootRef={this.cityInput}>
                                    <FormControl
                                        placeholder="London"
                                        autoComplete="off"
                                    // onChange={(e: any): void => this.searchCity(e)}
                                    />
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
                        {citiesSearchMatch.length > 0 &&
                            <ul>
                                {citiesSearchMatch.map(city => {
                                    return (
                                        <li key={city.index} onClick={(): void => this.selectCity(city.index)}>
                                            <span className="city_name" dangerouslySetInnerHTML={{ __html: `${city.name}` }} />
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
}

const url = "/json/city.list.min.json"
export default withFetch({ url: url })(SearchCityForm)