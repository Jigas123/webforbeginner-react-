import baseService from './base';

export function addTechnologyRequest(technology) {
    try {
        return baseService.post('/admin/technology/addtechnology',technology);
    }
    catch (e) {
        console.log("error handling in API: ",e)
    }
}

export function fetchAllTechnology() {
    try{
        return baseService.get('/admin/technology/getalltechnology');
    }
    catch (e) {
        console.log("error handling in API: ",e);
    }
}

export function deleteTechnology(DeleteTd) {
    try{
        return baseService.delete(`/admin/technology/deleteTechnology/${DeleteTd}`)
    }
    catch (e) {
        console.log("error handling in API: ",e);
    }
}