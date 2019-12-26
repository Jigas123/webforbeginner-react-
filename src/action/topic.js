import {REQUEST_FOR_ADD_TOPIC,CLEAR_TOPIC_ERRORS,REQUEST_FOR_GET_ALL_TOPIC,REQUEST_FOR_DELETE_TOPIC} from '../reducers/topic';
export const requestForAddTopic = (topicDataObject) => ({type:REQUEST_FOR_ADD_TOPIC,topicDataObject})
export const receiveAddTopicRequest = ( responseType,data) => ({type:responseType,data})
export const clearTopicError = () => ({type:CLEAR_TOPIC_ERRORS})
export const requestForGetAllTopic = (techno_name) => ({type:REQUEST_FOR_GET_ALL_TOPIC,techno_name})
export const requestForDeleteTopic = (topicTechno_id) => ({type:REQUEST_FOR_DELETE_TOPIC,topicTechno_id})