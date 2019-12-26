import baseService from './base';

export function addTopic(topicDataObject) {
    try {
        debugger
        return baseService.post('/admin/topic/addtopic',topicDataObject);
    }
    catch (e) {
        console.log("error occur in addTopic service: ",e)
    }
}

export function GetAllTopic() {
    try {
        return baseService.get('/admin/topic/alltopic');
    }
    catch (e) {
        console.log("error occur in GetAllTopic service: ",e)
    }
}

export function DeleteTopic(topic_id) {
    try {
        return baseService.delete(`/admin/topic/delete-topic/${topic_id}`)
    }
    catch (e) {
        console.log("error occur in deleteTopic service: ",e)
    }
}