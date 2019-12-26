import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form , Row, FormGroup, Input , Label , Col} from 'reactstrap';
import ReactPlayer from 'react-player';

const AddDocumentation = (props) => {
    // const {
    //     className
    // } = props;

    let {techno_id} = props
    const {addDocumentationModal,TechnologyTopic,errors,previewVideo,topic,documentId,selectedLink} = props.state;
    if(!documentId) techno_id = '';

    const mapTopics = () => {
        let Topics = TechnologyTopic;
        if(Topics.length > 0){
            return Topics.map(topicObject => {
                if(topic === topicObject.topic) return (<option value={topicObject._id} key={topicObject._id}>{topicObject.topic}</option>)
                return (
                    <option value={topicObject._id} key={topicObject._id}>{topicObject.topic}</option>
                );
            });
        }
        return false;
    }

    const mapTechnologies = () => {
        let technologies = props.technologies;
        if(technologies){
            return technologies.map(technologyObject => {
                if(props.techno_id === technologyObject._id) return <option value={technologyObject._id} key={technologyObject._id}>{technologyObject.technology}</option>;
                else return <option value={technologyObject._id} key={technologyObject._id} disabled>{technologyObject.technology}</option>;
            });
        }
        return false;
    }

    return (
        <div>
            <Modal isOpen={addDocumentationModal} toggle={props.toggle} className={props.classname}>
                <ModalHeader toggle={props.toggle}>{!documentId ? "Add Document" : "Edit Document"}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Input onChange = {event => {props.handleChange(event,"technology"); props.onTechnologyTopic();}} type="select" name="technology" id="technology"
                            defaultValue={techno_id}>
                                <option value={0}>Select Technology</option>
                                {mapTechnologies()}
                            </Input>
                            <span style={{color: "red"}}>{errors["technology"]}</span>
                        </FormGroup>
                        <FormGroup>
                            <Input onChange = {event => props.handleChange(event,"topic")} type="select" name="topic" id="topic" defaultValue={topic}>
                                <option value={0}>Select Topic</option>
                                {mapTopics()}
                            </Input>
                            <span style={{color: "red"}}>{errors["topic"]}</span>
                        </FormGroup>
                        <Row form>
                        <Col md={6}>
                        <FormGroup>
                            <Label for="File">File</Label>
                            <Input type="file" name="file" id="exampleFile" onChange = {event => props.handleChange(event,"selectedDocument")} />
                            <span style={{color: "red"}}>{errors["selectedDocument"]}</span>
                        </FormGroup>
                        </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="Link">Add Link</Label>
                                    <Input onChange = {event => props.handleChange(event,"selectedLink")} type="textarea" name="documentLink" id="link"
                                        value = {selectedLink || ''}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <ReactPlayer url={previewVideo} height="70%" width="100%" playing/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button color="btn-primary" onClick={props.AddDocumentationSbmt}>{!documentId ? "Add Documentation" : "Edit Documentation"}</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default AddDocumentation;