import React,{Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Header from '../header/header';
import Technology from '../trainy/technology/technology';
import {requestForFetchTechnology} from '../../action/technology';
import {logOutUser} from '../../action/beginnerCredentials';

class MainHome extends Component{

    logOut = (userName) => {
        const {name} = this.props.beginnerCredential.credentials;
        if(name === userName){
            localStorage.removeItem("beginnerCredential");
            this.props.logOutUser();
            this.props.history.push({pathname:'/'});
        }
    }

    clickOnTechnology = (technologyObject) => {
        const {_id,technology} = technologyObject;
        this.props.history.push({pathname:`/trainy/technology/${_id}`,state:{technology_id:_id,technologyName:technology}})
    }

    componentDidMount() {
        this.props.requestForFetchTechnology();
    }

    render() {
        let userName = '';
        let registeredData = false;
        const {beginnerCredential} = this.props;
        if(beginnerCredential && beginnerCredential.hasOwnProperty('credentials')){
            userName = beginnerCredential.credentials.name;
            registeredData = true;
        }
        const {technologies} = this.props.technology;
        return(
            <div>
                <Header registered = {registeredData} logOut = {this.logOut} userName = {userName}/>
                <Technology technologies = {technologies} clickOnTechnology = {this.clickOnTechnology}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { technology,beginnerCredential } = state;
    return {
        technology : technology,
        beginnerCredential : beginnerCredential
    }
}

const mapDispatchToProps = dispatch => ({
    requestForFetchTechnology : bindActionCreators( requestForFetchTechnology , dispatch ),
    logOutUser : bindActionCreators( logOutUser , dispatch )
});

export default connect(mapStateToProps,mapDispatchToProps)(MainHome);