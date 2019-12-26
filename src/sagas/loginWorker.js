import {put} from "redux-saga/effects";
import {receiveRequestedData} from "../action/beginnerCredentials";
import {
    BEGINNER_LOGIN_SUCCESSFULLY,
    ERROR_WHILE_LOGIN_BEGINNER
} from "../reducers/beginnerCredentials";
import {beginnerLogin} from "../services/beginnerLogin";

const callLoginAction = (passData) => {
    return beginnerLogin(passData)
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


function* makeLoginRequest({loginData}){
    try {
        const responseData = yield (callLoginAction(loginData));
        if(responseData.message !== "callable API not found" && responseData.message !== "Invalid credentials.."){
            yield localStorage.setItem("beginnerCredential",JSON.stringify(responseData))
            yield put(receiveRequestedData(BEGINNER_LOGIN_SUCCESSFULLY,responseData))
            return responseData
        }
        else {
            yield localStorage.setItem("beginnerCredential",JSON.stringify(responseData))
            yield put(receiveRequestedData(ERROR_WHILE_LOGIN_BEGINNER,responseData))
            return responseData
        }
    }
    catch (e) {
        yield put(receiveRequestedData(ERROR_WHILE_LOGIN_BEGINNER,{message:'error while Login data!'}))
    }
}
export default makeLoginRequest;