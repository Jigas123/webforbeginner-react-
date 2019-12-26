import {all,takeLatest} from 'redux-saga/effects';

import {REQUEST_FOR_REGISTER, REQUEST_FOR_LOGIN, REQUEST_FOR_ADD_TECHNO_HOURS} from '../reducers/beginnerCredentials';
import {REQUEST_FOR_ADMIN_REGISTER,REQUEST_FOR_ADMIN_LOGIN} from '../reducers/adminCredentials';
import {REQUEST_FOR_ADD_TECHNOLOGY,REQUEST_FOR_FETCH_TECHNOLOGY,
        REQUEST_FOR_DELETE_TECHNOLOGY} from '../reducers/technology';
import {REQUEST_FOR_ADD_TOPIC, REQUEST_FOR_GET_ALL_TOPIC,
        REQUEST_FOR_DELETE_TOPIC} from '../reducers/topic';
import {REQUEST_FOR_ADD_DOCUMENTATION,REQUEST_FOR_FETCH_DOCUMENTATION,
        REQUEST_FOR_EDIT_DOCUMENTATION,REQUEST_FOR_DELETE_DOCUMENT,REQUEST_FOR_MARK_TRAINY_DOCUMENT} from '../reducers/documentation';
import {REQUEST_FOR_MARK_AS_READ,REQUEST_FOR_TRAINY_DETAIL,REQUEST_FOR_TECHNO_BASED_TRAINY} from '../reducers/trainyDocumentationInfo';

import {makeRegisterRequest,makeRequestForAddTechnoHours} from './registerWorker';
import makeLoginRequest from './loginWorker';
import {makeFetchAllTechnologyRequest,makeAddTechnologyRequest,makeDeleteTechnologyRequest} from './technologyWorker';
import makeAdminRegisterRequest from './adminRegisterWorker';
import makeAdminLoginRequest from './adminLoginWorker';
import {makeAddTopicRequest,makeFetchAllTopicRequest,makeDeleteTopic} from './topicWorker';
import {makeAddDocumentRequest,makeFetchTopicDocument,makeUpdateDocument,makeDeleteDocument,makeMarkAsReadByTrainyRequest} from './documentationWorker';
import {makeMarkAsReadRequest,makeRequestForTrainyData,makeRequestForTechnoBasedTrainy} from './trainyDocumentation';

function* Registerwatcher() {
    yield takeLatest(REQUEST_FOR_REGISTER, makeRegisterRequest);
}

function* Loginwatcher() {
    yield takeLatest(REQUEST_FOR_LOGIN, makeLoginRequest);
}

function* AdminRegisterwatcher() {
    yield takeLatest(REQUEST_FOR_ADMIN_REGISTER, makeAdminRegisterRequest);
}

function* AdminLoginwatcher() {
    yield takeLatest(REQUEST_FOR_ADMIN_LOGIN, makeAdminLoginRequest);
}

function* addTechnologyWatcher() {
    yield takeLatest(REQUEST_FOR_ADD_TECHNOLOGY, makeAddTechnologyRequest)
}

function* InitialFetchTechnology() {
    yield takeLatest(REQUEST_FOR_FETCH_TECHNOLOGY, makeFetchAllTechnologyRequest)
}

function* DeleteTechnology() {
    yield takeLatest(REQUEST_FOR_DELETE_TECHNOLOGY, makeDeleteTechnologyRequest)
}

function* AddTopicWatcher() {
    yield takeLatest(REQUEST_FOR_ADD_TOPIC, makeAddTopicRequest)
}

function* getTopicWatcher() {
    yield takeLatest(REQUEST_FOR_GET_ALL_TOPIC, makeFetchAllTopicRequest)
}

function* addDocumentationWatcher() {
    yield takeLatest(REQUEST_FOR_ADD_DOCUMENTATION, makeAddDocumentRequest)
}

function* getTopicDocumentationWatcher() {
    yield takeLatest(REQUEST_FOR_FETCH_DOCUMENTATION, makeFetchTopicDocument);
}

function* editDocumentWatcher() {
    yield takeLatest(REQUEST_FOR_EDIT_DOCUMENTATION, makeUpdateDocument);
}

function* deleteDocumentWatcher() {
    yield takeLatest(REQUEST_FOR_DELETE_DOCUMENT, makeDeleteDocument)
}

function* deleteTopicWatcher() {
    yield takeLatest(REQUEST_FOR_DELETE_TOPIC, makeDeleteTopic)
}

function* markAsReadWatcher() {
    yield takeLatest(REQUEST_FOR_MARK_AS_READ, makeMarkAsReadRequest)
}

function* markAsReadByTrainy() {
    yield takeLatest(REQUEST_FOR_MARK_TRAINY_DOCUMENT, makeMarkAsReadByTrainyRequest)
}

function* makeRequestForTrainyDataWatcher() {
    yield takeLatest(REQUEST_FOR_TRAINY_DETAIL, makeRequestForTrainyData)
}

function* makeRequestForTechnoBasedTrainyWatcher() {
    yield takeLatest(REQUEST_FOR_TECHNO_BASED_TRAINY, makeRequestForTechnoBasedTrainy)
}

function* makeRequestForAddTechnoHoursWatcher() {
    yield takeLatest(REQUEST_FOR_ADD_TECHNO_HOURS, makeRequestForAddTechnoHours)
}

export default function* rootSaga() {
    yield all([
        Registerwatcher(),
        Loginwatcher(),
        AdminRegisterwatcher(),
        AdminLoginwatcher(),
        addTechnologyWatcher(),
        InitialFetchTechnology(),
        DeleteTechnology(),
        AddTopicWatcher(),
        getTopicWatcher(),
        addDocumentationWatcher(),
        getTopicDocumentationWatcher(),
        editDocumentWatcher(),
        deleteDocumentWatcher(),
        deleteTopicWatcher(),
        markAsReadWatcher(),
        markAsReadByTrainy(),
        makeRequestForTrainyDataWatcher(),
        makeRequestForTechnoBasedTrainyWatcher(),
        makeRequestForAddTechnoHoursWatcher()
    ]);
}