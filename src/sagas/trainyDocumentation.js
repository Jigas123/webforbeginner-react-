import {put} from "@redux-saga/core/effects";
import {markAsReadDocument,TrainyDataAction,TechnoBasedTrainyDataAction} from '../services/trainyDocumentation';
import {receiveMarkAsReadRequest} from '../action/trainyDocumentation';
import {DOCUMENT_MARKED_SUCCESSFULLY,ERROR_WHILE_MARK_DOCUMENT_AS_READ,
        RECEIVED_TRAINY_DETAIL,ERROR_WHILE_GET_TRAINY_DETAIL,
        RECEIVED_TECHNO_BASED_TRAINY_DATA,ERROR_WHILE_RECEIVE_TECHNO_BASED_DATA} from '../reducers/trainyDocumentationInfo';

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

export function* makeMarkAsReadRequest({documentationInfoObj}) {
    try {
        const responseData = yield callMarkAsReadAction(documentationInfoObj);
        if(responseData.message !== "there is an error while save marked data" && responseData.message !== "callable API not found!"){

            yield put(receiveMarkAsReadRequest(DOCUMENT_MARKED_SUCCESSFULLY,responseData))
        }
        else {
            yield put(receiveMarkAsReadRequest(ERROR_WHILE_MARK_DOCUMENT_AS_READ,responseData))
        }
    }
    catch (e) {
        yield put(receiveMarkAsReadRequest(ERROR_WHILE_MARK_DOCUMENT_AS_READ,{message:'callable API not found!'}))
    }
}

const callTrainyDataAction = () => {
    return TrainyDataAction()
        .then((resp) => {
            if(resp.status !== 200) return false
            return resp.data
        })
        .catch((e) => {
            if(e.response.data !== undefined) return e.response.data
            return {message:"callable API not found!"};
        })
}

export function* makeRequestForTrainyData() {
    try{
        const responseData = yield callTrainyDataAction()
        if(responseData){
            yield put(receiveMarkAsReadRequest(RECEIVED_TRAINY_DETAIL,responseData))
        }
        else {
            yield put(receiveMarkAsReadRequest(ERROR_WHILE_GET_TRAINY_DETAIL,responseData))
        }
    }
    catch (e) {
            yield put(receiveMarkAsReadRequest(ERROR_WHILE_GET_TRAINY_DETAIL,{message:"callable API not found!"}))
    }
}

const getTechnoBasedTrainyAction = (technoStatusData) => {
    return TechnoBasedTrainyDataAction(technoStatusData)
        .then((resp) => {
            if(resp.status !== 200) return false
            return resp.data
        })
        .catch((e) => {
            if(e.response.data !== undefined) return e.response.data
            return {message:"callable API not found!"};
        })
}

export function* makeRequestForTechnoBasedTrainy({technoStatusData}) {
    try{
        const responseData = yield getTechnoBasedTrainyAction(technoStatusData)
        if(responseData){
            debugger
            yield put(receiveMarkAsReadRequest(RECEIVED_TECHNO_BASED_TRAINY_DATA,responseData))
        }
        else {
            debugger
            yield put(receiveMarkAsReadRequest(ERROR_WHILE_RECEIVE_TECHNO_BASED_DATA,responseData))
        }
    }
    catch (e) {
        yield put(receiveMarkAsReadRequest(ERROR_WHILE_RECEIVE_TECHNO_BASED_DATA,{message:"callable API not found!"}))
    }
}

