import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { BtnPrimary } from '../../../../components/Buttons/BtnSucess/BtnPrimary'
import SWAlert from '../../../../components/SwAlert/SWAlert';
import useFetchApi from '../../../../hook/useFetchApi';
import { useGetMyAccountInfo } from '../../../../hook/useGetMyAccountInfo';
import "./Profile.scss"
export const Profile = () => {
    const [state,setState] = useState({
        name:"",
        photo:"",
        currentPhoto:""
    })
    const [photo,setPhoto] = useState(null);
    //custom hooks
    const [getMyInfoAccount,loading] = useGetMyAccountInfo();

    //Effects
    useEffect(()=>{
     getMyInfoAccount().then((data)=>{
       setState({...state,name:data.name,currentPhoto:data?.config?.thumb})
       console.log(data)
     })
    },[])

  //vARS
    const file = useRef("");
   
      // Create an object of formData
      const formData = new FormData();

      formData.append("photo",photo);
      formData.append("name", state.name); // number 123456

    const submit=async(e)=>{
        e.preventDefault();
    try {
        const resp= await fetch(`${process.env.REACT_APP_API_URL}/api/admin/profile`,{
            body:formData,
            headers:{
                "access-token":localStorage.getItem("access-token")
            },
            method:"PUT"
        })
        SWAlert.alert({
            title:"Editado"
        })

        setTimeout(()=>{
            window.location.reload();
        },1000)

    } catch (error) {
        SWAlert.error({
            title:"Algo salio mal"
        })
    }
        
       

    }

  return (
    <form onSubmit={submit} className='profile_Edit'>
        <div className="form-group">
            <label htmlFor="">Name</label>
            <input type="text" onChange={e=>{
                setState({...state,name: e.target.value});
            }} value={state.name} />
        </div>

        <div className="form-group my-4">
            <label htmlFor="">Foto de perfil</label>
            <input onChange={(e)=>{
                setPhoto(e.target.files[0])
            }} ref={file} type="file" />
        </div>
        <div className="current__photo__profile">
            {state.currentPhoto && <p>Actual:</p>}
            <img src={`${process.env.REACT_APP_API_URL}/api/img/profiles/${state.currentPhoto}`} alt="Photo profile" />

        </div>

        <BtnPrimary title="Guardar"/>
       
    </form>
  )
}
