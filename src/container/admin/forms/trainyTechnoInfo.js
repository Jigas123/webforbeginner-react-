import React from 'react';
import { Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';

const TrainyTechnoInfo = (props) => {

    const {selectedTechnology,technoStatus,errors} = props.stateValues
    debugger
    const mapTechnologies = () => {
        const technologies = props.technologies
        return (
            technologies?(
                technologies.map((singleTechnology, index) => {
                    const {_id,technology} = singleTechnology
                    return (
                        <option value={_id} key={`option${index}`}>{technology}</option>
                    )
                })
            ) : null
        )
    }

    return (
        <div>
        <Form inline={true} className="pb-5 pl-5">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleSelect" className="mr-sm-2">Technology : </Label>
                <Input type="select"
                       name="select"
                       id="exampleSelect"
                       value = {selectedTechnology || ''}
                       onChange = {event => props.handleTechnoChange(event,"selectedTechnology")} inline={"true"}>
                    <option value="">Select Technology</option>
                    {mapTechnologies()}
                </Input>
                <span style={{color: "red"}}>{errors["selectedTechnology"]}</span>
            </FormGroup>
            <FormGroup check inline={true}>
                <Label check>
                    <CustomInput type="radio" value="complete"
                                 name="status" label="Complete"
                                 inline={true} id="complete"
                                 checked={technoStatus === "complete"}
                                 onChange={event => props.handleTechnoChange(event,"technoStatus")}/>
                    <CustomInput type="radio" value="running"
                                 name="status" label="Running"
                                 inline={true} id="running"
                                 checked={technoStatus === "running"}
                                 onChange={event => props.handleTechnoChange(event,"technoStatus")}/>
                    <CustomInput type="radio" value="pending"
                                 name="status" label="Pending"
                                 inline={true} id="pending"
                                 checked={technoStatus === "pending"}
                                 onChange={event => props.handleTechnoChange(event,"technoStatus")}/>
                </Label>
                <span style={{color: "red"}}>{errors["technoStatus"]}</span>
            </FormGroup>
            <Button color="primary" onClick={props.onTechnoStatusClick}>Submit</Button>&nbsp;
            <Button color="primary" onClick={props.onTechnoStatusClear}>Clear</Button>
        </Form>
        </div>
    )
}

export default TrainyTechnoInfo;