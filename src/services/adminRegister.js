import baseService from './base';

export function adminRegister(passData) {
    try {
        return baseService.post('/admin/register',passData);
    }
    catch (e) {
        console.log("error handling in API: ",e)
    }
}