import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Input, Row, Col, Label} from 'reactstrap';

const TechnoHoursModal = (props) => {
    const {technologyHoursModal,technoHours,errors} = props.state
    const {toggle,className,onHoursSubmit} = props

    return (
        <div>
            <Modal isOpen={technologyHoursModal} className={className}>
                <ModalBody>
                    <Form>
                        <Row form>
                            <Col md={5}>
                                <FormGroup>
                                    <Label for="Hours">Add Technology Hours : </Label>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Input onChange = {event => props.TechnoHoursHandleChange(event,"technoHours")}
                                        type="text" name="technoHours" id="technoHours"
                                        placeholder="Hours"
                                        value = {technoHours || ''}/>
                                    <span style={{color: "red"}}>{errors["technoHours"]}</span>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onHoursSubmit}>Submit</Button>
                    <Button color="primary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default TechnoHoursModal;