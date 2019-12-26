import {put} from 'redux-saga/effects';

import {receiveAddTopicRequest} from '../action/topic';
import {SUCCESSFULLY_ADDED_TOPIC,ERROR_WHILE_ADD_TOPIC,GET_ALL_TOPIC,DELETE_TOPIC_SUCCESSFULLY,
        ERROR_WHILE_DELETE_TOPIC} from '../reducers/topic';
import {addTopic,GetAllTopic,DeleteTopic} from '../services/topic';
import {makeFetchTopicDocument} from './documentationWorker';

const callAddTopicAction = (topicDataObject) => {
    return addTopic(topicDataObject)
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
export function* makeAddTopicRequest({topicDataObject}) {
    try {
        const responseData = yield (callAddTopicAction(topicDataObject));
        debugger
        if(responseData.message !== "Topic already available" && responseData.message !== "callable API not found"){
            debugger
            yield put(receiveAddTopicRequest(SUCCESSFULLY_ADDED_TOPIC,responseData))
        }
        else {
            yield put(receiveAddTopicRequest(ERROR_WHILE_ADD_TOPIC,responseData))
        }
    }
    catch (e) {
        yield put(receiveAddTopicRequest(ERROR_WHILE_ADD_TOPIC,{message:'callable API not found!'}))
    }
}

const callFetchTopicAction = () => {
    return GetAllTopic()
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

export function* makeFetchAllTopicRequest() {
    try {
        const responseData = yield (callFetchTopicAction());
        if(responseData.message !== "there is an error while getting topic" && responseData.message !== "callable API not found"){
            yield put(receiveAddTopicRequest(GET_ALL_TOPIC,responseData))
        }
        else {
            yield put(receiveAddTopicRequest(ERROR_WHILE_ADD_TOPIC,responseData))
        }
    }
    catch (e) {
        yield put(receiveAddTopicRequest(ERROR_WHILE_ADD_TOPIC,{message:'callable API not found!'}))
    }
}

const callDeleteTopicAction = (topic_id) => {
    return DeleteTopic(topic_id)
        .then((resp) => {
            if(resp.status !== 200) return false
            return resp.data;
        }).catch((e) => {
            if(e.response.data !== undefined) return e.response.data;
            return {message:"callable API not found"}
        })
}

export function* makeDeleteTopic({topicTechno_id}) {
    try {
        const {topic_id,technology_id} = topicTechno_id;

        const responseData = yield (callDeleteTopicAction(topic_id));
        if(responseData.message !== "there is an error while delete topic" && responseData.message !== "callable API not found"){
            let trainyId = null;
            let TechnoIdTrainyIdObject = {technology_id,trainyId}
            let newResponseData = {...responseData,topic_id}
            yield put(receiveAddTopicRequest(DELETE_TOPIC_SUCCESSFULLY,newResponseData))
            yield* makeFetchTopicDocument({TechnoIdTrainyIdObject});
        }
        else {
            yield put(receiveAddTopicRequest(ERROR_WHILE_DELETE_TOPIC,responseData))
        }
    }
    catch (e) {
        yield put(receiveAddTopicRequest(ERROR_WHILE_DELETE_TOPIC,{message:'callable API not found!'}))
    }
}

