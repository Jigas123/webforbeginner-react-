import baseService from './base';

export function beginnerLogin(passData) {
    try {
        const {emailId,pswd} = passData;
        return baseService.get(`/beginner/login/${emailId}/${pswd}`);
    }
    catch (e) {
        console.log("error handling in API: ",e)
    }
}