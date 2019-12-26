import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Alert} from 'reactstrap';

const AddTopic = (props) => {
    // const {
    //     className
    // } = props;

    const mapTechnologies = () => {
        let technologies = props.technologies;
        if(technologies){
            return technologies.map(technology => {
                    if(technology.technology === props.techno_name){
                        return <option value={technology._id} key={technology._id}>{technology.technology}</option>
                    }
                    else return <option value={technology._id} key={technology._id} disabled>{technology.technology}</option>;
            });
        }
        return false;
    }

    const {addTopicModal,topic,errors} = props.state

    return (
        <div>
            <Modal isOpen={addTopicModal} toggle={props.toggle} className={props.classname}>
                {props.topicError !== "" ? (<Alert color="danger">{props.topicError}</Alert>) : null}
                <ModalHeader toggle={props.toggle}>Add Topic</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Input onChange = {event => props.handleChange(event,"technology")} type="select" name="technology" id="technology">
                            <option value={"0"}>Select Technology</option>
                                {mapTechnologies()}
                            </Input>
                            <span style={{color: "red"}}>{errors["technology"]}</span>
                        </FormGroup>
                        <FormGroup>
                            <Input onChange = {event => props.handleChange(event,"topic")} type="text" name="topic" id="topic" placeholder="Topic" value = {topic || ''}/>
                            <span style={{color: "red"}}>{errors["topic"]}</span>
                        </FormGroup>
                        <Button color="btn-primary" onClick={props.AddTopicSbmt}>Add Topic</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default AddTopic;