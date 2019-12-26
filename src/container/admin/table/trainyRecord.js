import React,{Component} from "react"
import {connect} from 'react-redux';
import {Breadcrumb, Button, Table} from 'reactstrap';
import {bindActionCreators} from 'redux';
import './trainyRecord.css'
import {requestForFetchTechnology} from "../../../action/technology";
import Header from "../header/header";
import {logoutAdmin} from "../../../action/adminCredentials";


class TrainyRecord extends Component{

    logOut = (userName) => {
        const {name} = this.props.adminCredential.credentials;
        if(name === userName){
            localStorage.removeItem("adminCredential");
            this.props.logoutAdmin();
            this.props.history.push({pathname:'/admin'});
        }
    }

    backButtonFunction = () => {
        this.props.history.push({pathname:`/admin/home`,state:{activeTab : '2'}})
    }

    technoStatusMapped = (technology) => {
        const {status,technoHours} = this.props.location.state.trainyInfo
        debugger
        console.log(status);
        const {complete, running, pending} = status
        debugger
        switch (true) {
            case complete.includes(technology):
                return `complete in ${technoHours[technology]} hours`
            case running.includes(technology):
                return "running"
            case pending.includes(technology):
                return "pending"
        }

    }

    mapTrainyRecord = () => {
        const {name,emailId,indTime} = this.props.location.state.trainyInfo
        return (
                <form id="form">
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="fname">Name :</label>
                        </div>
                        <div className="col-15">
                            <label id="name" name="name">{name}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="emailId">Email-Id :</label>
                        </div>
                        <div className="col-15">
                            <label id="email" name="email">{emailId}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="regTime">Registered Time :</label>
                        </div>
                        <div className="col-15">
                            <label id="regTime" name="regTime">{indTime}</label>
                        </div>
                    </div>
                </form>
        )
    }

    mapTrainyTechoInfo = () => {
        const {technologies} = this.props.technology
        return(
            <Table bordered>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Technology</th>
                    <th>Given Time</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {technologies.map((singleTechnology,index) => {
                    debugger
                    let {technology,hours} = singleTechnology
                    return (
                        <tr key={`record ${index}`}>
                            <th scope="row" key={`techno ${index}`}>{index+1}</th>
                            <td>{technology}</td>
                            <td>{hours}</td>
                            <td>{this.technoStatusMapped(technology)}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            )
    }

    componentDidMount() {
        this.props.requestForFetchTechnology()
    }

    render() {
        let AdminRegistered = false
        let userName = ''
        const {name} = this.props.location.state.trainyInfo
        if(this.props.adminCredential.credentials && Object.keys(this.props.adminCredential.credentials).length !== 0){
            userName = this.props.adminCredential.credentials.name;
            AdminRegistered = true;
        }

        return (
            <div className="commonText">
                <Header AdminRegistered = {AdminRegistered} userName = {userName} logOut = {this.logOut}/>
                <Breadcrumb tag="nav" listTag="div">
                    <Button color="link" onClick={this.backButtonFunction}>Back</Button>
                </Breadcrumb>
                <h4>{name}</h4>
                <div className="mapTrainyRecord">
                {this.mapTrainyRecord()}
                </div>
                <div className="mapTrainyTechnoInfo">
                {this.mapTrainyTechoInfo()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { technology, adminCredential } = state;
    return {
        adminCredential : adminCredential,
        technology : technology
    }
};

const mapDispatchToProps = dispatch => ({
    requestForFetchTechnology : bindActionCreators( requestForFetchTechnology , dispatch),
    logoutAdmin : bindActionCreators( logoutAdmin , dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(TrainyRecord)