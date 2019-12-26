const INITIAL_STATE = {
    credentials: {},
    error_msg: {}
}

export const REQUEST_FOR_ADMIN_REGISTER = "REQUEST_FOR_ADMIN_REGISTER"
export const REQUEST_FOR_ADMIN_LOGIN = "REQUEST_FOR_ADMIN_LOGIN"
export const ADMIN_REGISTER_SUCCESSFULLY = "ADMIN_REGISTER_SUCCESSFULLY"
export const ADMIN_LOGIN_SUCCESSFULLY = "ADMIN_LOGIN_SUCCESSFULLY"
export const ERROR_WHILE_REGISTER_ADMIN = "ERROR_WHILE_REGISTER_ADMIN"
export const ERROR_WHILE_LOGIN_ADMIN = "ERROR_WHILE_LOGIN_ADMIN"
export const CLEAR_ADMIN_CREDENTIALS_DATA = "CLEAR_ADMIN_CREDENTIALS_DATA"
export const REQUEST_FOR_LOGOUT_ADMIN = "REQUEST_FOR_LOGOUT_ADMIN"

export default (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case REQUEST_FOR_ADMIN_REGISTER:
            return {state}
        case ADMIN_REGISTER_SUCCESSFULLY:
            return ({},state,{credentials: action.data,error_msg: {}})
        case ERROR_WHILE_REGISTER_ADMIN:
            return ({},state,{credentials: {},error_msg: action.data})
        case REQUEST_FOR_ADMIN_LOGIN:
            return {state}
        case ADMIN_LOGIN_SUCCESSFULLY:
            return ({},state,{credentials: action.data,error_msg: {}})
        case ERROR_WHILE_LOGIN_ADMIN:
            return ({},state,{credentials: {},error_msg: action.data})
        case CLEAR_ADMIN_CREDENTIALS_DATA:
            return ({},state,{credentials: {},error_msg: {}})
        case REQUEST_FOR_LOGOUT_ADMIN:
            return {...state,credentials: {},error_msg: {}}
        default:
            return state
    }
}