import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom'
import './main.css';

import Header from './header/header';
import BeginnerJumboTron from './jumbotron/tronBanner';
import RegisterModal from './Modals/register';
import LoginModal from './Modals/login';
import {requestForRegister,requestForLogin,clearCredentialError,logOutUser} from '../action/beginnerCredentials';

class MainPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            registerModal : false,
            loginModal : false,
            name : '',
            emailId : '',
            pswd : '',
            errors : {},
            errorFlag : false,
            signUp : false,
            signIn: false
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

    checkReducerCredentialForRegisterLogin = () => {
        if(this.props.beginnerCredential.credentials && Object.keys(this.props.beginnerCredential.credentials).length !== 0 && this.state.signUp){
            // let decryption = verify(this.props.beginnerCredential.credentials.token,'sign123');
            return "signUp";
        }
        else if(this.props.beginnerCredential.credentials && Object.keys(this.props.beginnerCredential.credentials).length !== 0 && this.state.signIn){
            // let decryption = verify(this.props.beginnerCredential.credentials.token,'sign123');
            return "signIn";
        }
        return false
    }

    checkSignUpSignInErrorData = async () => {
        if(this.props.beginnerCredential.error_msg && Object.keys(this.props.beginnerCredential.error_msg).length !== 0){
            localStorage.removeItem("beginnerCredential")
            await this.props.clearCredentialError();
        }
    }

    logOut = (userName) => {
        const {name} = this.props.beginnerCredential.credentials;
        if(name === userName){
            localStorage.removeItem("beginnerCredential");
            this.props.logOutUser();
            this.props.history.push({pathname:'/'});
        }
    }

    nameValidation = (value) => {
        const error = {};
        if(value){
            let nameValid = value.match(/^[A-Za-z ]+$/);
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



    handleChange = (event,stateName) => {
        let value = event.target.value;
        this.setState({[stateName]:value})
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
            this.setState({'signUp':true})
            const {name,emailId,pswd} = this.state;
            let registerData = {
                name,
                emailId,
                pswd
            }
            await this.props.requestForRegister(registerData);
        }
    }

    SignIn = () => {
        if(this.getAllValidation('signIn')){
            this.setState({'signIn':true})
            const {emailId,pswd} = this.state;
            let loginData = {
                emailId,
                pswd
            }
            this.props.requestForLogin(loginData);

        }
    }

    registerToggle = async () => {
        this.checkSignUpSignInErrorData();
        this.setState({registerModal: !this.state.registerModal,signUp:false})
    }

    registerClick = () => {
        this.clearState();
        this.registerToggle();
    }

    alreadyRegisterOrLogin = () => {
        this.clearState();
        this.registerToggle();
        this.loginToggle();
    }

    loginToggle = () => {
        this.checkSignUpSignInErrorData();
        this.setState({loginModal: !this.state.loginModal,signIn:false})
    }

    loginClick = () => {
        this.clearState();
        this.loginToggle();
    }

    getStart = () => {
        if(this.props.beginnerCredential.credentials && Object.keys(this.props.beginnerCredential.credentials).length > 0){
        }
        else {
            this.loginToggle();
        }
    }

    redirectToHomePage = () => {
        let loginConfirmation = this.checkReducerCredentialForRegisterLogin();
        const { history } = this.props;
        if(history) history.push({pathname:'/trainy/home',state:{loginConfirmation:loginConfirmation}});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props !== prevProps){
            if(this.checkReducerCredentialForRegisterLogin() === "signUp"){
                this.registerToggle();
                this.redirectToHomePage();
            }
            else if(this.checkReducerCredentialForRegisterLogin() === "signIn"){
                this.loginToggle();
                this.redirectToHomePage()
            }
        }
    }

    render() {
        let UserName = '';
        let registered = false;
        let registerError = '';
        if(this.props.beginnerCredential.credentials && Object.keys(this.props.beginnerCredential.credentials).length !== 0){
            registered = true;
            UserName = this.props.beginnerCredential.credentials.name;
        }
        if(this.props.beginnerCredential.error_msg && Object.keys(this.props.beginnerCredential.error_msg).length !== 0){
            registerError = this.props.beginnerCredential.error_msg.message
        }
        const {registerModal,loginModal,name,emailId,pswd,errors} = this.state;
        return (
            <div>
                <Header registerClick = {this.registerClick} loginClick = {this.loginClick} registered = {registered} userName={UserName} logOut = {this.logOut}/>
                <BeginnerJumboTron/>
                <RegisterModal toggle = {this.registerToggle} handleChange = {this.handleChange} SignUp = {this.SignUp} alreadyRegister = {this.alreadyRegisterOrLogin}
                               state = {{registerModal,name,emailId,pswd,errors}} registerError = {registerError} classname = {this.props.className}/>
                <LoginModal toggle = {this.loginToggle} handleChange = {this.handleChange} SignIn = {this.SignIn} alreadyLogin = {this.alreadyRegisterOrLogin} state = {{loginModal,emailId,pswd,errors}}
                            classname = {this.props.className} registerError = {registerError}/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { beginnerCredential }  = state;
    return {
        beginnerCredential : beginnerCredential
    }
};

const mapDispatchToProps = dispatch =>({
    requestForRegister:bindActionCreators( requestForRegister , dispatch),
    requestForLogin:bindActionCreators( requestForLogin , dispatch),
    clearCredentialError:bindActionCreators(clearCredentialError,dispatch),
    logOutUser : bindActionCreators( logOutUser ,dispatch)
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainPage));