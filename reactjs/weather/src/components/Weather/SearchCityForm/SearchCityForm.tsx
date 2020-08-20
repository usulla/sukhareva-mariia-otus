import React, { useRef } from "react"
import RootRef from '@material-ui/core/RootRef'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from '@material-ui/core/Button'

export const SearchCityForm = ({addList}) => {

    const taskInput = useRef<HTMLInputElement>(null);
    const searchCity = (event)=> {
        event.preventDefault();
        if (taskInput.current!.value !== "") {
            /* Create new entry */
            const newCity: string = taskInput.current!.value
            addList(newCity)
            /* Clear input for new task*/
            taskInput.current!.value = "";
        }
    }
    const addItem = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (taskInput.current!.value !== "") {
            /* Create new entry */
            const newCity: any = {
                id: Date.now(),
                text: taskInput.current!.value
            }
            addList(newCity)
            /* Clear input for new task*/
            taskInput.current!.value = "";
        }
    }
    return (
        <Form onSubmit={(event: any): void => searchCity(event)}>
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
        </Form>
    )
}