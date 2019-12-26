import {put} from 'redux-saga/effects';

import {receiveAdminRequestedData} from '../action/adminCredentials';
import {ADMIN_REGISTER_SUCCESSFULLY,ERROR_WHILE_REGISTER_ADMIN} from '../reducers/adminCredentials';
import {adminRegister} from '../services/adminRegister';

const callAdminRegisterAction = (passData) => {
    return adminRegister(passData)
        .then((resp) => {
            if(resp.status !== 200){
                return false
            }
            return resp.data;
        })
        .catch((e) => {
            if(e.response.data !== undefined) return e.response.data;
            return {message:"callable API not found"};
        })

}
//register API
function* makeAdminRegisterRequest({registerData}) {
    try {
        const responseData = yield (callAdminRegisterAction(registerData));
        if(responseData.message !== "Admin already available" && responseData.message !== "callable API not found"){
            yield localStorage.setItem("adminCredential",JSON.stringify(responseData))
            yield put(receiveAdminRequestedData(ADMIN_REGISTER_SUCCESSFULLY,responseData))
        }
        else {
            yield localStorage.setItem("adminCredential",JSON.stringify(responseData))
            yield put(receiveAdminRequestedData(ERROR_WHILE_REGISTER_ADMIN,responseData))
        }
    }
    catch (e) {
        yield put(receiveAdminRequestedData(ERROR_WHILE_REGISTER_ADMIN,{message:'callable API not found!'}))
    }
}

export default makeAdminRegisterRequest;