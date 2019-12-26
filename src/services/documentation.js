import baseService from "./base";

export function addDocumentationRequest(dataDocument) {
    try {
        debugger
        return baseService.post('/admin/documentation/adddocumentation',dataDocument);
    }
    catch (e) {
        console.log("error handling in API: ",e)
    }
}

export function FetchDocumentationRequest(TechnoIdTrainyIdObject) {
    try {
        const {technology_id,trainyId} = TechnoIdTrainyIdObject
        debugger;
        return baseService.get(`admin/documentation/getDocumentation/${technology_id}/${trainyId}`);
    }
    catch (e) {
        console.log("error handling in API: ",e)
    }
}

export function UpdateDocumentationRequest(editDataDocument) {
    try {
        const {data,documentId} = editDataDocument;
        debugger
        return baseService.post(`admin/documentation/UpdateDocumentation/${documentId}`,data);
    }
    catch (e) {
        console.log("error handling in API: ",e)
    }
}

export function DeleteDocumentationRequest(document_id) {
    try {
        return baseService.delete(`admin/documentation/deletedocumentation/${document_id}`);
    }
    catch (e) {
        console.log("error handling in API: ",e)
    }
}

export function markAsReadDocument(markAsreadDocument) {
    try{
        const {filterData,trainy_id} = markAsreadDocument;

        return baseService.post(`/documentation/markasread/${trainy_id}`,filterData);
    }
    catch (e) {
        console.log("error occur in markAsReadDocument Service")
    }
}