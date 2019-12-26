import {REQUEST_FOR_ADD_DOCUMENTATION,REQUEST_FOR_FETCH_DOCUMENTATION,REQUEST_FOR_EDIT_DOCUMENTATION,
        REQUEST_FOR_DELETE_DOCUMENT,REQUEST_FOR_CLEAR_DOCUMENT,REQUEST_FOR_MARK_TRAINY_DOCUMENT} from '../reducers/documentation';

export const requestForAddDocumentation = (dataDocument) => ({type:REQUEST_FOR_ADD_DOCUMENTATION,dataDocument})
export const receiveRequestedDocumentationResp = (actionType,data) => ({type:actionType,data})
export const requestForFetchDocumentResp = (TechnoIdTrainyIdObject) => ({type:REQUEST_FOR_FETCH_DOCUMENTATION,TechnoIdTrainyIdObject});
export const requestFoeEditDocumentation = (editDataDocument) => ({type: REQUEST_FOR_EDIT_DOCUMENTATION,editDataDocument})
export const requestForDeleteDocument = (documentObject) => ({type:REQUEST_FOR_DELETE_DOCUMENT,documentObject});
export const requestForClearDocument = () => ({type:REQUEST_FOR_CLEAR_DOCUMENT})
export const requestForMarkTrainyDocument = (documentationInfoObj) => ({type:REQUEST_FOR_MARK_TRAINY_DOCUMENT,documentationInfoObj})