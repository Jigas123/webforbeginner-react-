import React,{Component} from 'react';
import {Button,Breadcrumb} from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Header from '../header/header';
import AddTopic from '../modals/addTopic';
import AddDocumentation from '../modals/addDocumentation';
import {requestForFetchTechnology} from '../../../action/technology';
import {logoutAdmin} from '../../../action/adminCredentials';
import {requestForAddTopic,clearTopicError,requestForGetAllTopic,requestForDeleteTopic} from '../../../action/topic';
import {requestForAddDocumentation,requestForFetchDocumentResp,requestFoeEditDocumentation,
        requestForDeleteDocument,requestForClearDocument} from '../../../action/documentation';
import TechnologyDetailTab from '../tabOption/technologyDetailTabOption';

class TechnologyDetail extends Component{

    constructor(props){
        super(props);
        this.state = {
            documentId : '',
            activeTab : '1',
            addTopicModal : false,
            addDocumentationModal : false,
            topic : '',
            technology : '',
            selectedDocument : '',
            selectedLink : '',
            TechnologyTopic : [],
            addTopicProcess : false,
            addDocumentationProcess : false,
            previewVideo : '',
            errors : {},
            check:['technology','topic'],
            checkDocument:['selectedDocument','selectedLink']
        }
    }

    logOut = (userName) => {
        const {name} = this.props.adminCredential.credentials;
        if(name === userName){
            localStorage.removeItem("adminCredential");
            this.props.logoutAdmin();
            this.props.history.push({pathname:'/admin'});
        }
    }

    toggle = tab => {
        if(this.state.activeTab !== tab) this.setState({activeTab : tab})
    }

    backButtonFunction = () => {
        this.props.requestForClearDocument();
        this.props.history.push({pathname:`/admin/home`})
    }

    checkAddTopicResponse = () => {
        if(this.props.topic.success_msg && Object.keys(this.props.topic.success_msg).length > 0
            && this.state.addTopicProcess === true){
            return true
        }
        else{
            return false;
        }
    }

    addDocumentationResponse = () => {
        if(this.props.documentation.success_msg && Object.keys(this.props.documentation.success_msg).length > 0
            && this.state.addDocumentationProcess === true){
                return true;
        }
        else {
            return false;
        }
    }

    checkTopicErrorData = async () => {
        if(this.props.topic.error_msg && Object.keys(this.props.topic.error_msg).length > 0)
            this.props.clearTopicError();
    }

    onTechnologyTopic = () => {
        const {technology_id} = this.props.location.state;
        const {TechnologyTopic} = this.state;
        if(technology_id !== 0 && technology_id !== ""){
            const Topics = this.props.topic.allTopic;
            if(Topics){
                const TechnologyTopicFiltered = Topics.filter(topic => topic.technology === technology_id)
                if(TechnologyTopic.length === 0 || TechnologyTopic.length !== TechnologyTopicFiltered.length){
                    this.setState({TechnologyTopic : TechnologyTopicFiltered});
                }
            }
        }
        return true;
    }

    openTopicForm = () => {
        this.clearState();
        this.addTechnologyToggle();
    }

    openDocumentationForm = () => {
        this.clearState();
        this.addDocumentationToggle();
    }

    clearState = () => {
        this.setState({topic : '',technology : '', selectedDocument : '' ,errors : {} ,previewVideo : '' ,documentId : '' ,selectedLink : ''})
    }

    getTopicId = (chkTopic) => {
        const Topics = this.props.topic.allTopic;
        const TechnologyTopic = Topics.find(topic => topic.topic === chkTopic)
        return TechnologyTopic;
    }

    setEditData = (documentation) => {
        const {topic,selectedDocument,_id} = documentation;
        let {tutorialLink,documentLink} = selectedDocument
        debugger
        let topicObject = this.getTopicId(topic);
        this.setState({documentId : _id ,topic : topicObject._id,technology : topicObject.technology, previewVideo : tutorialLink , selectedLink : documentLink })
    }

    addTechnologyToggle = () => {
            this.checkTopicErrorData()
            this.setState({addTopicModal: !this.state.addTopicModal,addTopicProcess: false})
    }

    addDocumentationToggle = () => {
        this.setState({addDocumentationModal: !this.state.addDocumentationModal,addDocumentationProcess: false})
    }

    handleChange = (event,stateName) => {
        if(stateName !== 'selectedDocument'){
            let value = event.target.value;
            this.setState({[stateName]:value})
        }
        else {
            let value = event.target.files[0];
            let valueUrl = window.URL.createObjectURL(value);
            this.setState({[stateName]:value,previewVideo : valueUrl})
        }
    }

    checkDocumentValidation = () => {
        const {errors, documentId,selectedDocument,selectedLink,previewVideo} = this.state;
        if(!documentId) {
            if ((selectedDocument === '' || selectedDocument === undefined) && (selectedLink === '' || selectedLink === undefined)) {
                errors["selectedDocument"] = "Select Documentation"
            } else errors["selectedDocument"] = ''
        }
        else if(previewVideo === '' && selectedLink === '') errors["selectedDocument"] = "Select Documentation"
        else errors["selectedDocument"] = ''
        return errors
    }

    allValidationForDocumentSbmt = () => {
        let {check, errors} = this.state;
        const stateValues = this.state;
        let noError = true;
        check.forEach((value) => {
            if (stateValues[value] === "0" || stateValues[value] === "" || stateValues[value] === undefined) {
                errors[value] = `Select ${value}`;
                noError = false;
            }
            else errors[value] = ''
        });
        let chkDocumentError = this.checkDocumentValidation()
        if('selectedDocument' in chkDocumentError && chkDocumentError['selectedDocument'] !== '') {
            errors = {...errors,...chkDocumentError}
            noError = false
        }
        this.setState({errors});
        return noError;
    }

    TechnologyValidation = () => {
        const {technology} = this.state;
        if(technology === '0' || technology === '' || technology === undefined){
            return `Select technology`;
        }
        return true
    }

    TopicValidation = () => {
        const {topic} = this.state;
        if(topic){
            let matchTopic = topic.match(/^([0-9a-zA-Z]+\s)*[0-9a-zA-Z]+$/);
            if(!matchTopic) return "Enter valid Topic";
            if(topic.length < 3) return "Enter atleast 5 character";
        }
        else if(topic === '' || topic === undefined) return "Enter your Topic";
        return true;
    }

    addTopicValidation = () => {
        let errorFlag = true;
        let error = {}
        const Techresp = this.TechnologyValidation();
        const Topicresp = this.TopicValidation();
        if(Techresp !== true){
            errorFlag = false;
            error["technology"] = Techresp;
        }
        if(Topicresp !== true){
            errorFlag = false;
            error["topic"] = Topicresp;
        }
        this.setState({errors : error})
        return errorFlag;
    }

    AddTopicSbmt = () => {
        const {topic,technology} = this.state;
        this.setState({addTopicProcess : true})
        let topicDataObject = {technology,topic}
        debugger
        if(this.addTopicValidation()) this.props.requestForAddTopic(topicDataObject);
    }

    AddDocumentationSbmt = () => {
        const {technology_id} = this.props.location.state;
        const {technology,topic,selectedDocument,selectedLink,documentId} = this.state;
        debugger
        this.setState({addDocumentationProcess : true})
        if(this.allValidationForDocumentSbmt()) {
            const data = new FormData();
            data.append('technology',technology);
            data.append('topic',topic);
            if(selectedDocument) data.append('selectedDocument',selectedDocument);
            if(selectedLink) data.append('selectedLink',selectedLink)
            if(documentId) this.props.requestFoeEditDocumentation({data,documentId})
            else this.props.requestForAddDocumentation({data,technology_id})
        }
    }

    editDocumentation = (documentation) => {
        this.setEditData(documentation);
        this.onTechnologyTopic();
        this.addDocumentationToggle();
    }

    deleteDocumentation = (document_id) => {
        const {technology_id} = this.props.location.state;
        this.props.requestForDeleteDocument({document_id,technology_id});
    }

    deleteTopic = (topic_id) => {
        const {technology_id} = this.props.location.state;
        this.props.requestForDeleteTopic({topic_id,technology_id});
    }

    componentDidMount() {
        const trainyId = null
        const {technology_id} = this.props.location.state;
        this.props.requestForFetchTechnology();
        this.props.requestForGetAllTopic();
        this.props.requestForFetchDocumentResp({technology_id,trainyId});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props !== prevProps){
            if(this.checkAddTopicResponse()) this.addTechnologyToggle()
            if(this.addDocumentationResponse()) this.addDocumentationToggle()
            this.onTechnologyTopic();
        }
    }

    render() {
        const {technology_id,techno_name} = this.props.location.state;
        const {addTopicModal,topic,errors,addDocumentationModal,TechnologyTopic,selectedDocument,previewVideo,technology,
            documentId,selectedLink} = this.state;
        let AdminRegistered = false;
        let topicError = '';
        let userName = '';
        if(this.props.topic.error_msg && Object.keys(this.props.topic.error_msg).length > 0)
            topicError = this.props.topic.error_msg.message;
        if(this.props.adminCredential.credentials && Object.keys(this.props.adminCredential.credentials).length !== 0){
            userName = this.props.adminCredential.credentials.name;
            AdminRegistered = true;
        }
        return(
            <div>
                <Header AdminRegistered = {AdminRegistered} userName = {userName} logOut = {this.logOut}/>
                <Breadcrumb tag="nav" listTag="div">
                    <Button color="link" onClick={this.backButtonFunction}>Back</Button>
                </Breadcrumb>
                <h4 className="pb-2 commonText">{techno_name}</h4>
                <div className="commonText">
                <Button outline color="primary" size="sm" onClick={this.openTopicForm}>Add Topic</Button>{' '}
                <Button outline color="primary" size="sm" onClick={this.openDocumentationForm}>Add Documentation</Button>
                </div>
                <AddTopic toggle={this.addTechnologyToggle} state={{addTopicModal,topic,errors}} classname={this.props.className}
                          handleChange={this.handleChange} AddTopicSbmt={this.AddTopicSbmt} technologies = {this.props.technology.technologies}
                          topicError={topicError} techno_name={techno_name}/>
                          <AddDocumentation toggle={this.addDocumentationToggle} state={{addDocumentationModal,TechnologyTopic,errors,selectedDocument,previewVideo,technology,topic,documentId,selectedLink}} classname={this.props.className}
                                            handleChange={this.handleChange} onTechnologyTopic={this.onTechnologyTopic} AddDocumentationSbmt={this.AddDocumentationSbmt}
                                            technologies = {this.props.technology.technologies} topics = {this.props.topic.allTopic} techno_id={technology_id}/>
                                            <TechnologyDetailTab documentation = {this.props.documentation} TechnologyTopic = {TechnologyTopic} editDocumentation = {this.editDocumentation} deleteDocumentation = {this.deleteDocumentation} deleteTopic = {this.deleteTopic}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { adminCredential,technology,topic,documentation } = state;
    return {
        adminCredential : adminCredential,
        technology : technology,
        topic : topic,
        documentation : documentation
    }
};

const mapDispatchToProps = dispatch => ({
    requestForFetchTechnology : bindActionCreators( requestForFetchTechnology , dispatch ),
    requestForAddTopic : bindActionCreators( requestForAddTopic , dispatch ),
    clearTopicError : bindActionCreators( clearTopicError , dispatch ),
    requestForGetAllTopic : bindActionCreators( requestForGetAllTopic , dispatch ),
    requestForAddDocumentation : bindActionCreators( requestForAddDocumentation , dispatch),
    requestForFetchDocumentResp : bindActionCreators( requestForFetchDocumentResp , dispatch),
    requestFoeEditDocumentation : bindActionCreators( requestFoeEditDocumentation , dispatch),
    requestForDeleteDocument : bindActionCreators( requestForDeleteDocument , dispatch),
    requestForDeleteTopic : bindActionCreators( requestForDeleteTopic , dispatch),
    logoutAdmin : bindActionCreators( logoutAdmin , dispatch),
    requestForClearDocument : bindActionCreators( requestForClearDocument , dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(TechnologyDetail);