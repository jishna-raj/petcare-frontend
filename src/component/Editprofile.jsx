import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { editUserApi } from '../services/allApi';
import Userdetails from './Userdetails';
import { serverUrl } from '../services/serverUrl';
import { editResponseContext } from '../context/Contextshare';

function Editprofile() {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [preview,setPreview] =useState("")

    const {setEditResponse}=useContext(editResponseContext)

    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: "",
        place: "",
        mobile: "",
        img: "",
      });
    
      const handlefile = (e)=>{
        // console.log(e.target.files[0]);
        setUserDetails({...userDetails,img:e.target.files[0]})
        
      }

      const [existingImage ,setExistingImage]=useState("")

      useEffect(() => {
       

        if (sessionStorage.getItem("existingUser")) {
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setUserDetails({...userDetails,username:user.username,email:user.email,password:user.password,place:user.place,mobile:user.mobile})
         setExistingImage(user.img)
            
          }
      }, [Userdetails]);
      console.log(userDetails);

      useEffect(()=>{
        if(userDetails.img){
          setPreview(URL.createObjectURL(userDetails.img))
        }
      },[userDetails.img])

      console.log(preview);
      

      const handleEdit =async()=>{
        const {username ,email,password,place,mobile,img}=userDetails
        if (!username || !email || !password || !place || !mobile) {
            Swal.fire({
                title: 'Empty',
                text: 'Please fill the form properly',
                icon: 'error'
              })
        } else {
            const reqBody =new FormData()

            reqBody.append("username",username)
            reqBody.append("email",email)
            reqBody.append("password",password)
            reqBody.append("place",place)
            reqBody.append("mobile",mobile)

            preview?reqBody.append("img",img):reqBody.append("img",existingImage)

            const token =sessionStorage.getItem("token")
            if (token) {
                
                if (token) {
                    if (preview) {
                      const  reqHeader = {
                        "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
                      }
                      const result =await editUserApi(reqBody,reqHeader)
                      if (result.status==200) {
                        alert("edited successfully")
                        setEditResponse(result.data)

                        handleClose()

                      }
                      else{
                        alert("something went wrong")
                        handleClose()
                      }
                      
                    } else {
                      const  reqHeader = {
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                      }
                      const result =await editUserApi(reqBody,reqHeader)
                      if (result.status==200) {
                        alert("edited successfully")
                        setEditResponse(result.data)

                        handleClose()
                        // setEditResponse(result.data)
                      }
                      else{
                        alert("something went wrong")
                        handleClose()
                      }
                    }
                    
                  } 
            
            } 
        }
      }
     
      
      
    


  const handleClose = () => setShow(false);


  
  
  
  return (
    <>
     {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
       <button className='btn btn-sm  bg-black mt-2 text-white'onClick={handleShow}>Edit profile</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>          <div className="row">
            <div className="col-md-6">
             
                          <label htmlFor="profileImg" >
              <input type="file" style={{display:'none'}} id='profileImg' onChange={(e)=>handlefile(e)}/>
              {
                existingImage==""?
                <img src={ preview?preview: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"} alt="" width={'180px'} height={'180px'} />:
                <img src={preview?preview:`${serverUrl}/uploads/${existingImage}`} alt='no imga' width={'180px'} height={'180px'} style={{borderRadius:"50%"}} />
              }
            </label>


            </div>
            <div className="col-md-6">
              <div className="mb-3 mt-3">
                <input type="text" placeholder='username' className='form-control' value={userDetails.username} onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})} />
              </div>
              <div className="mb-3">
              <input type="text" placeholder='password' className='form-control' value={userDetails.email} onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})} />
              </div>

              <div className="mb-3">
              <input type="text" placeholder='password' className='form-control' value={userDetails.password} onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})} />
              </div>
              <div className="mb-3">
              <input type="text" placeholder='place' className='form-control' value={userDetails.place} onChange={(e)=>setUserDetails({...userDetails,place:e.target.value})} />
              </div>
              <div className="mb-3">
              <input type="text" placeholder='mobile no' className='form-control' value={userDetails.mobile} onChange={(e)=>setUserDetails({...userDetails,mobile:e.target.value})} />
              </div>
            </div>
          </div>
</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Editprofile