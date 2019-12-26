import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import AddTechnology from '../forms/addTechnology';
import AllTechnology from '../table/allTechnology';
import Students from '../table/students';
import TrainyTechnoInfo from '../forms/trainyTechnoInfo';
import {requestForAddTechnology,requestForFetchTechnology,requestForDeleteTechnology} from '../../../action/technology';
import {requestForTrainyData,requestForTechnoBasedTrainy} from '../../../action/trainyDocumentation';

class TabOption extends Component {
    constructor(props){
        super(props)
            this.state = {
                activeTab : '1',
                technology : '',
                hours : '',
                selectedTechnology : '',
                technoStatus : '',
                errors : {},
                checkValidation : ["selectedTechnology","technoStatus"]
            }
    }

    toggle = tab => {
        if(this.state.activeTab !== tab) this.setState({activeTab : tab})
    }

    addTechnology = () => {
        const {technology,hours} = this.state;
        let technologyObject = {technology,hours}
        if(this.technologyValidation(technology) && this.timeLineValidation(hours)){
            debugger
            this.props.requestForAddTechnology(technologyObject)
            this.setState({technology: '',hours: '',errors: {}})
        }
    }

    deleteTechnology = (DeleteId) => {
        this.props.requestForDeleteTechnology(DeleteId);
    }

    technologyClickHandle = (technology_id,technology_name) => {
        this.props.history.push({
            pathname: `/admin/technology/${technology_id}`,
            state: {technology_id : technology_id,techno_name : technology_name}
        })
    }

    handleChange = (e,stateName) => {
        let value = e.target.value;
        this.setState({[stateName] : value})
    }

    technologyValidation = (value) => {
        const error = {};
        if(value){
            let technologyValid = value.match(/^[A-Za-z ]+$/);
            if(!technologyValid) error['technology'] = 'Enter valid Technology'
            if(value.length < 3) error['technology'] = 'Enter atleast 3 character'
        }
        else error['technology'] = 'Enter your Technology'
        if(error.hasOwnProperty('technology')){
            this.setState({'errors' : {...this.state.errors,...error}})
            return false
        }
        else this.setState({'errors' : {...this.state.errors,technology:''}})
        return true
    }

    timeLineValidation = (hours) => {
        let noErr = true
        const error = {}
        if(hours) {
            let validHours = hours.match(/^(?!0.)\d+$/);
            if(!validHours){
                error['hours'] = "Enter valid hours"
                noErr = false
            }
            else if(hours.charAt(0) === "0" || validHours.length < 2 || validHours.length > 3){
                if(hours.charAt(0) === "0") error['hours'] = "Digit should't be start from \"0\""
                if(hours.length < 2 || hours.length > 3) error['hours'] = "Enter minimum 2 and maximum 3 digit"
                noErr = false
            }
        }
        else{
            error['hours'] = "Add Hours"
            noErr = false
        }
        if(Object.keys(error).length > 0) this.setState({errors : error})
        else {
            this.setState({errors: {}})
            noErr = true
        }
        return noErr
    }

    handleTechnoChange = (event,stateName) => {
        let value = event.target.value;
        if(value !== 0)  this.setState({[stateName] : value})
    }

    validationForTechnoStatus = () => {
        const {checkValidation} = this.state;
        let noErr = true;
        let errors = {}
        const stateValue = this.state;
        checkValidation.forEach((checkValue) => {
            if(stateValue[checkValue] === '' || stateValue[checkValue] === undefined){
                if(checkValue === 'selectedTechnology') errors[checkValue] = `Select Technology`
                else if(checkValue === 'technoStatus') errors[checkValue] = `Select Status`
                noErr = false
            }
            else errors[checkValue] = ''
        })
        this.setState({errors})
        return noErr
    }

    onTechnoStatusClick = () => {
        if(this.validationForTechnoStatus()) {
            const {selectedTechnology,technoStatus} = this.state
            this.props.requestForTechnoBasedTrainy({selectedTechnology,technoStatus})
        }
    }

    onTechnoStatusClear = () => {
        let clearFlag = false
        const {checkValidation,errors} = this.state
        const stateValue = this.state;
        if(Object.keys(errors).length > 0) this.setState({errors : {}})
        checkValidation.forEach((checkValue) => {
            if(stateValue[checkValue] !== '' && stateValue[checkValue] !== undefined){
                this.setState({[checkValue] : ''})
                clearFlag = true
            }
        })
        if(clearFlag) this.props.requestForTrainyData()
    }

    componentDidMount() {
        this.props.requestForFetchTechnology();
        this.props.requestForTrainyData();
        if(this.props.activeTab && this.state.activeTab !== '2') this.setState({activeTab : this.props.activeTab})
    }

    render() {
        const {technologies} = this.props.technology
        debugger
        const {trainyDocumentation} = this.props.trainyDocumentationInfo
        const {activeTab,technology,hours,errors,selectedTechnology,technoStatus} = this.state;
        return (
            <div>
                <Nav tabs className="w-100">
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Technology
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Trainy Detail
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab} className="pt-3">
                    <TabPane tabId="1">
                        <Row className="pd-3">
                            <Col sm="12">
                                <h4 className="commonText">Technology</h4>
                            </Col>
                        </Row>
                        <div>
                            <AddTechnology addTechnology = {this.addTechnology} handleChange = {this.handleChange}
                            stateData = {{technology,hours,errors}}/>
                            <AllTechnology technologies = {this.props.technology.technologies || []} deleteTechnology = {this.deleteTechnology}
                                           technologyClickHandle = {this.technologyClickHandle}/>
                        </div>
                    </TabPane>
                    <TabPane tabId="2">
                        <div>
                            <TrainyTechnoInfo technologies={technologies} stateValues={{selectedTechnology,technoStatus,errors}}
                                              handleTechnoChange = {this.handleTechnoChange}
                                              onTechnoStatusClick = {this.onTechnoStatusClick}
                                              onTechnoStatusClear = {this.onTechnoStatusClear}/>
                            <Row className="pd-3">
                                <Col sm="12">
                                    <h4 className="commonText">All Trainy</h4>
                                </Col>
                            </Row>
                            <Students trainyData = {trainyDocumentation}/>
                        </div>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { technology , trainyDocumentationInfo} = state;
    return {
        technology : technology,
        trainyDocumentationInfo : trainyDocumentationInfo
    }
};

const mapDispatchToProps = dispatch => ({
    requestForAddTechnology : bindActionCreators( requestForAddTechnology ,dispatch),
    requestForFetchTechnology : bindActionCreators( requestForFetchTechnology , dispatch),
    requestForDeleteTechnology : bindActionCreators( requestForDeleteTechnology , dispatch),
    requestForTrainyData : bindActionCreators( requestForTrainyData , dispatch),
    requestForTechnoBasedTrainy : bindActionCreators( requestForTechnoBasedTrainy , dispatch)
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TabOption));
