import {combineReducers} from 'redux';

import beginnerCredential from './beginnerCredentials';
import adminCredential from './adminCredentials';
import technology from './technology'
import topic from './topic'
import documentation from './documentation'
import trainyDocumentationInfo from './trainyDocumentationInfo';

export default combineReducers({
    beginnerCredential,
    adminCredential,
    technology,
    topic,
    documentation,
    trainyDocumentationInfo
});