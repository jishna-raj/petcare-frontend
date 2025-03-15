

//register

import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

export const registerApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/register`, reqBody, "")
}

export const loginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/login`, reqBody, "")
}

//get userdetails

export const userdataApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/getuser`, "", reqHeader)
}


export const getalluserApi = async () => {
    return await commonApi('GET', `${serverUrl}/allusers`)
}
//edit profile

export const editUserApi = async (reqBody, reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/edit-profile`, reqBody, reqHeader)
}

//booking request

export const bookingApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/booking`, reqBody, reqHeader)
}

//get booking details

export const getBookingApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/getbooking`, "", reqHeader)
}

//add employee

export const addEmployeeApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/add-employee`, reqBody, reqHeader)
}

//get all employee
export const getEmployeeApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/get-employee`, "", reqHeader)
}
//remove employee

export const removeEmployeeApi = async (id) => {
    return await commonApi('DELETE', `${serverUrl}/remove-employee/${id}`, {}, "")
}

export const getAllBookingApi = async () => {
    return await commonApi('GET', `${serverUrl}/get-allBooking`, "", "")
}

//get booking user

export const getbookingUserApi = async (id) => {
    return await commonApi('GET', `${serverUrl}/get-bookingUser/${id}`, {}, "")
}

//post message

export const postMessageApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/post-message`, reqBody, "")
}

//get message 

export const getMessageApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/get-message`, "", reqHeader)
}



//adoption


export const adoptionregisterApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/adreg`, reqBody, "")
}

export const adoptionloginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/adlogin`, reqBody, "")
}

//get userdetails


export const getalladoptionuserApi = async () => {
    return await commonApi('GET', `${serverUrl}/get-all-adoptionuser`)
}

export const getadoptionuserdataApi = async (reqHeader) => {
    return await commonApi('GET', `${serverUrl}/getauser`, "", reqHeader)


}


/* export const getaAdoptionUserApi = async(id)=>{


    return await commonApi('GET',`${serverUrl}/get-a-adoptionuser/${id}`)
} */
//edit profile

export const editadoptionUserApi = async (reqBody, reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/edit-adoption-profile`, reqBody, reqHeader)
}




export const addpetApi = async (reqBody, reqHeader) => {

    return await commonApi('POST', `${serverUrl}/service`, reqBody, reqHeader)
}


export const addpetAdminApi =  async (reqBody, reqHeader) => {

    return await commonApi('POST', `${serverUrl}/admanagement`, reqBody, reqHeader)
}



export const getAllPetApi = async () => {

    return await commonApi('GET', `${serverUrl}/get-all-pet`)
}


export const getAPetController = async (id) => {


    return await commonApi('GET', `${serverUrl}/get-a-pet/${id}`)
}



export const getAadoptionUseridApi = async (id) => {

    return await commonApi('GET', `${serverUrl}/get-a-adoptionuser/${id}`)
}



export const addTestimonialApi = async (reqBody) => {


    return await commonApi('POST', `${serverUrl}/add-testimonial`, reqBody)
}


export const getAllTestimonialsApi = async () => {

    return await commonApi('GET', `${serverUrl}/get-testimonials`)
}



/* adoption request */

export const addAdoptionRequestApi = async (reqBody) => {


    return await commonApi('POST', `${serverUrl}/adoption-Form`, reqBody)
}



export const getAllRequestsApi = async () => {
    return await commonApi('GET', `${serverUrl}/adoption-requests`);
}


export const getRequestsByUserApi = async (userId) => {
    return await commonApi('GET', `${serverUrl}/adoption-requests-user/${userId}`);
  }



  export const getRequestsByPetApi = async (petId) => {
    return await commonApi('GET', `${serverUrl}/adoption-requests-pet/${petId}`);
  }


  export const updateRequestStatusApi = async (requestId, statusData) => {
    return await commonApi('PUT', `${serverUrl}/adoption-requests/${requestId}`, statusData);
  };



export const updatepetApi = async (id, reqBody) => {



    return await commonApi('PUT', `${serverUrl}/update-pet/${id}`, reqBody)
}

export const deletepetApi = async (id) => {

    return await commonApi('DELETE', `${serverUrl}/delete-pet/${id}`)
}


/* add notification */


export const addNotificationApi = async (reqBody) =>{

    return await commonApi('POST',`${serverUrl}/add-notification`,reqBody)
}




