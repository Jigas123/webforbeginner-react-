import {REQUEST_FOR_TRAINY_DETAIL,REQUEST_FOR_TECHNO_BASED_TRAINY} from '../reducers/trainyDocumentationInfo';
export const receiveMarkAsReadRequest = (responseType,data) => ({type:responseType,data})
export const requestForTrainyData = () => ({type:REQUEST_FOR_TRAINY_DETAIL})
export const requestForTechnoBasedTrainy = (technoStatusData) => ({type:REQUEST_FOR_TECHNO_BASED_TRAINY,technoStatusData})