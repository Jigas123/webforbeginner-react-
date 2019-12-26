import {put} from "@redux-saga/core/effects";
import {receiveAdminRequestedData} from "../action/adminCredentials";
import {ADMIN_LOGIN_SUCCESSFULLY, ERROR_WHILE_LOGIN_ADMIN} from "../reducers/adminCredentials";
import {adminLogin} from "../services/adminLogin";

const callAdminLoginAction = (passData) => {
    return adminLogin(passData)
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

function* makeAdminLoginRequest({loginData}) {
    try {
        const responseData = yield (callAdminLoginAction(loginData));
        if(responseData.message !== "callable API not found" && responseData.message !== "Invalid credentials.."){
            yield localStorage.setItem("adminCredential",JSON.stringify(responseData))
            yield put(receiveAdminRequestedData(ADMIN_LOGIN_SUCCESSFULLY,responseData))
            return responseData
        }
        else {
            yield localStorage.setItem("adminCredential",JSON.stringify(responseData))
            yield put(receiveAdminRequestedData(ERROR_WHILE_LOGIN_ADMIN,responseData))
            return responseData
        }
    }
    catch (e) {
        yield put(receiveAdminRequestedData(ERROR_WHILE_LOGIN_ADMIN,{message:'error while Login data!'}))
    }
}

export default makeAdminLoginRequest;