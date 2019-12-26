const INITIAL_STATE = {
    success_msg : {},
    error_msg : {},
    technologyDocument : []
}

export const REQUEST_FOR_ADD_DOCUMENTATION = "REQUEST_FOR_ADD_DOCUMENTATION"
export const DOCUMENTATION_ADDED_SUCCESSFULLY = "DOCUMENTATION_ADDED_SUCCESSFULLY"
export const ERROR_WHILE_ADDING_DOCUMENTATION = "ERROR_WHILE_ADDING_DOCUMENTATION"
export const REQUEST_FOR_FETCH_DOCUMENTATION = "REQUEST_FOR_FETCH_DOCUMENTATION"
export const REQUESTED_DOCUMENT_FETCH_SUCCESSFULLY = "REQUESTED_DOCUMENT_FETCH_SUCCESSFULLY"
export const ERROR_WHILE_FETCH_DOCUMENTATION = "ERROR_WHILE_FETCH_DOCUMENTATION"
export const REQUEST_FOR_EDIT_DOCUMENTATION = "REQUEST_FOR_EDIT_DOCUMENTATION"
export const SUCCESSFULLY_EDITED_DOCUMENTATION = "SUCCESSFULLY_EDITED_DOCUMENTATION"
export const ERROR_WHILE_UPDATE_DOCUMENTATION = "ERROR_WHILE_UPDATE_DOCUMENTATION"
export const REQUEST_FOR_DELETE_DOCUMENT = "REQUEST_FOR_DELETE_DOCUMENT"
export const DOCUMENT_DELETE_SUCCESSFULLY = "DOCUMENT_DELETE_SUCCESSFULLY"
export const ERROR_WHILE_DELETE_DOCUMENTATION = "ERROR_WHILE_DELETE_DOCUMENTATION"
export const REQUEST_FOR_CLEAR_DOCUMENT = "REQUEST_FOR_CLEAR_DOCUMENT"
export const REQUEST_FOR_MARK_TRAINY_DOCUMENT = "REQUEST_FOR_MARK_TRAINY_DOCUMENT"
export const RECEIVE_MARK_TRAINY_DOCUMENT = "RECEIVE_MARK_TRAINY_DOCUMENT"
export const ERROR_WHILE_MARK_TRAINY_DOCUMENT = "ERROR_WHILE_MARK_TRAINY_DOCUMENT"

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST_FOR_ADD_DOCUMENTATION:
            return state
        case DOCUMENTATION_ADDED_SUCCESSFULLY:
            const addtechnologyDocument = state.technologyDocument;
            addtechnologyDocument.push(action.data);

            return {...state,technologyDocument: addtechnologyDocument,success_msg: {message:"document added successfully"}}
        case ERROR_WHILE_ADDING_DOCUMENTATION:
            return ({},state,{error_msg: action.data,success_msg: {}})
        case REQUESTED_DOCUMENT_FETCH_SUCCESSFULLY:
            return ({},state,{technologyDocument: action.data,error_msg: {},success_msg: {message:"requested document fetch successfully"}})
        case ERROR_WHILE_FETCH_DOCUMENTATION:
            return ({},state,{error_msg: action.data,technologyDocument: [],success_msg: {}})
        case REQUEST_FOR_DELETE_DOCUMENT:
            return state
        case DOCUMENT_DELETE_SUCCESSFULLY:
            const deletetechnologyDocument = state.technologyDocument;
            const {message,document_id} = action.data

            const deletedIndex = deletetechnologyDocument.findIndex(document => document._id === document_id)
            deletetechnologyDocument.splice(deletedIndex,1);
            return {...state,success_msg : {message},technologyDocument : deletetechnologyDocument,error_msg: {}}
        case ERROR_WHILE_DELETE_DOCUMENTATION:
            return state
        case REQUEST_FOR_EDIT_DOCUMENTATION:
            return state
        case ERROR_WHILE_UPDATE_DOCUMENTATION:
            return ({},state,{...state,error_msg: action.data,success_msg: {}})
        case SUCCESSFULLY_EDITED_DOCUMENTATION:

            const {technologyDocument} = state;
            const technologyIndex = technologyDocument.findIndex(document => document._id === action.data._id)
            technologyDocument[technologyIndex] = action.data


            return {
                ...state,
                technologyDocument,
                success_msg: {message: "successfully edit document"}
            };
        case REQUEST_FOR_CLEAR_DOCUMENT:
            return {...state,technologyDocument:[],success_msg: {message : "document clear successfully"}}
        case REQUEST_FOR_MARK_TRAINY_DOCUMENT:
            return state
        case RECEIVE_MARK_TRAINY_DOCUMENT:
            const {_id,markAsRead} = action.data
            const DocumentForMark = state.technologyDocument;
            const markedIndex = DocumentForMark.findIndex(document => document._id === _id)
            DocumentForMark[markedIndex]["markAsRead"] = markAsRead
            return {
                ...state,technologyDocument:DocumentForMark,success_msg: {message: "successfully marked by trainy"}
            }
        case ERROR_WHILE_MARK_TRAINY_DOCUMENT:
            return ({},state,{error_msg: action.data,technologyDocument: [],success_msg: {}})
        default:
            return state
    }
}