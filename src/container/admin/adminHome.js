import React,{Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import Header from './header/header';
import TabOption from './tabOption/tabOption';
import {logoutAdmin} from '../../action/adminCredentials';

class AdminHome extends Component{

    logOut = (userName) => {
        const {name} = this.props.adminCredential.credentials;
        if(name === userName){
            localStorage.removeItem("adminCredential");
            this.props.logoutAdmin();
            this.props.history.push({pathname:'/admin'});
        }
    }

    render() {
        let activeTab = ''
        if(this.props.location.state && this.props.location.state.activeTab) {
            activeTab = this.props.location.state.activeTab
        }
        let AdminRegistered = false;
        let userName = '';
        if(this.props.adminCredential.credentials && Object.keys(this.props.adminCredential.credentials).length !== 0){
            userName = this.props.adminCredential.credentials.name;
            AdminRegistered = true;
        }
        return (
            <div>
                <Header AdminRegistered = {AdminRegistered} userName = {userName} logOut = {this.logOut}/>
                <h4 className="commonText">Home</h4>
                <TabOption activeTab = {activeTab}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { adminCredential } = state
    return {
        adminCredential : adminCredential
    }
}

const mapDispatchToProps = dispatch => ({
    logoutAdmin : bindActionCreators( logoutAdmin , dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(AdminHome);