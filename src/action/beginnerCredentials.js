import {REQUEST_FOR_REGISTER,
        REQUEST_FOR_LOGIN,
        CLEAR_CREDENTIALS_DATA,LOGOUT_USER_DATA,REQUEST_FOR_ADD_TECHNO_HOURS} from '../reducers/beginnerCredentials';

export const requestForRegister = (registerData) => ({type:REQUEST_FOR_REGISTER,registerData})
export const requestForLogin = (loginData) => ({type:REQUEST_FOR_LOGIN,loginData})
export const receiveRequestedData = (responseType,data) => ({type:responseType, data})
export const requestForAddTechnoHour = (hoursInfo) => ({type:REQUEST_FOR_ADD_TECHNO_HOURS,hoursInfo})
export const clearCredentialError = () => ({type:CLEAR_CREDENTIALS_DATA})
export const logOutUser = () => ({type:LOGOUT_USER_DATA})