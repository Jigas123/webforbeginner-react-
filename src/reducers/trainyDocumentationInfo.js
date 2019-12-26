const INITIAL_STATE = {
    trainyDocumentation : [],
    error_msg : {}
}

export const REQUEST_FOR_INITIAL_MARK_AS_READ = "REQUEST_FOR_INITIAL_MARK_AS_READ"
export const REQUEST_FOR_MARK_AS_READ = "REQUEST_FOR_MARK_AS_READ"
export const REQUEST_FOR_UNMARK_AS_READ = "REQUEST_FOR_UNMARK_AS_READ"
export const DOCUMENT_MARKED_SUCCESSFULLY = "DOCUMENT_MARKED_SUCCESSFULLY"
export const ERROR_WHILE_MARK_DOCUMENT_AS_READ = "ERROR_WHILE_MARK_DOCUMENT_AS_READ"
export const FETCH_TRAINY_MARKED_DOCUMENTATION = "FETCH_TRAINY_MARKED_DOCUMENTATION"
export const ERROR_WHILE_FETCH_TRAINY_DOCUMENT_AS_READ = "ERROR_WHILE_FETCH_TRAINY_DOCUMENT_AS_READ"
export const REQUEST_FOR_TRAINY_DETAIL = "REQUEST_FOR_TRAINY_DETAIL"
export const RECEIVED_TRAINY_DETAIL = "RECEIVED_TRAINY_DETAIL"
export const ERROR_WHILE_GET_TRAINY_DETAIL = "ERROR_WHILE_GET_TRAINY_DETAIL"
export const REQUEST_FOR_TECHNO_BASED_TRAINY = "REQUEST_FOR_TECHNO_BASED_TRAINY"
export const RECEIVED_TECHNO_BASED_TRAINY_DATA = "RECEIVED_TECHNO_BASED_TRAINY_DATA"
export const ERROR_WHILE_RECEIVE_TECHNO_BASED_DATA = "ERROR_WHILE_RECEIVE_TECHNO_BASED_DATA"

export default (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case REQUEST_FOR_MARK_AS_READ:
            return state
        case REQUEST_FOR_UNMARK_AS_READ:
            return state
        case FETCH_TRAINY_MARKED_DOCUMENTATION:
            return {...state,trainyDocumentation: action.data,error_msg: {}}
        case ERROR_WHILE_FETCH_TRAINY_DOCUMENT_AS_READ:
            return {trainyDocumentation: {},error_msg: action.data}
        case DOCUMENT_MARKED_SUCCESSFULLY:
            const {trainyDocumentation} = state
            const {data} = action
            const findTrainyDocumentIndex = trainyDocumentation.findIndex(trainyDocument => trainyDocument._id === data._id)
            trainyDocumentation[findTrainyDocumentIndex] = data
            return {...state,trainyDocumentation,error_msg: {}}
        case ERROR_WHILE_MARK_DOCUMENT_AS_READ:
            return {...state,error_msg: action.data,trainyDocumentation: {}}
        case REQUEST_FOR_INITIAL_MARK_AS_READ:
            return {...state,trainyDocumentation: action.data,error_msg: {}}
        case REQUEST_FOR_TRAINY_DETAIL:
            return state
        case RECEIVED_TRAINY_DETAIL:
            debugger
            return {...state,trainyDocumentation : action.data,error_msg: {}}
        case ERROR_WHILE_GET_TRAINY_DETAIL:
            return {...state,trainyDocumentation: {},error_msg: action.data}
        case REQUEST_FOR_TECHNO_BASED_TRAINY:
            return state
        case RECEIVED_TECHNO_BASED_TRAINY_DATA:
            debugger
            return {...state,trainyDocumentation: action.data,error_msg: {}}
        case ERROR_WHILE_RECEIVE_TECHNO_BASED_DATA:
            return {...state,trainyDocumentation: {},error_msg: action.data}
        default:
            return state
    }
}