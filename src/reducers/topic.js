const INITIAL_STATE = {
    success_msg: {},
    error_msg: {},
    allTopic: []
}

export const REQUEST_FOR_ADD_TOPIC = "REQUEST_FOR_ADD_TOPIC"
export const SUCCESSFULLY_ADDED_TOPIC = "SUCCESSFULLY_ADDED_TOPIC"
export const ERROR_WHILE_ADD_TOPIC = "ERROR_WHILE_ADD_TOPIC"
export const CLEAR_TOPIC_ERRORS = "CLEAR_TOPIC_ERRORS"
export const GET_ALL_TOPIC = "GET_ALL_TOPIC"
export const REQUEST_FOR_GET_ALL_TOPIC = "REQUEST_FOR_GET_ALL_TOPIC"
export const REQUEST_FOR_DELETE_TOPIC = "REQUEST_FOR_DELETE_TOPIC"
export const DELETE_TOPIC_SUCCESSFULLY = "DELETE_TOPIC_SUCCESSFULLY"
export const ERROR_WHILE_DELETE_TOPIC = "ERROR_WHILE_DELETE_TOPIC"

export default (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case REQUEST_FOR_ADD_TOPIC:
            return state
        case SUCCESSFULLY_ADDED_TOPIC:
            let {allTopic} = state;
            allTopic.push(action.data)
            return {...state,success_msg: {message:"Topic successfully added"},allTopic,error_msg: {}}
        case ERROR_WHILE_ADD_TOPIC:
            return ({},state,{error_msg: action.data,success_msg: {}})
        case CLEAR_TOPIC_ERRORS:
            return ({},state,{...state,error_msg: {}})
        case REQUEST_FOR_GET_ALL_TOPIC:
            return state
        case GET_ALL_TOPIC:
            return ({},state,{allTopic: action.data,success_msg: {},error_msg: {}})
        case DELETE_TOPIC_SUCCESSFULLY:
            let getAllTopic = state.allTopic
            const {message,topic_id} = action.data
            const deletedIndex = getAllTopic.findIndex(topic => topic._id === topic_id)
            getAllTopic.splice(deletedIndex,1)
            return {...state,success_msg: {message},error_msg: {},allTopic: getAllTopic}
        case ERROR_WHILE_DELETE_TOPIC:
            return {...state,error_msg: action.data,success_msg: {}}
        default:
            return state
    }
}