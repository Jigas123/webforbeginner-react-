const INITIAL_STATE = {
    technologies : [],
    success_msg : {},
    error_msg : {}
}

export const REQUEST_FOR_ADD_TECHNOLOGY = "REQUEST_FOR_ADD_TECHNOLOGY";
export const TECHNOLOGY_ADDED_SUCCESSFULLY = "TECHNOLOGY_ADDED_SUCCESSFULLY";
export const REQUEST_FOR_FETCH_TECHNOLOGY = "REQUEST_FOR_FETCH_TECHNOLOGY";
export const RECEIVED_TECHNOLOGIES = "RECEIVED_TECHNOLOGIES";
export const ERROR_WHILE_ADD_TECHNOLOGY = "ERROR_WHILE_ADD_TECHNOLOGY";
export const ERROR_WHILE_FETCH_TECHNOLOGY = "ERROR_WHILE_FETCH_TECHNOLOGY";
export const REQUEST_FOR_DELETE_TECHNOLOGY = "REQUEST_FOR_DELETE_TECHNOLOGY";
export const DELETE_TECHNOLOGY_SUCCESSFULLY = "DELETE_TECHNOLOGY_SUCCESSFULLY";
export const ERROR_WHILE_DELETE_TECHNOLOGY = "ERROR_WHILE_DELETE_TECHNOLOGY";

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST_FOR_ADD_TECHNOLOGY:
            return state
        case TECHNOLOGY_ADDED_SUCCESSFULLY:
            let {technologies} = state;
            technologies.unshift(action.data);
            return {...state,technologies,error_msg: {}}
        case REQUEST_FOR_FETCH_TECHNOLOGY:
            return state
        case RECEIVED_TECHNOLOGIES:
            return ({},state,{technologies : action.data,error_msg: {}})
        case ERROR_WHILE_FETCH_TECHNOLOGY:
            return ({},state,{...state,error_msg: action.data})
        case REQUEST_FOR_DELETE_TECHNOLOGY:
            return state
        case DELETE_TECHNOLOGY_SUCCESSFULLY:
            const {message,deletedId} = action.data;
            let deleteTechnology = state.technologies;
            const deletedIndex = deleteTechnology.findIndex(technology => technology._id === deletedId)
            if(deletedIndex > -1) deleteTechnology.splice(deletedIndex,1)
            return {...state,success_msg: message,technologies: deleteTechnology}
        case ERROR_WHILE_DELETE_TECHNOLOGY:
            return ({},state,{...state,error_msg: action.data})
        default:
            return state
    }
}