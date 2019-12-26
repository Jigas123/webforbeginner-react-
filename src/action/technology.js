import {REQUEST_FOR_ADD_TECHNOLOGY,REQUEST_FOR_FETCH_TECHNOLOGY,REQUEST_FOR_DELETE_TECHNOLOGY} from '../reducers/technology';
export const requestForAddTechnology = (technologyObj) => ({type : REQUEST_FOR_ADD_TECHNOLOGY,technologyObj});
export const requestForFetchTechnology = () => ({type : REQUEST_FOR_FETCH_TECHNOLOGY});
export const receivedAddTechnologyRequest = ( responseType, data ) => ({ type:responseType, data})
export const requestForDeleteTechnology = (DeleteId) => ({type : REQUEST_FOR_DELETE_TECHNOLOGY,DeleteId})