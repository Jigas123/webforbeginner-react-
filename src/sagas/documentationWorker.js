import {addDocumentationRequest,FetchDocumentationRequest,UpdateDocumentationRequest,
    DeleteDocumentationRequest,markAsReadDocument} from "../services/documentation";
import {put} from "@redux-saga/core/effects";
import {receiveRequestedDocumentationResp} from "../action/documentation";
import {makeRequestForRemoveTechnoHours} from './registerWorker';
import {DOCUMENTATION_ADDED_SUCCESSFULLY,ERROR_WHILE_ADDING_DOCUMENTATION,REQUESTED_DOCUMENT_FETCH_SUCCESSFULLY,
        ERROR_WHILE_FETCH_DOCUMENTATION,SUCCESSFULLY_EDITED_DOCUMENTATION,ERROR_WHILE_UPDATE_DOCUMENTATION,
        DOCUMENT_DELETE_SUCCESSFULLY,ERROR_WHILE_DELETE_DOCUMENTATION,RECEIVE_MARK_TRAINY_DOCUMENT,
        ERROR_WHILE_MARK_TRAINY_DOCUMENT} from "../reducers/documentation";

const callAddDocumentationAction = (dataDocument) => {
    return addDocumentationRequest(dataDocument)
        .then((resp) => {
            if(resp.status !== 200){
                return false
            }
            return resp.data;
        })
        .catch((e) => {
            if(e.response.data !== undefined) return e.response.data;
            return {message:"callable API not found"};
        })

}
//register API
export function* makeAddDocumentRequest({dataDocument}) {
    try {
        debugger
        let {data} = dataDocument
        const responseData = yield (callAddDocumentationAction(data));
        if(responseData.message !== "topic already available" && responseData.message !== "callable API not found"){
            debugger
            yield put(receiveRequestedDocumentationResp(DOCUMENTATION_ADDED_SUCCESSFULLY,responseData))
        }
        else {
            yield put(receiveRequestedDocumentationResp(ERROR_WHILE_ADDING_DOCUMENTATION,responseData))
        }
    }
    catch (e) {
        yield put(receiveRequestedDocumentationResp(ERROR_WHILE_ADDING_DOCUMENTATION,{message:'callable API not found!'}))
    }
}

const callFetchDocumentationAction = (TechnoIdTrainyIdObject) => {
    return FetchDocumentationRequest(TechnoIdTrainyIdObject)
        .then((resp) => {
            if(resp.status !== 200){
                return false
            }
            return resp.data;
        })
        .catch((e) => {
            if(e.response.data !== undefined) return e.response.data;
            return {message:"callable API not found"};
        })

}

export function* makeFetchTopicDocument({TechnoIdTrainyIdObject}) {
    try {
        const responseData = yield (callFetchDocumentationAction(TechnoIdTrainyIdObject));

        if(responseData.message !== "error occur while getting technology document" && responseData.message !== "error while mapp technology & topic name" && responseData.message !== "callable API not found"){

            yield put(receiveRequestedDocumentationResp(REQUESTED_DOCUMENT_FETCH_SUCCESSFULLY,responseData))
        }
        else {
            yield put(receiveRequestedDocumentationResp(ERROR_WHILE_FETCH_DOCUMENTATION,responseData))
        }
    }
    catch (e) {
        yield put(receiveRequestedDocumentationResp(ERROR_WHILE_FETCH_DOCUMENTATION,{message:'callable API not found!'}))
    }
}

const callUpdateDocumentationAction = (editDataDocument) => {
    return UpdateDocumentationRequest(editDataDocument)
        .then((resp) => {
            if(resp.status !== 200){
                return false
            }
            return resp.data;
        })
        .catch((e) => {
            if(e.response.data !== undefined) return e.response.data;
            return {message:"callable API not found"};
        })

}

export function* makeUpdateDocument({editDataDocument}) {
    try {
        debugger
        const responseData = yield (callUpdateDocumentationAction(editDataDocument));

        if(responseData.message !== "there is an error while update data" && responseData.message !== "callable API not found"){
            debugger
            yield put(receiveRequestedDocumentationResp(SUCCESSFULLY_EDITED_DOCUMENTATION,responseData))
        }
        else {

            yield put(receiveRequestedDocumentationResp(ERROR_WHILE_UPDATE_DOCUMENTATION,responseData))
        }
    }
    catch (e) {
        yield put(receiveRequestedDocumentationResp(ERROR_WHILE_UPDATE_DOCUMENTATION,{message:'callable API not found!'}))
    }
}

const callDeleteDocumentationAction = (document_id) => {

    return DeleteDocumentationRequest(document_id)
        .then((resp) => {
            if(resp.status !== 200){

                return false
            }
            return resp.data;
        })
        .catch((e) => {
            if(e.response.data !== undefined) return e.response.data;
            return {message:"callable API not found"};
        })

}

export function* makeDeleteDocument({documentObject}) {
    try {
        const {document_id} = documentObject
        const responseData = yield (callDeleteDocumentationAction(document_id));

        if(responseData.message !== "there is an error while delete document" && responseData.message !== "callable API not found"){
            let newResponseData = {...responseData,document_id}
            yield put(receiveRequestedDocumentationResp(DOCUMENT_DELETE_SUCCESSFULLY,newResponseData))
        }
        else {

            yield put(receiveRequestedDocumentationResp(ERROR_WHILE_DELETE_DOCUMENTATION,responseData))
        }
    }
    catch (e) {
        yield put(receiveRequestedDocumentationResp(ERROR_WHILE_DELETE_DOCUMENTATION,{message:'callable API not found!'}))
    }
}

const callMarkAsReadAction = (documentationInfoObj) => {
    return markAsReadDocument(documentationInfoObj)
        .then((resp) => {
            if(resp.status !== 200) return false
            return resp.data
        })
        .catch((e) => {
            if(e.response.data !== undefined) return e.response.data
            return {message:"callable API not found!"};
        })
}

export function* makeMarkAsReadByTrainyRequest({documentationInfoObj}) {
    try {
        const {removeTechnoHour,trainy_id} = documentationInfoObj
        const dataForRemoveTechnoHours = {removeTechnoHour,trainy_id}
        const responseData = yield callMarkAsReadAction(documentationInfoObj);
        if(responseData.message !== "there is an error while mapp data with document" && responseData.message !== "callable API not found!"
            && responseData.message !== "there is an error while save marked data"){
            yield put(receiveRequestedDocumentationResp(RECEIVE_MARK_TRAINY_DOCUMENT,responseData))
            if(removeTechnoHour) {
                debugger
                yield* makeRequestForRemoveTechnoHours({dataForRemoveTechnoHours})
            }
        }
        else {
            yield put(receiveRequestedDocumentationResp(ERROR_WHILE_MARK_TRAINY_DOCUMENT,responseData))
        }
    }
    catch (e) {
        yield put(receiveRequestedDocumentationResp(ERROR_WHILE_MARK_TRAINY_DOCUMENT,{message:'callable API not found!'}))
    }
}