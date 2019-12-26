import baseService from './base';

export function adminLogin(passData) {
    try {
        const {emailId,pswd} = passData;
        return baseService.get(`/admin/login/${emailId}/${pswd}`);
    }
    catch (e) {
        console.log("error handling in API: ",e)
    }
}