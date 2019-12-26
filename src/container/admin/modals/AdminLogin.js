import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, NavLink, Alert} from 'reactstrap';

const AdminLoginModal = (props) => {
    // const {
    //     className
    // } = props;

    const {AdminloginModal,emailId,pswd,errors} = props.state

    return (
        <div>
            <Modal isOpen={AdminloginModal} toggle={props.toggle} className={props.classname}>
                {props.AdminRegisterError === 'Invalid credentials..' ? (<Alert color="danger">{props.AdminRegisterError}</Alert>) : null}
                <ModalHeader toggle={props.toggle}>Admin Sign In</ModalHeader>
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

export default AdminLoginModal;