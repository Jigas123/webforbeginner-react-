import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Header from './header/header';
import JumboTron from './mainjumbotron/jumboSlider';
import './admin.css';
import AdminRegisterModal from './modals/AdminRegister';
import AdminLoginModal from './modals/AdminLogin';
import {requestForAdminRegister,requestForAdminLogin,clearCredentialError,logoutAdmin} from '../../action/adminCredentials';

class AdminPenal extends Component{

    constructor(props){
        super(props);
        this.state = {
            AdminregisterModal : false,
            AdminloginModal : false,
            name : '',
            emailId : '',
            pswd : '',
            errors : {},
            errorFlag : false,
            AdminsignUp : false,
            AdminsignIn: false
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

    checkReducerCredentialForAdminRegisterLogin = () => {
        if(this.props.adminCredential.credentials && Object.keys(this.props.adminCredential.credentials).length !== 0 && this.state.AdminsignUp){
            return "signUp";
        }
        else if(this.props.adminCredential.credentials && Object.keys(this.props.adminCredential.credentials).length !== 0 && this.state.AdminsignIn){
            return "signIn";
        }
        return false
    }

    checkSignUpSignInErrorData = async () => {
        if(this.props.adminCredential.error_msg && Object.keys(this.props.adminCredential.error_msg).length !== 0){
            localStorage.removeItem("adminCredential")
            await this.props.clearCredentialError();
        }
    }

    clearState = () => {
        this.setState({
            name : '',
            emailId : '',
            pswd : '',
            errors : {},
            errorFlag : false
        })
    }

    registerToggle = () => {
        this.checkSignUpSignInErrorData();
        this.setState({AdminregisterModal: !this.state.AdminregisterModal,AdminsignUp:false})
    }

    loginToggle = () => {
        this.checkSignUpSignInErrorData();
        this.setState({AdminloginModal: !this.state.AdminloginModal,AdminsignIn:false})
    }

    alreadyRegisterOrLogin = () => {
        this.clearState();
        this.registerToggle();
        this.loginToggle();
    }

    registerClick = () => {
        this.clearState();
        this.registerToggle();
    }

    loginClick = () => {
        this.clearState();
        this.loginToggle();
    }

    nameValidation = (value) => {
        const error = {};
        if(value){
            let nameValid = value.match(/^[A-Za-z]+$/);
            if(!nameValid) error['name'] = 'Enter valid name'
            if(value.length < 3) error['name'] = 'Enter atleast 3 character'
        }
        else error['name'] = 'Enter your name'
        if(error.hasOwnProperty('name')){
            this.setState({'errors': {...this.state.errors,...error}})
            return false
        }
        else this.setState({'errors' : {...this.state.errors,name:''}})
        return true
    }

    emailValidation = (value) => {
        const error = {};
        if(value){
            let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            if(!emailValid) error['emailId'] = 'Enter valid emailId'
        }
        else error['emailId'] = 'Enter your emailId'
        if(error.hasOwnProperty('emailId')){
            this.setState({'errors': {...this.state.errors,...error}})
            return false
        }
        else this.setState({'errors' : {...this.state.errors,emailId:''}})
        return true
    }

    pswdValidation = (value) => {
        const error = {};
        if(value){
            let pswdValid = value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
            if(!pswdValid) error['pswd'] = 'enter atleaset 1 letter & 1 number with length 8'
        }
        else error['pswd'] = 'Enter your password'
        if(error.hasOwnProperty('pswd')){
            this.setState({'errors': {...this.state.errors,...error}})
            return false;
        }
        else this.setState({'errors': {...this.state.errors,pswd:''}})
        return true
    }

    getAllValidation = (clickFrom) => {
        const {name,emailId,pswd} = this.state;
        if(clickFrom === 'signUp'){
            if(this.nameValidation(name) && this.emailValidation(emailId) && this.pswdValidation(pswd)) return true;
            return false
        }
        if(this.emailValidation(emailId) && this.pswdValidation(pswd)) return true
        return false;
    }

    SignUp = async () => {
        if(this.getAllValidation('signUp')){
            this.setState({'AdminsignUp':true})
            const {name,emailId,pswd} = this.state;
            let registerData = {
                name,
                emailId,
                pswd
            }
            this.props.requestForAdminRegister(registerData);
        }
    }

    SignIn = () => {
        if(this.getAllValidation('signIn')){
            this.setState({'AdminsignIn':true})
            const {emailId,pswd} = this.state;
            let loginData = {
                emailId,
                pswd
            }
            this.props.requestForAdminLogin(loginData);
        }
    }

    handleChange = (event,stateName) => {
        let value = event.target.value;
        this.setState({[stateName]:event.target.value})
        switch (stateName) {
            case 'name':
                this.nameValidation(value);
                break;
            case 'emailId':
                this.emailValidation(value);
                break;
            default:
                this.pswdValidation(value);
                break;

        }
    }

    redirectToHomePage = () => {
        const { history } = this.props;
        if(history) history.push('/admin/home');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props !== prevProps){
            if(this.checkReducerCredentialForAdminRegisterLogin() === "signUp"){
                this.redirectToHomePage();
                this.registerToggle();
            }
            else if(this.checkReducerCredentialForAdminRegisterLogin() === "signIn"){
                this.redirectToHomePage();
                this.loginToggle();
            }
        }
    }

    render() {
        let userName = ''
        let AdminRegistered = false;
        let AdminRegisterError = '';
        if(this.props.adminCredential.credentials && Object.keys(this.props.adminCredential.credentials).length !== 0){
            userName = this.props.adminCredential.credentials.name;
            AdminRegistered = true;
        }
        if(this.props.adminCredential.error_msg && Object.keys(this.props.adminCredential.error_msg).length !== 0){
            AdminRegisterError = this.props.adminCredential.error_msg.message
        }
        const {AdminregisterModal,AdminloginModal,name,emailId,pswd,errors} = this.state;

        return (
            <div>
                <Header registerClick = {this.registerClick} loginClick = {this.loginClick} AdminRegistered = {AdminRegistered} logOut = {this.logOut} userName = {userName}/>
                <JumboTron/>
                <AdminRegisterModal toggle = {this.registerToggle} handleChange = {this.handleChange} SignUp = {this.SignUp} alreadyRegister = {this.alreadyRegisterOrLogin}
                               state = {{AdminregisterModal,name,emailId,pswd,errors}} classname = {this.props.className} AdminRegisterError = {AdminRegisterError}/>
                <AdminLoginModal toggle = {this.loginToggle} handleChange = {this.handleChange} SignIn = {this.SignIn} alreadyLogin = {this.alreadyRegisterOrLogin} state = {{AdminloginModal,emailId,pswd,errors}}
                            classname = {this.props.className} AdminRegisterError = {AdminRegisterError}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { adminCredential } = state;
    return {
        adminCredential : adminCredential
    }
};

const mapDispatchToProps = dispatch => ({
    requestForAdminRegister : bindActionCreators( requestForAdminRegister , dispatch),
    clearCredentialError : bindActionCreators( clearCredentialError , dispatch ),
    requestForAdminLogin : bindActionCreators( requestForAdminLogin ,dispatch),
    logoutAdmin : bindActionCreators( logoutAdmin ,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(AdminPenal);