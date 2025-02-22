

import React, {  createContext, useState } from 'react'

export const editResponseContext = createContext({})

export const addBookingResponseContext =createContext([])

export const addEmployeeResponseContext =createContext([])

export const messageSentResponseContext =createContext([])


function Contextshare({children}) {

    const[editResponse ,setEditResponse]=useState({})

    const [addResponse ,setAddResponse]=useState([])

    const [addEmployee ,setAddEmployee]=useState([])

    const [messageSent ,setMessagesent]=useState([])
  return (
    <>

   <messageSentResponseContext.Provider value={{messageSent,setMessagesent}}>
     <addEmployeeResponseContext.Provider value={{addEmployee,setAddEmployee}}>
       <addBookingResponseContext.Provider value={{addResponse ,setAddResponse}}>
            <editResponseContext.Provider value={{editResponse,setEditResponse}}>
            {children}
            </editResponseContext.Provider>
       </addBookingResponseContext.Provider>
     </addEmployeeResponseContext.Provider>
      
   </messageSentResponseContext.Provider>
    
    
    </>
  )
}

export default Contextshare

