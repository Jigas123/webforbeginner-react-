import React,{Component} from 'react'
import {connect} from "react-redux";
import {Route,Redirect} from 'react-router-dom';

class CustomRoute extends Component{
    getExtractedJson({component,cprivate,crole,beginnerCredential,adminCredential,...rest}){
        return rest
    }
    render() {
        let Trainyrole = '';
        let Adminrole = '';
        let trainyLoggedIn = false;
        let adminLoggedIn = false;
        if(this.props.beginnerCredential.credentials && Object.keys(this.props.beginnerCredential.credentials).length > 0){
            trainyLoggedIn = true
            Trainyrole = "0"
        }
        if(this.props.adminCredential.credentials && Object.keys(this.props.adminCredential.credentials).length > 0){
            adminLoggedIn = true
            Adminrole = "1"
        }
        const rest = this.getExtractedJson(this.props)
        const {component,cprivate,crole} = this.props;
        const Component = component;
        let redirectTo = undefined;

        if(!trainyLoggedIn && !adminLoggedIn && cprivate){
            redirectTo = '/';
        }
        else if(trainyLoggedIn && cprivate && crole && crole.filter((chkrole) => chkrole === Trainyrole).length === 0){
            redirectTo = '/';
        }
        else if(adminLoggedIn && cprivate && crole && crole.filter((chkrole) => chkrole === Adminrole).length === 0){
            redirectTo = '/admin';
        }
        return(
            <Route {...rest} render={props => ((redirectTo)? <Redirect to={{pathname:redirectTo, state:{from:props.location}}}/>
                    : <Component {...props}/>
        )}
            />
    );
    }
}

const mapStateToProps = state => {
    const {beginnerCredential,adminCredential} = state;
    return {
        beginnerCredential : beginnerCredential,
        adminCredential : adminCredential
    }
}

export default connect(mapStateToProps,null)(CustomRoute);