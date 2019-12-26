    const INITIAL_STATE = {
        credentials: {},
        error_msg: {}
    }

    export const REQUEST_FOR_REGISTER = "REQUEST_FOR_REGISTER"
    export const REQUEST_FOR_LOGIN = "REQUEST_FOR_LOGIN"
    export const BEGINNER_REGISTER_SUCCESSFULLY = "BEGINNER_REGISTER_SUCCESSFULLY"
    export const BEGINNER_LOGIN_SUCCESSFULLY = "BEGINNER_LOGIN_SUCCESSFULLY"
    export const ERROR_WHILE_REGISTER_BEGINNER = "ERROR_WHILE_REGISTER_BEGINNER"
    export const ERROR_WHILE_LOGIN_BEGINNER = "ERROR_WHILE_LOGIN_BEGINNER"
    export const CLEAR_CREDENTIALS_DATA = "CLEAR_CREDENTIALS_DATA"
    export const LOGOUT_USER_DATA = "LOGOUT_USER_DATA"
    export const REQUEST_FOR_ADD_TECHNO_HOURS = "REQUEST_FOR_ADD_TECHNO_HOURS"
    export const REQUESTED_TECHNO_HOURS_ADD_SUCCESSFULLY = "REQUESTED_TECHNO_HOURS_ADD_SUCCESSFULLY"
    export const ERROR_WHILE_ADD_TECHNO_HOURS = "ERROR_WHILE_ADD_TECHNO_HOURS"
    export const REMOVE_TECHNO_HOURS_INFO = "REMOVE_TECHNO_HOURS_INFO"
    export const ERROR_WHILE_REMOVE_TECHNO_HOURS = "ERROR_WHILE_REMOVE_TECHNO_HOURS"

    export default (state = INITIAL_STATE,action) => {
        let {credentials} = state
        switch (action.type) {
            case REQUEST_FOR_REGISTER:
                return state
            case BEGINNER_REGISTER_SUCCESSFULLY:
                return ({},state,{credentials: action.data,error_msg: {}})
            case ERROR_WHILE_REGISTER_BEGINNER:
                return ({},state,{credentials: {},error_msg: action.data})
            case REQUEST_FOR_LOGIN:
                return state
            case BEGINNER_LOGIN_SUCCESSFULLY:
                return ({},state,{credentials: action.data,error_msg: {}})
            case ERROR_WHILE_LOGIN_BEGINNER:
                return ({},state,{credentials: {},error_msg: action.data})
            case CLEAR_CREDENTIALS_DATA:
                return ({},state,{credentials: {},error_msg: {}})
            case LOGOUT_USER_DATA:
                return ({},state,{credentials: {},error_msg: {}})
            case REQUEST_FOR_ADD_TECHNO_HOURS:
                return state
            case REQUESTED_TECHNO_HOURS_ADD_SUCCESSFULLY:
                debugger
                credentials.technoHours = action.data
                return {...state,credentials}
            case ERROR_WHILE_ADD_TECHNO_HOURS:
                return {...state,error_msg: action.data}
            case REMOVE_TECHNO_HOURS_INFO:
                credentials.technoHours = action.data
                return {...state,credentials}
            case ERROR_WHILE_REMOVE_TECHNO_HOURS:
                return {...state,error_msg: action.data}
            default:
                return state
        }
    }