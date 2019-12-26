import React,{Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import Header from '../../header/header';
import TechnoDocument from '../documentation/technologyDocument';
import TechnoHoursModal from '../../../container/Modals/technologyHours';
import {requestForGetAllTopic} from '../../../action/topic';
import {requestForFetchDocumentResp,requestForClearDocument} from '../../../action/documentation';
import {logOutUser,requestForAddTechnoHour} from '../../../action/beginnerCredentials';
import {requestForMarkTrainyDocument} from '../../../action/documentation';
import {Breadcrumb, Button, Spinner} from "reactstrap";

class TrainyTechnologyDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            allTopicData : [],
            technologyHoursModal : false,
            technoHours : '',
            onHourSubmit : false,
            errors : {}
        }
    }

    technoHoursToggle = () => {
        let {technologyHoursModal} = this.state
        this.setState({technoHours : '', technologyHoursModal : !technologyHoursModal , onHourSubmit : false})
    }

    logOut = (userName) => {
        const {name} = this.props.beginnerCredential.credentials;
        if(name === userName){
            localStorage.removeItem("beginnerCredential");
            this.props.logOutUser();
            this.props.history.push({pathname:'/'});
        }
    }

    markAsRead = (e,filterData) => {
        let trainy_id , removeTechnoHour;
        trainy_id = removeTechnoHour = '';
        let markAsRead = e.target.checked;
        const {credentials} = this.props.beginnerCredential;
        if(!markAsRead) {
            const {technologyName} = this.props.location.state;
            if (credentials.technoHours && credentials.technoHours.hasOwnProperty(technologyName))
                removeTechnoHour = technologyName
        }
        if(credentials && Object.keys(credentials).length > 0) trainy_id = credentials._id
        filterData = {...filterData,markAsRead}
        this.props.requestForMarkTrainyDocument({filterData,trainy_id,removeTechnoHour})
    }

    backButtonFunction = () => {
        this.props.requestForClearDocument();
        this.props.history.push({pathname:`/trainy/home`})
    }

    mappedTopic = (technology_id) => {
        const {allTopicData} = this.state;
        const {topic} = this.props;
        if(topic && ('allTopic' in topic)){
            const {allTopic} = topic;
            let filteredTopic = allTopic.filter(topic => topic.technology === technology_id)
            if(allTopicData) this.setState({allTopicData : filteredTopic})
        }
        return true
    }

    componentDidMount() {
        let trainyId = '';
        const {credentials} = this.props.beginnerCredential;
        if(credentials && Object.keys(credentials)){
            trainyId = credentials._id
        }
        const {technology_id} = this.props.location.state;
        this.props.requestForGetAllTopic();
        this.props.requestForFetchDocumentResp({technology_id,trainyId});
    }

    TechnoHoursHandleChange = (event,stateName) => {
        let value = event.target.value;
        this.setState({[stateName]:value})
    }

    timeLineValidation = (hours) => {
        let noErr = true
        const error = {}
        if(hours) {
            let validHours = hours.match(/^(?!0.)\d+$/);
            if(!validHours){
                error['technoHours'] = "Enter valid hours"
                noErr = false
            }
            else if(hours.charAt(0) === "0" || validHours.length < 2 || validHours.length > 3){
                if(hours.charAt(0) === "0") error['technoHours'] = "Digit should't be start from \"0\""
                if(hours.length < 2 || hours.length > 3) error['technoHours'] = "Enter minimum 2 and maximum 3 digit"
                noErr = false
            }
        }
        else{
            error['technoHours'] = "Add Hours"
            noErr = false
        }
        if(Object.keys(error).length > 0) this.setState({errors : error})
        else {
            this.setState({errors: {}})
            noErr = true
        }
        return noErr
    }

    onHoursSubmit = () => {
        const {technologyName} = this.props.location.state;
        const {technoHours,onHourSubmit} = this.state
        const {beginnerCredential,requestForAddTechnoHour} = this.props
        const {_id} = beginnerCredential.credentials
        if(this.timeLineValidation(technoHours)){
            if(!onHourSubmit) this.setState({onHourSubmit : true})
            requestForAddTechnoHour({_id,technologyName,technoHours})
        }
    }

    TrainyTechnoCompleteInfo = () => {
        const {technologyName} = this.props.location.state;
        const {documentation,beginnerCredential} = this.props;
        const {technologyDocument} = documentation
        const {credentials} = beginnerCredential
        const {technoHours} = credentials
        let totalMarkedTechno,TotalDocumentation
        totalMarkedTechno = 0
        TotalDocumentation = technologyDocument.length
        technologyDocument.map((document,index) =>
            document.markAsRead ? totalMarkedTechno += 1 : null
        )
        console.log("type of totalDocumentation: "+(typeof TotalDocumentation)+" : "+(typeof totalMarkedTechno))
        debugger
        if((!technoHours || (technoHours && !technoHours.hasOwnProperty(technologyName)))
            && (TotalDocumentation > 0 && TotalDocumentation === totalMarkedTechno)){
                debugger
                this.technoHoursToggle()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {technology_id} = this.props.location.state;
        if(this.props !== prevProps){
            this.mappedTopic(technology_id)
            this.TrainyTechnoCompleteInfo()
            this.checkBeginnerUpdateTechnoHour()
        }
    }

    checkBeginnerUpdateTechnoHour = () => {
        const {onHourSubmit} = this.state
        const {technologyName} = this.props.location.state;
        const {credentials} = this.props.beginnerCredential
        if(credentials.technoHours && credentials.technoHours.hasOwnProperty(technologyName) &&
            onHourSubmit){
            debugger
            this.technoHoursToggle()
        }
    }

    render() {
        let userName = ''
        let spinnerActive = true
        const {allTopicData,technologyHoursModal,technoHours,errors} = this.state;
        const {documentation} = this.props;
        const {technologyDocument,success_msg} = documentation;
        const {technologyName,technology_id} = this.props.location.state;
        let TrainyRegistered = false;
        const {credentials} =  this.props.beginnerCredential;
        if(credentials && Object.keys(credentials).length > 0){
            TrainyRegistered = true
            userName = credentials.name
        }
        if(technologyDocument.length > 0 || success_msg.message === "requested document fetch successfully")
            spinnerActive = false
        return (
            <div>
                <Header registered = {TrainyRegistered} logOut = {this.logOut} userName={userName}/>
                <Breadcrumb tag="nav" listTag="div">
                    <Button color="link" onClick={this.backButtonFunction}>Back</Button>
                </Breadcrumb>
                <h4 className="commonText">{technologyName}</h4>
                {spinnerActive ? (
                    <div className="commonText"><Spinner color="primary" /></div>
                ) : null}
                <TechnoDocument technologyCredential = {{technology_id,technologyName}} allTopic = {allTopicData}
                        documentation = {documentation} markAsRead = {this.markAsRead} />
                        <TechnoHoursModal toggle={this.technoHoursToggle}
                                          TechnoHoursHandleChange = {this.TechnoHoursHandleChange}
                                          onHoursSubmit = {this.onHoursSubmit}
                                          className={this.props.className}
                                          state = {{technologyHoursModal,technoHours,errors}}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {beginnerCredential,topic,documentation} = state;
    return {
        beginnerCredential : beginnerCredential,
        topic : topic,
        documentation : documentation
    }
}

const mapDispatchToProps = (dispatch) => ({
    requestForGetAllTopic : bindActionCreators ( requestForGetAllTopic , dispatch),
    requestForFetchDocumentResp : bindActionCreators ( requestForFetchDocumentResp , dispatch),
    logOutUser : bindActionCreators( logOutUser , dispatch),
    requestForMarkTrainyDocument : bindActionCreators( requestForMarkTrainyDocument , dispatch),
    requestForClearDocument : bindActionCreators( requestForClearDocument , dispatch),
    requestForAddTechnoHour : bindActionCreators( requestForAddTechnoHour , dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(TrainyTechnologyDetail);
