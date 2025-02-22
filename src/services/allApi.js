

//register

import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"

export const registerApi =async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody,"")
}

export const loginApi =async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody,"")
}

//get userdetails

export const userdataApi =async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/getuser`,"",reqHeader)
}
//edit profile

export const editUserApi =async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/edit-profile`,reqBody,reqHeader)
}

//booking request

export const bookingApi =async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/booking`,reqBody,reqHeader)
}

//get booking details

export const getBookingApi =async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/getbooking`,"",reqHeader)
}

//add employee

export const addEmployeeApi =async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/add-employee`,reqBody,reqHeader)
}

//get all employee
export const getEmployeeApi =async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/get-employee`,"",reqHeader)
}
//remove employee

export const removeEmployeeApi= async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/remove-employee/${id}`,{},"")
}

export const getAllBookingApi=async()=>{
    return await commonApi('GET',`${serverUrl}/get-allBooking`,"","")
}

//get booking user

export const getbookingUserApi= async(id)=>{
    return await commonApi('GET',`${serverUrl}/get-bookingUser/${id}`,{},"")
}

//post message

export const postMessageApi =async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/post-message`,reqBody,"")
}

//get message 

export const getMessageApi =async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/get-message`,"",reqHeader)
}







