import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addEmployeeApi } from '../services/allApi';
import { addEmployeeResponseContext } from '../context/Contextshare';


function Addemployee() {


    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [preview,setPreview] =useState("")
    const {setAddEmployee}=useContext(addEmployeeResponseContext)

    const [employeeDetails, setEmployeeDetails] = useState({
        name: "",
        mobile: "",
        license: "",
        place: "",
        designation: "",
        img:""
      });
    
      const handlefile = (e)=>{
        // console.log(e.target.files[0]);
        setEmployeeDetails({...employeeDetails,img:e.target.files[0]})
        
      }

      const [existingImage ,setExistingImage]=useState("")


      useEffect(()=>{
        if(employeeDetails.img){
          setPreview(URL.createObjectURL(employeeDetails.img))
        }
      },[employeeDetails.img])

      console.log(preview);
      

      const handleadd =async()=>{
        const {name ,mobile,license,place,designation,img}=employeeDetails
        if (!name || !mobile || !license || !place || !designation) {
            Swal.fire({
                title: 'Empty',
                text: 'Please fill the form properly',
                icon: 'error'
              })
        } else {
            const reqBody =new FormData()

            reqBody.append("name",name)
            reqBody.append("mobile",mobile)
            reqBody.append("license",license)
            reqBody.append("place",place)
            reqBody.append("designation",designation)

            preview?reqBody.append("img",img):reqBody.append("img",existingImage)
            const token = sessionStorage.getItem("token")

  if (token) {
    const  reqHeader = {
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`

     }
     const result =await addEmployeeApi(reqBody,reqHeader)
     if (result.status==200) {

      setAddEmployee(result.data)
      Swal.fire({
        title: 'wow',
        text: 'Added successfully',
        icon: 'success'
      })

       handleClose()

     }
     else{
       alert("something went wrong")
       handleClose()
     }

  }




        }
      }
     
    

  const handleClose = () => setShow(false);


  return (
    <>
        <>
     {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
       <button className='btn btn-sm w-100 bg-black mt-2 text-white border p-2 rounded-pill'onClick={handleShow}>Add employee</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>          <div className="row">
            <div className="col-md-6">
             
            <label htmlFor='projimg'>
                <input type="file" id='projimg' style={{display:'none'}} key={preview} onChange={(e)=>handlefile(e)} />
                <img src={preview?preview:"https://static.vecteezy.com/system/resources/previews/024/397/646/original/upload-icon-vector.jpg"} alt="no image" className='w-100' />
              </label>


            </div>
            <div className="col-md-6">
              <div className="mb-3 mt-3">
                <input type="text" placeholder='name' className='form-control'  onChange={(e)=>setEmployeeDetails({...employeeDetails,name:e.target.value})} />
              </div>
              <div className="mb-3">
              <input type="text" placeholder='mobile' className='form-control'  onChange={(e)=>setEmployeeDetails({...employeeDetails,mobile:e.target.value})} />
              </div>

              <div className="mb-3">
              <input type="text" placeholder='license' className='form-control'  onChange={(e)=>setEmployeeDetails({...employeeDetails,license:e.target.value})} />
              </div>
              <div className="mb-3">
              <input type="text" placeholder='place' className='form-control'  onChange={(e)=>setEmployeeDetails({...employeeDetails,place:e.target.value})} />
              </div>
              <div className="mb-3">
              <input type="text" placeholder='job' className='form-control'  onChange={(e)=>setEmployeeDetails({...employeeDetails,designation:e.target.value})} />
              </div>
            </div>
          </div>
</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleadd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>

    </>
  )
}

export default Addemployee