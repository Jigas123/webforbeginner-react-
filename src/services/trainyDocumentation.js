import baseService from './base';

export function markAsReadDocument(markAsreadDocument) {
    try{
        const {filterData,trainy_id} = markAsreadDocument;

        return baseService.post(`/documentation/markasread/${trainy_id}`,filterData);
    }
    catch (e) {
        console.log("error occur in markAsReadDocument Service")
    }
}

export function TrainyDataAction() {
    try {
        return baseService.get(`/beginner/trainy/getalltrainy`);
    }
    catch (e) {
        console.log("error occur in TrainyData Service")
    }
}

export function TechnoBasedTrainyDataAction(technoStatusData) {
    try {
        const {selectedTechnology,technoStatus} = technoStatusData
        return baseService.get(`/beginner/trainy/gettechnobasedtrainy/${selectedTechnology}/${technoStatus}`)
    }
    catch (e) {
        console.log("error occur in TechnoBasedTrainy Service")
    }
}