import baseService from './base';

export function beginnerRegister(passData) {
    try {
        return baseService.post('/beginner/register',passData);
    }
    catch (e) {
        console.log("error handling in Beginner Register API: ",e)
    }
}

export function addTechnoHours(hoursInfo) {
    try {
        return baseService.post('/beginner/addtechnohours',hoursInfo)
    }
    catch (e) {
        console.log("error handling in Add Technology Hours API: ",e)
    }
}

export function removeTechnoHours(dataForRemoveTechnoHours) {
    try {
        debugger
        const {trainy_id,removeTechnoHour} = dataForRemoveTechnoHours
        return baseService.post(`/beginner/removetechnohours/${trainy_id}/${removeTechnoHour}`)
    }
    catch (e) {
        console.log("error handling in Remove Technology Hours API: ",e)
    }
}