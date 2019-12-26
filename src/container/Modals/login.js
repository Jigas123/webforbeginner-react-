import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, NavLink, Alert} from 'reactstrap';

const LoginModal = (props) => {

    const {loginModal,emailId,pswd,errors} = props.state

    return (
        <div>
            <Modal isOpen={loginModal} toggle={props.toggle} className={props.classname}>
            {props.registerError ==='Invalid credentials..' ? (<Alert color="danger">{props.registerError}</Alert>) : null}
                <ModalHeader toggle={props.toggle}>Sign In</ModalHeader>
                <ModalBody>
                                    <Form>
                                        <FormGroup>
                                            <Input onChange = {event => props.handleChange(event,"emailId")} type="email" name="email" id="email" placeholder="Email" value = {emailId || ''}/>
                                            <span style={{color: "red"}}>{errors["emailId"]}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <Input onChange = {event => props.handleChange(event,"pswd")} type="password" name="password" id="Password" placeholder="Password" value = {pswd || ''}/>
                                            <span style={{color: "red"}}>{errors["pswd"]}</span>
                                        </FormGroup>
                                        <Button color="btn-primary" onClick={props.SignIn}>Sign In</Button>
                                    </Form>
                                </ModalBody>
                <ModalFooter>
                    If you have't account?
                    <NavLink onClick={props.alreadyLogin}>Sign Up</NavLink>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default LoginModal;