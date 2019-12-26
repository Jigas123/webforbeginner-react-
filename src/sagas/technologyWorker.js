import {put} from 'redux-saga/effects';

import {receivedAddTechnologyRequest} from '../action/technology';
import {
    TECHNOLOGY_ADDED_SUCCESSFULLY, ERROR_WHILE_ADD_TECHNOLOGY, RECEIVED_TECHNOLOGIES,
    ERROR_WHILE_FETCH_TECHNOLOGY, DELETE_TECHNOLOGY_SUCCESSFULLY, ERROR_WHILE_DELETE_TECHNOLOGY
} from '../reducers/technology';
import {addTechnologyRequest,fetchAllTechnology,deleteTechnology} from '../services/technology';

const callAddTechnologyAction = (technologyData) => {
    return addTechnologyRequest(technologyData)
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
export function* makeAddTechnologyRequest({technologyObj}) {
    try {
        const responseData = yield (callAddTechnologyAction(technologyObj));
        if(responseData.message !== "Technology already available" && responseData.message !== "callable API not found"){
            yield put(receivedAddTechnologyRequest(TECHNOLOGY_ADDED_SUCCESSFULLY,responseData))
        }
        else {
            yield put(receivedAddTechnologyRequest(ERROR_WHILE_ADD_TECHNOLOGY,responseData))
        }
    }
    catch (e) {
        yield put(receivedAddTechnologyRequest(ERROR_WHILE_ADD_TECHNOLOGY,{message:'callable API not found!'}))
    }
}

const callFetchTechnologyAction = () => {
    return fetchAllTechnology()
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

export function* makeFetchAllTechnologyRequest() {
    try {
        const responseData = yield (callFetchTechnologyAction());
        if(responseData.message !== "There is an error while fetching data" && responseData.message !== "callable API not found"){
            yield put(receivedAddTechnologyRequest(RECEIVED_TECHNOLOGIES,responseData))
        }
        else {
            yield put(receivedAddTechnologyRequest(ERROR_WHILE_FETCH_TECHNOLOGY,responseData))
        }
    }
    catch (e) {
        yield put(receivedAddTechnologyRequest(ERROR_WHILE_FETCH_TECHNOLOGY,{message:'callable API not found!'}))
    }
}

const callDeleteTechnologyAction = (DeleteId) => {
    return deleteTechnology(DeleteId)
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

export function* makeDeleteTechnologyRequest({DeleteId}) {
    try {
        const responseData = yield (callDeleteTechnologyAction(DeleteId));
        if(responseData.message !== "There is an error while delete data" && responseData.message !== "callable API not found"){
            yield put(receivedAddTechnologyRequest(DELETE_TECHNOLOGY_SUCCESSFULLY,{...responseData,deletedId:DeleteId}))
        }
        else {
            yield put(receivedAddTechnologyRequest(ERROR_WHILE_DELETE_TECHNOLOGY,responseData))
        }
    }
    catch (e) {
            yield put(receivedAddTechnologyRequest(ERROR_WHILE_DELETE_TECHNOLOGY,{message:'callable API not found!'}))
    }
}

// export function* makeSetAllTechnology() {
//     try {
//         yield put(receivedAddTechnologyRequest(RECEIVED_TECHNOLOGIES,))
//     }
// }