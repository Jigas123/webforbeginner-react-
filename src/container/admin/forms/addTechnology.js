import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const AddTechnology = (props) => {
    const {technology,hours,errors} = props.stateData;
    debugger
    return (
        <Form inline className="pb-5 pl-5">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">Technology:</Label>
                <Input type="text" name="technology" onChange = {event => props.handleChange(event,"technology")}
                       value = {technology || ''} placeholder="Technology" />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label className="mr-sm-2"></Label>
                <span style={{color: "red"}}>{errors["technology"]}</span>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">Time Line:</Label>
                <Input type="text" name="hours" onChange = {event => props.handleChange(event,"hours")}
                       value = {hours || ''} placeholder="add Hours" />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label className="mr-sm-2"></Label>
                <span style={{color: "red"}}>{errors["hours"]}</span>
            </FormGroup>
            <Button color="primary" onClick={props.addTechnology}>Add Technology</Button>
        </Form>
    )
}

export default AddTechnology;