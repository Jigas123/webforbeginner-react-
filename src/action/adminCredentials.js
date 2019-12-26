import {REQUEST_FOR_ADMIN_REGISTER,
    REQUEST_FOR_ADMIN_LOGIN,CLEAR_ADMIN_CREDENTIALS_DATA,
    REQUEST_FOR_LOGOUT_ADMIN} from '../reducers/adminCredentials';

export const requestForAdminRegister = (registerData) => ({type:REQUEST_FOR_ADMIN_REGISTER,registerData})
export const requestForAdminLogin = (loginData) => ({type:REQUEST_FOR_ADMIN_LOGIN,loginData})
export const receiveAdminRequestedData = (responseType,data) => ({type:responseType, data})
export const clearCredentialError = () => ({type:CLEAR_ADMIN_CREDENTIALS_DATA})
export const logoutAdmin = () => ({type:REQUEST_FOR_LOGOUT_ADMIN})