import {put} from 'redux-saga/effects';

import {receiveRequestedData} from '../action/beginnerCredentials';
import {BEGINNER_REGISTER_SUCCESSFULLY,ERROR_WHILE_REGISTER_BEGINNER,
        REQUESTED_TECHNO_HOURS_ADD_SUCCESSFULLY,ERROR_WHILE_ADD_TECHNO_HOURS,
        REMOVE_TECHNO_HOURS_INFO,ERROR_WHILE_REMOVE_TECHNO_HOURS} from '../reducers/beginnerCredentials';
import {beginnerRegister,addTechnoHours,removeTechnoHours} from '../services/beginnerRegister';

const callRegisterAction = (passData) => {
    return beginnerRegister(passData)
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
export function* makeRegisterRequest({registerData}) {
    try {
        const responseData = yield (callRegisterAction(registerData));
        if(responseData.message !== "User already available" && responseData.message !== "callable API not found"){
            yield localStorage.setItem("beginnerCredential",JSON.stringify(responseData))
            yield put(receiveRequestedData(BEGINNER_REGISTER_SUCCESSFULLY,responseData))
        }
        else {
            yield localStorage.setItem("beginnerCredential",JSON.stringify(responseData))
            yield put(receiveRequestedData(ERROR_WHILE_REGISTER_BEGINNER,responseData))
        }
    }
    catch (e) {
        yield put(receiveRequestedData(ERROR_WHILE_REGISTER_BEGINNER,{message:'callable API not found!'}))
    }
}

const callTechnoHoursAction = (hoursInfo) => {
    return addTechnoHours(hoursInfo)
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

export function* makeRequestForAddTechnoHours({hoursInfo}) {
    try {
        const responseData = yield (callTechnoHoursAction(hoursInfo));
        debugger
        if(responseData.message !== "there is an error while add technology hours" && responseData.message !== "callable API not found"){
            let localCredential = JSON.parse(localStorage.getItem("beginnerCredential"))
            localCredential.technoHours = responseData
            localStorage.setItem("beginnerCredential",JSON.stringify(localCredential))
            yield put(receiveRequestedData(REQUESTED_TECHNO_HOURS_ADD_SUCCESSFULLY,responseData))
        }
        else {
            yield put(receiveRequestedData(ERROR_WHILE_ADD_TECHNO_HOURS,responseData))
        }
    }
    catch (e) {
        yield put(receiveRequestedData(ERROR_WHILE_REGISTER_BEGINNER,{message:'callable API not found!'}))
    }
}

const callTechnoRemoveHoursAction = (dataForRemoveTechnoHours) => {
    return removeTechnoHours(dataForRemoveTechnoHours)
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

export function* makeRequestForRemoveTechnoHours({dataForRemoveTechnoHours}) {
    try {
        debugger
        const responseData = yield (callTechnoRemoveHoursAction(dataForRemoveTechnoHours));
        if(responseData.message !== "there is an error while add technology hours" && responseData.message !== "callable API not found"){
            let localCredential = JSON.parse(localStorage.getItem("beginnerCredential"))
            localCredential.technoHours = responseData
            localStorage.setItem("beginnerCredential",JSON.stringify(localCredential))
            yield put(receiveRequestedData(REMOVE_TECHNO_HOURS_INFO,responseData))
        }
        else {
            yield put(receiveRequestedData(ERROR_WHILE_REMOVE_TECHNO_HOURS,responseData))
        }
    }
    catch (e) {
        yield put(receiveRequestedData(ERROR_WHILE_REMOVE_TECHNO_HOURS,{message:'callable API not found!'}))
    }
}
