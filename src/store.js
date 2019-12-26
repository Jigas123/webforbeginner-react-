import { createStore, applyMiddleware,compose } from "redux";
import createSagaMiddleware from "redux-saga";

import reducers from './reducers';
import rootSaga from "./sagas/sagas";

const composeEnhance = typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhance(
    applyMiddleware(sagaMiddleware)
);

const INITIAL_STATE = {
    beginnerCredential: {
        credentials: {},
        error_msg: {}
    },
    adminCredential: {
        credentials: {},
        error_msg: {}
    }
};

let beginnerAPIResp = '';
let adminAPIResp = '';
const beginnerCredential = localStorage.getItem("beginnerCredential");
const adminCredential = localStorage.getItem("adminCredential");

if(beginnerCredential !== "undefined" && beginnerCredential !== null){
    beginnerAPIResp = JSON.parse(beginnerCredential)
    if(beginnerAPIResp.hasOwnProperty('_id')){
        INITIAL_STATE.beginnerCredential.credentials = beginnerAPIResp
    }
    else if(beginnerAPIResp.hasOwnProperty('error_msg')){
        INITIAL_STATE.beginnerCredential.error_msg = beginnerAPIResp
    }
}

if(adminCredential !== "undefined" && adminCredential !== null){
    adminAPIResp = JSON.parse(adminCredential)
    if(adminAPIResp.hasOwnProperty('_id')){
        INITIAL_STATE.adminCredential.credentials = adminAPIResp
    }
    else if(adminAPIResp.hasOwnProperty('error_msg')){
        INITIAL_STATE.adminCredential.error_msg = adminAPIResp
    }
}



// mount it on the Store
export default createStore(reducers,INITIAL_STATE,enhancer);

// then run the saga
sagaMiddleware.run(rootSaga);